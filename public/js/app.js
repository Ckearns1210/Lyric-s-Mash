
$(function(){

    $("#search-button").on('click', function(e) {
        e.preventDefault();
        var searchTerm1 = $('#input-4').val();
        $.get(('/lyric/' + searchTerm1), render);
        var searchTerm2 = $('#input-5').val();
        $.get(('/lyric/' + searchTerm2), render1);
        var searchTerm3 = $('#input-6').val();
        $.get(('/lyric/' + searchTerm3), render2);

    });


var render = function (data) {
    var parser = JSON.parse(data);
    var songList = parser.message.body.track_list;
    // console.log(songList[0]);
    var random = Math.floor(Math.random() * (songList.length + 1));
    // var $lyric1 = $('<p>').text( JSON.stringify(songList[random]));

    var randomTrack = songList[random].track;

    var spotifyId = randomTrack.track_spotify_id;
    var trackId = randomTrack.track_id;
    console.log(spotifyId);
    console.log(randomTrack);
    console.log(trackId);

    $.get(('/track/' + trackId), function(data){
        var parser = JSON.parse(data);
        console.log(parser);

        var trackBody = parser.message.body.lyrics.lyrics_body;
        var searchTerm = $('#input-4').val();
        if (trackBody.indexOf(searchTerm) === -1)  {
            var tracked = $.get(('/lyric/' + $('#input-4').val()), render);
        } else {

            findLine = trackBody.split(/\n/g);
            theIndex = 0;
            for (i = 0; i < findLine.length; i++){
                if (findLine[i].indexOf(searchTerm) >=1){
                    theIndex = i;
                }
            }

        console.log(trackBody);
        $('#show-lyrics').append($('<p>').text(findLine[theIndex]));
        }

    });
};

var render1 = function (data) {
    var parser = JSON.parse(data);
    var songList = parser.message.body.track_list;
    // console.log(songList[0]);
    var random = Math.floor(Math.random() * (songList.length + 1));
    // var $lyric1 = $('<p>').text( JSON.stringify(songList[random]));

    var randomTrack = songList[random].track;

    var spotifyId = randomTrack.track_spotify_id;
    var trackId = randomTrack.track_id;
    console.log(spotifyId);
    console.log(randomTrack);
    console.log(trackId);

    $.get(('/track/' + trackId), function(data){
        var parser = JSON.parse(data);
        console.log(parser);

        var trackBody = parser.message.body.lyrics.lyrics_body;
        var searchTerm = $('#input-5').val();
        if (trackBody.indexOf(searchTerm) === -1)  {
            var tracked = $.get(('/lyric/' + $('#input-5').val()), render1);
        } else {

            findLine = trackBody.split(/\n/g);
            theIndex = 0;
            for (i = 0; i < findLine.length; i++){
                if (findLine[i].indexOf(searchTerm) >=1){
                    theIndex = i;
                }
            }

        console.log(trackBody);
        $('#show-lyrics').append($('<p>').text(findLine[theIndex]));
        }

    });
};

var render2 = function (data) {
    var parser = JSON.parse(data);
    var songList = parser.message.body.track_list;
    // console.log(songList[0]);
    var random = Math.floor(Math.random() * (songList.length + 1));
    // var $lyric1 = $('<p>').text( JSON.stringify(songList[random]));

    var randomTrack = songList[random].track;

    var spotifyId = randomTrack.track_spotify_id;
    var trackId = randomTrack.track_id;
    console.log(spotifyId);
    console.log(randomTrack);
    console.log(trackId);

    $.get(('/track/' + trackId), function(data){
        var parser = JSON.parse(data);
        console.log(parser);

        var trackBody = parser.message.body.lyrics.lyrics_body;
        var searchTerm = $('#input-6').val();
        if (trackBody.indexOf(searchTerm) === -1)  {
            var tracked = $.get(('/lyric/' + $('#input-6').val()), render2);
        } else {

            findLine = trackBody.split(/\n/g);
            theIndex = 0;
            for (i = 0; i < findLine.length; i++){
                if (findLine[i].indexOf(searchTerm) >=1){
                    theIndex = i;
                }
            }

        console.log(trackBody);
        $('#show-lyrics').append($('<p>').text(findLine[theIndex]));
        }

    });
};
});
