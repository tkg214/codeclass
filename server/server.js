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

//JSON WEB TOKEN CONFIG
const jwt           = require('jsonwebtoken');
const jwtSecret     = process.env.TOKEN_SECRET || "development";
const socketioJwt   = require('socketio-jwt');

//Modules
const dbHelper      = require('./data-helpers')(knex);

app.use(knexLogger(knex));
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
  //socket.decoded_token contains user data in token
  const clientData = socket.decoded_token;
  let roomOwnerID;
  //When user joins a room
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`${clientData.github_login} is now connected to room ${room}`);

    if (!clients.hasOwnProperty(room)) {
      clients[room] = [];
    }
    clients[room].push({id: socket.id, name : clientData.github_login, avatar : clientData.github_avatar});
    console.log("action payload content: ", clients[room]);
    io.in(room).emit('action', {type: 'UPDATE_USERS_ONLINE', payload: {usersOnline: clients[room]}});


    //Get current state of room on new connection
    dbHelper.setRoomData(room, clientData, broadcastRoomData);
    function broadcastRoomData(roomData) {
      roomOwnerID = roomData.roomOwnerID;
      delete roomData.roomOwnerID;
      let action = {type: 'UPDATE_ROOM_STATE', payload: roomData}
      socket.emit('action', action)
    }

    socket.on('action', (action) => {
      console.log('Action received on server: ', action);
      console.log('roomOwnerID: ', roomOwnerID)
      console.log('clientData: ', clientData.id)
      switch(action.type) {
        case 'UPDATE_EDITOR_VALUES': {
          if (roomOwnerID === clientData.id) {
            knex('edits')
              .insert({
                classroom_id: action.payload.roomID,
                content: action.payload.editorValue
              })
              .then(() => {
                socket.broadcast.to(action.room).emit('action', action);
              });
            break;
          }
          break;
        }
        case 'TOGGLE_EDITOR_LOCK': {
          if (roomOwnerID === clientData.id) {
            knex('classrooms')
              .where({id: action.payload.roomID})
              .update({editorLocked: action.payload.isEditorLocked})
              .then(() => {
                socket.broadcast.to(action.room).emit('action', action);
              });
            break;
          }
          break;
        }
        case 'TOGGLE_CHAT_LOCK': {
          if (roomOwnerID === clientData.id) {
            knex('classrooms')
              .where({id: action.payload.roomID})
              .update({chatLocked: action.payload.isChatLocked})
              .then(() => {
                socket.broadcast.to(action.room).emit('action', action);
              });
            break;
          }
          break;
        }
        case 'EXECUTE_CODE' : {
          if (roomOwnerID === clientData.id) {
            socket.broadcast.to(action.room).emit('action', action);
            break;
          }
          break;
        }
        case 'SEND_OUTGOING_MESSAGE': {
          // TODO create knex insert that inserts into messages table based on classroom_id and user
          knex('messages')
            .insert({
              user_id: clientData.id,
              content: action.payload.content,
              classroom_id: action.payload.roomID
            })
            .then(() => {
              socket.broadcast.to(action.room).emit('action', action);
            });
          break;
        }
        case 'CHANGE_EDITOR_THEME': {
          // TODO do we need to do a promise here?
          knex('users')
            .where({id: clientData.id})
            .update({editor_theme: action.payload.userSettings.theme})
            .then(() => {
              socket.emit('action', action);
            });
          break;
        }
        case 'CHANGE_FONT_SIZE': {
          knex('users')
            .where({id: clientData.id})
            .update({font_size: action.payload.userSettings.fontSize})
            .then(() => {
              socket.emit('action', action);
            });
          break;
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('Closed Connection :(');
      const clientIndex = clients[room].findIndex(client => client.id === socket.id);
      if (clientIndex > -1) {
        clients[room].splice(clientIndex, 1);
      }

      //If no users are in room, delete property from memory
      if (clients[room].length === 0) {
        delete clients[room];
      }
      console.log(clients);
      socket.to(room).emit('action', {type: 'UPDATE_USERS_ONLINE', payload: {usersOnline: clients[room]}});
    });

  });

});
