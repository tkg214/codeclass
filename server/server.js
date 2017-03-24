require('dotenv').config();

var express = require('express');
var passport = require('passport');
var util = require('util');
var session = require('express-session');
var bodyParser = require('body-parser');
var GitHubStrategy = require('passport-github2').Strategy;
var request = require('request');

// Passport session setup.
// TODO: Serialize will store user ID
// TODO: Deserialize will find user by ID
// For now, entire github profile is serialized and deserialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the GitHubStrategy within Passport.
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
  function(accessToken, refreshToken, profile, done) {
    profile.token = accessToken;
    // TODO: Rather than return github profile, lookup user in database and return that
    return done(null, profile);
  }
));

var app = express();

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

// Uncomment to serve static assets
//app.use(express.static(__dirname + '/public'));

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
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

  // Simple route middleware to ensure user is authenticated.
  // Pass this function to routes that needs to be protected.
  // If the request is authenticated (typically via a persistent login session),
  // the request will proceed. Otherwise, the user will be redirected to the
  // url passed to res.redirect()
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

app.get('/rooms', ensureAuthenticated, function(req, res){
  res.render('rooms', { user: req.user });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



//Posting gist to github on behlaf of current user

function makeGistPostOptions(request) {
  return {
    url: "https://api.github.com/gists",
    headers: {
      "User-Agent": request.user.username,
      "Authorization": `token ${request.user.token}`
    },
    "body": JSON.stringify({
      "files": {
        "file1.txt": {
          "content": "TEST CONTENT"
        }
      }
    })
  };
}

// Test posting a gist for the currently authentictaed user
app.get('/gists', function (req, res) {
  request.post(makeGistPostOptions(req), function(error, response, body) {
    if (!error) {
      console.log('statusCode:', response.statusCode);
      res.send("Success!");
    } else {
      console.log('error:', error);
    }
  });
});

// For socket io
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3000, () =>
  console.log("App listening on port 3000")
);

io.on('connection', (socket) => {
  console.log('New Connection :)');
  // socket.emit('action', { type: 'NEW_CONNECTION', payload: {data: 'hello'} });

  socket.on('action', (action) => {
    // console.log('Action received on server: ', action)
    switch(action.type) {
      case 'UPDATE_EDITOR_VALUES': {
        console.log('UPDATE')
        socket.emit('action', action)
      }
    }
  });
  socket.on('close', () => {
    console.log('Closed Connection :(')
  })
});
