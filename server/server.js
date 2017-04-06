require('dotenv').config();

const express       = require('express');
const app           = express();
const server        = require('http').Server(app);

const bodyParser    = require('body-parser');
const GitHubStrategy = require('passport-github2').Strategy;
const io            = require('socket.io')(server);
const passport      = require('passport');
const path          = require('path');
const request       = require('request');
const sass          = require("node-sass-middleware");
const session       = require('express-session');
const util          = require('util');

const ENV           = process.env.ENV || "development";
const knexConfig    = require("./knexfile");
const knex          = require("knex")(knexConfig[ENV]);
const moment        = require('moment');
let githubAuthUrl   = "";

//Only use knexLogger in development
if (ENV === 'development') {
  const knexLogger = require('knex-logger');
  app.use(knexLogger(knex));
}

if (ENV === 'production') {
  githubAuthUrl = 'http://35.163.216.237:3000/auth/github/callback';
} else {
  githubAuthUrl = 'http://127.0.0.1:3000/auth/github/callback';
}

//JSON WEB TOKEN CONFIG
const jwt           = require('jsonwebtoken');
const jwtSecret     = process.env.TOKEN_SECRET || "development";
const socketioJwt   = require('socketio-jwt');

//Modules
const dbHelpers     = require('./data-helpers')(knex);
const socketHelpers = require('./util/socket-helpers');
const roomHelpers = require('./util/room-actions');
const actionHandler = require('./util/action-handler');

app.set('view engine', 'ejs');

//Sass middleware
app.use("/styles", sass({
  src: __dirname + "/scss",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Passport session setup.
// Serialize stores an ID in the user's session object.
passport.serializeUser(function(id, done) {
  done(null, id);
});

//Deserialize retrieves the user's details based on the passport session ID.
passport.deserializeUser(function(id, done) {
  knex('users').where('github_id', id)
  .then(user => { done(null, user[0]); })
  //TODO make better error message
  .catch(explosion => console.log("error: ", explosion));
});

// Use the GitHubStrategy within Passport.
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: githubAuthUrl
},
  function(accessToken, refreshToken, profile, done) {
    knex('users').where('github_id', profile.id).then(user => {
      let userQuery;
      if (user.length === 0) {
        userQuery = knex('users').insert({
          github_login: profile.username,
          github_avatar: profile._json.avatar_url,
          github_name: profile.displayName,
          github_id: profile.id,
          github_access_token: accessToken
        }).returning('github_id');
      } else {
        userQuery = knex('users').where('github_id', profile.id).update({
          github_access_token: accessToken
        }).returning('github_id')
      }
      userQuery.then((github_id) => {
        return done(null, github_id[0]);
      });
    });
  }
));

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
// Initialize Passport
app.use(passport.initialize());
// Use passport.session middleware for persistent login sessions.
app.use(passport.session());


// The first step in GitHub authentication will involve redirecting
// the user to github.com. After authorization, GitHub will redirect the user
// back to this application at /auth/github/callback
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email', 'gist'] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function will be called,
//  which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback',
  passport.authenticate('github'), function(req, res) {
    res.redirect(req.session.returnTo || '/rooms');
    delete req.session.returnTo;
  });

  // Pass this function to routes that needs to be protected.
  // If the request is authenticated the request will proceed.
  // Otherwise, the user will be redirected to the url passed to res.redirect()
  // Desired path is stored in user's to go to after authenticating.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.returnTo = req.path;
  res.redirect('/login');
}

//Define request-local variables
app.use(function(req, res, next){
  res.locals.user = req.user;
  res.locals.moment = moment;
  //Define source of bundle.js depending on environment
  let bundleSrc;
  if(req.user) {
    if (ENV === 'production') {
      bundleSrc = '/dist/bundle.js';
    } else {
      bundleSrc = 'http://localhost:8080/build/bundle.js';
    }
    res.locals.bundleSrc = bundleSrc;
  }
  next();
});

app.get('/', function(req, res) {
  if (req.user) {
    res.redirect('/rooms');
  } else {
    res.render('home');
  }
});

app.get('/login', function(req, res) {
  if (req.user) {
    res.redirect('/rooms');
  } else {
    res.render('login');
  }
});

app.get('/rooms', ensureAuthenticated, function(req, res) {
  res.render('rooms');
});

app.get('/error', function(req, res) {
  res.render('error');
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/users/:username', ensureAuthenticated, (req, res) => {
  const classrooms = knex('classrooms').where('user_id', 'in',
    knex('users').where('github_login', req.params.username).select('id').limit(1)
  );
  console.log(classrooms);
  const profile = knex.select('*').from('users').where('github_login', req.params.username).limit(1);
  Promise.all([classrooms, profile]).then((profileData) => {
    console.log(profileData[0]);
    res.render('show_user', {classrooms: profileData[0], profile: (profileData[1])[0]});
  });
});

