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

//Only use knexLogger in development
if (process.env.ENV === 'development') {
  const knexLogger = require('knex-logger');
  app.use(knexLogger(knex));
}


//JSON WEB TOKEN CONFIG
const jwt           = require('jsonwebtoken');
const jwtSecret     = process.env.TOKEN_SECRET || "development";
const socketioJwt   = require('socketio-jwt');

//Modules
const dbHelpers     = require('./data-helpers')(knex);

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
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
  function(accessToken, refreshToken, profile, done) {
    knex('users').where('github_id', profile.id).then(user => {
      if (user.length === 0) {
        knex('users').insert({
          github_login: profile.username,
          github_avatar: profile._json.avatar_url,
          github_name: profile.displayName,
          github_id: profile.id,
          github_access_token: accessToken
        }).returning('github_id')
          .then((github_id) => {
            return done(null, github_id[0]);
          });
      } else {
        knex('users').where('github_id', profile.id).update({
          github_access_token: accessToken
        }).returning('github_id')
          .then((github_id) => {
            return done(null, github_id[0]);
          });
      }
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
  //Define source of bundle.js depending on environment
  let bundleSrc;
  if(req.user) {
    if (process.env.ENV === 'production') {
      bundleSrc = '/bundle.js';
    } else {
      bundleSrc = 'http://localhost:8080/build/bundle.js';
    }
    res.locals.bundleSrc = bundleSrc;
  }
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/rooms', ensureAuthenticated, function(req, res) {
  res.render('rooms');
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/users/:username', (req, res) => {
  const classrooms = knex('classrooms').where('user_id', 'in',
    knex('users').where('github_login', req.params.username).select('id').limit(1)
  );
  const user = knex.select('*').from('users').where('github_login', req.params.username).limit(1);
  Promise.all([classrooms, user]).then((profileData) => {
    res.render('show_user', {classrooms: profileData[0], user: (profileData[1])[0]});
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
        res.redirect('/'); //should redirect to a 404 error page
        return;
      }
      res.render('show_room');
    });
});

app.post('/rooms', (req, res) => {
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
});

//Posting a gist
function getUser(request) {
  return knex('users').where('github_id', request.session.passport.user);
}

function defineFileExtension(language) {
  let extension;
  switch (language) {
  case 'javascript':
    extension = '.js';
    break;
  case 'ruby':
    extension = '.rb';
    break;
  case 'python':
    extension = '.py';
  }
  return extension;
}

app.post('/savegist', function (req, res) {
  const extension = defineFileExtension(req.body.data.language);
  getUser(req).then((row) => {
    const user = row[0];
    // console.log('user', user);
    request.post(
      {
        url: "https://api.github.com/gists",
        headers: {
          "User-Agent": "waffleio gist creatifier (student project)",
          "Authorization": `token ${user.github_access_token}`
        },
        "body": JSON.stringify({
          "files": {
            [`${req.body.data.title}${extension}`]: {
              "content": req.body.data.content
            }
          }
        })
      }, function(error, response, body) {
      console.log("gist-post response:", response);
      if (error) {
        console.log("posting gist to github failed", error);
        return res.status(500).send("oh god the pain");
      } else {
        return res.send("zug zug");
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

  // socket.decoded_token contains user data in token
  const clientData = socket.decoded_token;
  let roomOwnerID;
  let roomKey;

  function broadcastToRoom(room, action) {
    socket.broadcast.to(room).emit('action', action);
  }

  function emitToUser(action) {
    socket.emit('action', action);
  }

  function broadcastToRoomInclusive(room, action) {
    io.in(room).emit('action', action);
  }

  // When user joins a room specified by room key in url, update room list and broadcast to all users, then emit room data to user
  socket.on('join', (room) => {
    socket.join(room);
    roomKey = room;
    console.log(`${clientData.github_login} is now connected to room ${room}`);

    if (!clients.hasOwnProperty(room)) {
      clients[room] = [];
    }
    clients[room].push({id: socket.id, name : clientData.github_login, avatar : clientData.github_avatar});
    let action = {type: 'UPDATE_USERS_ONLINE', payload: {usersOnline: clients[room]}}
    broadcastToRoomInclusive(room, action);

    dbHelpers.setRoomData(room, clientData.id, emitRoomData);

    function emitRoomData(roomData) {
      roomOwnerID = roomData.roomOwnerID;
      roomData.messages.forEach((message) => {
        message.id = 'M_' + message.id
        message.timestamp = moment(message.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a");
      })
      console.log(roomData);
      delete roomData.roomOwnerID;
      let action = {type: 'UPDATE_ROOM_STATE', payload: roomData}
      emitToUser(action);
    }
  });

  // When user emits to server, switch statement accesses action and processes data accordingly, then sends back through socket
  socket.on('action', (action) => {
    // console.log('Action received on server: \n', action);

    switch(action.type) {
    case 'UPDATE_EDITOR_VALUES': {
      if (roomOwnerID === clientData.id) {
        dbHelpers.updateEditorValues(action.payload.roomID, action.payload.editorValue, broadcastToRoom);
        broadcastToRoom(action.room, action);
        break;
      }
      break;
    }
    case 'TOGGLE_EDITOR_LOCK': {
      if (roomOwnerID === clientData.id) {
        dbHelpers.toggleEditorLock(action.payload.roomID, action.payload.isEditorLocked, broadcastToRoom);
        broadcastToRoom(action.room, action);
        break;
      }
      break;
    }
    case 'TOGGLE_CHAT_LOCK': {
      if (roomOwnerID === clientData.id) {
        dbHelpers.toggleChatLock(action.payload.roomID, action.payload.isChatLocked, broadcastToRoom);
        broadcastToRoom(action.room, action);
        break;
      }
      break;
    }
    case 'EXECUTE_CODE' : {
      if (roomOwnerID === clientData.id) {
        broadcastToRoom(action.room, action);
        break;
      }
      break;
    }
    case 'SEND_OUTGOING_MESSAGE': {
      let newAction = {
        type: 'RECEIVE_NEW_MESSAGE',
        payload: {
          id: 'M_' + Date.now(),
          name: clientData.github_login,
          content: action.payload.content,
          avatarurl: clientData.github_avatar,
          timestamp: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
        }
      }
      dbHelpers.storeMessage(action.payload.roomID, clientData.id, action.payload.content, broadcastToRoomInclusive);
      broadcastToRoomInclusive(action.room, newAction);
      break;
    }
    case 'CHANGE_EDITOR_THEME': {
      dbHelpers.changeEditorTheme(clientData.id, action.payload.userSettings.theme);
      break;
    }
    case 'CHANGE_FONT_SIZE': {
      dbHelpers.changeFontSize(clientData.id, action.payload.userSettings.fontSize);
      break;
    }
    }
  });

  // When a user disconnects, update the clients object in memory, then emit to all users the updated list of users
  socket.on('disconnect', () => {
    console.log(`${clientData.github_login} is now disconnected`);
    const clientIndex = clients[roomKey].findIndex(client => client.id === socket.id);
    if (clientIndex > -1) {
      clients[roomKey].splice(clientIndex, 1);
    }

    //If no users are in room, delete property from memory
    if (clients[roomKey].length === 0) {
      delete clients[roomKey];
    }
    socket.to(roomKey).emit('action', {type: 'UPDATE_USERS_ONLINE', payload: {usersOnline: clients[roomKey]}});
  });
});
