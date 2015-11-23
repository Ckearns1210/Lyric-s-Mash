var express     = require('express'),
    router      = express.Router(),
    request     = require('request'),
    mongoose    = require('mongoose'),
    Movie     = require('../models/lyric.js')
;

var trySendData = function(item,res){
    item ? res.send(item) : res.sendStatus(404).end();
};

router.get('/lyric/:search', function(req,res){
    console.log("im here");

    request("http://api.musixmatch.com/ws/1.1/track.search?f_has_lyrics=1&page=1&page_size=15&q_lyrics="+ encodeURI(req.params.search) +"&s_track_rating=desc&apikey=032f5b65b1a0deac1f5f44afc9d548c0", function (error, response, body) {
        trySendData(body, res);
    });
});

// router.get('/lyric/:search', function(req,res){
//     console.log("im here");
//
//     request("http://api.lyricsnmusic.com/songs?api_key=53f1395dbd8adff15b086199e1c500&lyrics=" + encodeURI(req.params.search), function (error, response, body) {
//         trySendData(body, res);
//     });
// });

module.exports = router;



module.exports.controller = function (app) {

    app.get('/lyric', function (req, res, next) {
        Lyric.find().exec(function (err, lyrics) {
            if(err) return next(err);
            res.send(lyrics);
        });
    });
};
