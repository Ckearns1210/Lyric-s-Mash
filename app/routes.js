var request     = require('request');
    bodyParser  = require('body-parser');


module.exports = function(app, passport) {

app.get('/lyric/:search', function(req,res){
   console.log("im here");

   request("http://api.musixmatch.com/ws/1.1/track.search?f_has_lyrics=1&page=1&page_size=15&q_lyrics="+ encodeURI(req.params.search) +"&s_track_rating=desc&apikey=5ee8f20d45e92ada39d80eb87c848687", function (error, response, body) {
       trySendData(body, res);
   });
});

app.get('/track/:search', function(req,res){
    console.log("im here");

    request("http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + encodeURI(req.params.search) + "&apikey=5ee8f20d45e92ada39d80eb87c848687", function (error, response, body) {
        trySendData(body, res);
    });
});

app.get('/spotify/:search', function(req, res) {
    request("https://api.spotify.com/v1/tracks/" + encodeURI(req.params.search), function (error, response, body) {
        trySendData(body, res);
    });
});

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/login', function (req, res) {
    res.render('login.ejs', {message: req.flash('loginMessage')});
});

app.get('/signup', function(req, res) {
    res.render('signup.ejs', {message: req.flash('signupMessage')});
});

// app.get('/profile', isLoggedIn, function(req, res) {
//     res.render('profile.ejs', {
//       user: req.user
//     });
//   });
// ^^ authentcation previos ^^

app.get('/profile', function(req, res) {
    res.render('profile.ejs', {
      user: req.user
    });
  });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash    : true
}));

app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect: '/login',
    failureFlash   : true
}));

app.post('/', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash    : true
}));

app.post('/', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect: '/login',
    failureFlash   : true
}));


};

  //Protect user pages from access when not authenticated

var isLoggedIn = function (req, res, next) {
  if(req.isAuthenticated())
  return next();

  res.redirect('/');
};

var trySendData = function(item,res){
    item ? res.send(item) : res.sendStatus(404).end();
};
