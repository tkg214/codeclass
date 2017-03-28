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
const knexLogger    = require('knex-logger');

app.use(knexLogger(knex));

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
    console.log(accessToken);
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
    //Use this redirect while proxy is on
    res.redirect(`http://${req.session.returnHost}${(req.session.returnTo || '/rooms')}`);
    // Otherwise uncomment following line when proxy off
    // res.redirect(req.session.returnTo || '/rooms');

    delete req.session.returnTo;
    //Comment out the next line when proxy off
    delete req.session.returnHost;
  });

  // Pass this function to routes that needs to be protected.
  // If the request is authenticated the request will proceed.
  // Otherwise, the user will be redirected to the url passed to res.redirect()
  // Desired path is stored in user's to go to after authenticating.
function ensureAuthenticated(req, res, next) {
  //req.header.host needs to be part of the redirect while proxying dev server
  req.session.returnHost = req.headers.host;
  if (req.isAuthenticated()) { return next(); }
  req.session.returnTo = req.path;
  console.log(req.session.returnHost);
  console.log(req.session.returnTo);
  res.redirect('/login');
}

//Define request-local variables
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/login', function(req, res) {
  //req.header.host needs to be part of login while proxying dev server
  req.session.returnHost = req.headers.host;
  res.render('login');
});

app.get('/rooms', ensureAuthenticated, function(req, res) {
  res.render('rooms');
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/api/temproom', (req, res) => {
  res.render('show_room');
});

app.get('/rooms/:key', (req, res) => {
  res.render('show_room');
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
        url_string: req.body.topic
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .replace(/^\-|\-$/g, '')
          .toLowerCase()
      })
      .returning('url_string')
      .then((url_string) => {
        res.redirect(`/rooms/${url_string[0]}`);
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
  console.log('body', req.body, 'session', req.session);
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

// For socket io
// TODO use middleware here to authenticate user on each socket request

//Temp data
const roomData = require('./temp-room-api-data.json');
server.listen(3000, () =>
  console.log("App listening on port 3000")
);


io.on('connection', (socket) => {

  socket.on('join', (room) => {
    console.log(room);
    socket.join(room)
    let action = {type: 'UPDATE_ROOM_STATE', payload: roomData}
    socket.emit('action', action);

    socket.on('action', (action) => {
      // console.log('Action received on server: ', action)
      switch(action.type) {
        case 'UPDATE_EDITOR_VALUES': {
          // if user = authorized user, then emit the action
          socket.broadcast.to(action.room).emit('action', action);
          break;
        }
        case 'TOGGLE_EDITOR_LOCK': {
          socket.broadcast.to(action.room).emit('action', action);
          break;
        }
        case 'TOGGLE_CHAT_LOCK': {
          socket.broadcast.to(action.room).emit('action', action);
          break;
        }
        case 'EXECUTE_CODE' : {
          socket.broadcast.to(action.room).emit('action', action);
          break;
        }
        case 'SEND_OUTGOING_MESSAGE': {
          socket.broadcast.to(action.room).emit('action', action);
          break;
        }
        case 'CHANGE_EDITOR_THEME': {
          socket.emit('action', action);
          break;
        }
      }
    });

  });
  socket.on('close', () => {
    console.log('Closed Connection :(');
  });
});