//Create token and populate with req.user data. Send back token as json.
app.get('/api/get_token', (req, res) => {
  const user = req.user;
  if (user) {
    const profile = {
      id: user.id,
      github_login: user.github_login,
      github_avatar: user.github_avatar
    };
    const token = jwt.sign(profile, jwtSecret, { expiresIn: 60 * 60 * 5 });
    res.json({token: token});
  }
});

app.get('/rooms/:key', ensureAuthenticated, (req, res) => {
  knex('classrooms').where('room_key', req.params.key)
    .then((results) => {
      if(results.length === 0) {
        res.status(404).render('error', {
          errorcode: 404,
          message: "Error: The classroom " + req.params.key + " doesn't exist!",
          buttonLabel: 'Go Home',
          buttonURL: '/'
        });
        return;
      }
      res.render('show_room');
    });
});

app.post('/rooms', (req, res) => {
  if(/([A-Za-z]|[0-9]|_|-|\w|~)$/.test(req.body.topic)){
    console.log('didnt work');
    knex('classrooms').where('topic', req.body.topic)
    .then((results) => {
      if(results.length === 0){
        knex('classrooms')
        .insert({
          topic: req.body.topic,
          language_id: req.body.language,
          editorLocked: true,
          chatLocked: false,
          user_id: req.user.id,
          //TODO Import sanitizeURL function from module
          room_key: req.body.topic
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .replace(/^\-|\-$/g, '')
          .toLowerCase()
        })
        .returning('room_key')
        .then((room_key) => {
          res.redirect(`/rooms/${room_key[0]}`);
        });
      } else {
        res.status(400).render('error', {
          errorcode: 400,
          message: "Error: This classroom topic already exists!",
          buttonLabel: 'Try Again',
          buttonURL: '/rooms'
        });
      }
    })
  } else {
    res.status(400).render('error', {
      errorcode: 400,
      message: "Error: Please use alphanumeric characters only!!",
      buttonLabel: 'Try Again',
      buttonURL: '/rooms'
    });
  }
});

//Posting a gist
function getUser(request) {
  return knex('users').where('github_id', request.session.passport.user);
}

app.post('/savegist', function (req, res) {
  getUser(req).then((row) => {
    const user = row[0];
    // console.log('user', user);
    request.post(
      {
        url: "https://api.github.com/gists",
        headers: {
          "User-Agent": "CodeClass gist creator (student project)",
          "Authorization": `token ${user.github_access_token}`
        },
        "body": JSON.stringify({
          "files": {
            [`${req.body.data.title}${req.body.data.extension}`]: {
              "content": req.body.data.content
            }
          }
        })
      }, function(error, response, body) {
      if (error) {
        return res.status(500).send("Posting gist to github failed");
      } else {
        return res.send("Request sent");
      }
    });
  });
});


//Temp data
// const roomData = require('./temp-room-api-data.json');
server.listen(3000, () =>
  console.log("App listening on port 3000")
);

/*  SOCKET  SERVER  STARTS  HERE */

//Middleware to authenticate all connections
io.use(socketioJwt.authorize({
  secret: jwtSecret,
  handshake: true
}));

//in-memory storage of people in classroom
const clients = {};

io.on('connection', (socket) => {
  const clientData = socket.decoded_token;
  let roomOwnerID;
  let room;
  let sk;
  let rm;

  socket.on('join', (roomKey) => {
    room = roomKey;
    sk = socketHelpers(io, socket, room);
    rm = roomHelpers(sk, clients);

    socket.join(room);
    rm.addToClientsStore();

    //Update room list and broadcast to all users
    let action = {type: 'UPDATE_USERS_ONLINE', payload: {usersOnline: clients[room]}}
    sk.broadcastToRoomInclusive(room, action);
    dbHelpers.setRoomData(room, clientData.id, emitRoomData);

    //Return room owner id (want to refactor this out but it has to be here lol)
    function emitRoomData(roomData) {
      roomOwnerID = roomData.roomOwnerID;
      console.log(roomOwnerID);
      delete roomData.roomOwnerID;
      let action = {type: 'UPDATE_ROOM_STATE', payload: roomData}
      sk.emitToUser(action);
    }
  });

  socket.on('action', (action) => {
    const actionMap = actionHandler(roomOwnerID, dbHelpers, sk, rm);
    const executeAction = actionMap[action.type];
    executeAction(action);
  });

  socket.on('disconnect', () => {
    rm.removeFromClientsStore();
    let action = {type: 'UPDATE_USERS_ONLINE', payload: {usersOnline: clients[room]}};
    sk.broadcastToRoomInclusive(room, action);
  });
});
