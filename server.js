var express     = require('express'),
    logger      = require('morgan'),
    app         = express(),
    router      = express.Router(),
    request     = require('request'),
    mongoose    = require('mongoose'),
    bodyParser = require('body-parser'),
    lyric       = require('./controllers/lyric_controller.js'),
    user        = require('./controllers/user_controller.js'),
    sessions    = require('./controllers/sessions_controller.js')
    passport    = require('passport'),
    flash       = require('connect-flash'),
    cookieParser= require('cookie-parser'),
    session     = require('express-session');

    mongoose.connect('mongodb://localhost/jjtc', function (err) {
      if(err){
        console.log('connection error', err);
      } else {
        console.log('connection successful');
      }
    });

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({
  secret: "thisismysecret",
  saveUnitialized: false,
  resave: false
}));
app.use(flash());
app.use(express.static('public') );
app.listen(3000, function(req,res){
    console.log('Goodbye old friend, Till I see you Again');
});

app.get('/', function (req, res) {
    res.send("I Work");
});

app.use('/', lyric);
app.use('/', user);
app.use('/', sessions)
