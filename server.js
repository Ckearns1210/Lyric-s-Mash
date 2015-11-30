var express     = require('express'),
    morgan      = require('morgan'),
    app         = express(),
    router      = express.Router(),
    request     = require('request'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser'),
    passport    = require('passport'),
    flash       = require('connect-flash'),
    cookieParser= require('cookie-parser'),
    session     = require('express-session');
    port        = process.env.PORT || 3000;
    configDB    = require('./config/database.js');

//mongoose DB
mongoose.connect(configDB.url);

require('./config/passport')(passport);

//EXPRESS SETUP
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

//TEMPLATE SETUP
app.set('view engine', 'ejs');
app.use(express.static('public') );

//PASSPORT SETUP
app.use(session({
  secret: "thisismysecret",
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
require('./app/routes.js')(app, passport);

//Port and Start
app.listen(port);
console.log('⛷ ⛷ ⛷ ⛷ ⛷ Cool runnings down through port 3000 🏂 🏂 🏂 🏂 🏂');

app.get('/', function (req, res) {
    res.send("I Work");
});
