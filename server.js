var express     = require('express'),
    logger      = require('morgan'),
    app         = express(),
    router      = express.Router(),
    request     = require('request'),
    mongoose    = require('mongoose'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    lyric       = require('./controllers/lyric_controller.js')

;

app.use(logger('dev'));
app.use(express.static('public') );
app.listen(3000, function(req,res){
    console.log('Goodbye old friend, Till I see you Again');
});

app.get('/', function (req, res) {
    res.send("I Work");
});

app.use('/', lyric);


fs.readdirSync('./controllers').forEach(function (file){
    if(file.substr(-3) == '.js'){
        route = require('./controllers/' + file);
        route.controller(app);
    }
});
