
$(function(){

    $("#search-button").on('click', function(e) {
        e.preventDefault();
        var searchTerm1 = $('#input-4').val();
        $.get(('/lyric/' + searchTerm1), render);

    });


var render = function(data) {
    var parser = JSON.parse(data);
    var songList = parser.message.body.track_list;
    // console.log(songList[0]);
    var random = Math.floor(Math.random() * (songList.length + 1));
    // var $lyric1 = $('<p>').text( JSON.stringify(songList[random]));
    console.log(songList[random].track.track_id);
    // var theSong = songList[random].track.track_id
    // console.log(theSong.id);
    // console.log(parser);

};
// var renderSongLryics = function(data) {
//     var parser = JSON.parse(data);
//     var lyrics = parser.message.body.track_list;
//     console.log(lyrics);
//
// }

});
