
$(function(){

    $("#search-button").on('click', function(e) {
        e.preventDefault();
        var searchTerm1 = $('#input-4').val();
        $.get(('/lyric/' + searchTerm1), render);

    });

var getLyric = function(){

};

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
        console.log(trackBody);
        $('#show-lyrics').append(trackBody);
        }

    });



};


});
