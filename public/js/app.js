
$(function(){

    $("#search-button").on('click', function(e) {
        e.preventDefault();
<<<<<<< HEAD
<<<<<<< HEAD
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

=======
          $.each($('.inputter'), function () {
            var $currentItem = $(this);
            var searchTerm = $currentItem.val();
            $.get('/lyric/' + searchTerm, render.bind(undefined, searchTerm), 'json');

        });
>>>>>>> ba9ee40457f9c3728339031268f8419ac99bcc10
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
          var song = trackBody

          $("#talk").click(function() {
            console.log('talking')
            // var msg = new SpeechSynthesisUtterance('bro');
            // window.speechSynthesis.speak(msg);

            var msg = new SpeechSynthesisUtterance();
            var voices = window.speechSynthesis.getVoices();
            msg.voice = voices[3]; // Note: some voices don't support altering params
            msg.voiceURI = 'native';
            msg.volume = 1; // 0 to 1
            msg.rate = 1.2; // 0.1 to 10
            msg.pitch = 1; //0 to 2
            msg.text = trackBody;
            msg.lang = 'en-US';

            msg.onend = function(e) {
              console.log('Finished in ' + event.elapsedTime + ' seconds.');
            };

            window.speechSynthesis.speak(msg);


          });



<<<<<<< HEAD


        $('#show-lyrics').append($('<p>').text(findLine[theIndex]));
        }

    });
};
//<<<<<<< HEAD
// var renderSongLryics = function(data) {
//     var parser = JSON.parse(data);
//     var lyrics = parser.message.body.track_list;
//     console.log(lyrics);
//
// }
//=======

var render2 = function (data) {
    var parser = JSON.parse(data);
    var songList = parser.message.body.track_list;
    // console.log(songList[0]);
    var random = Math.floor(Math.random() * (songList.length + 1));
    // var $lyric1 = $('<p>').text( JSON.stringify(songList[random]));
//>>>>>>> adb41c4dd9b7071d3e9492647b3e1032bdb6a5fa

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
=======
          $.each($('.inputter'), function () {
            var $currentItem = $(this);
            var searchTerm = $currentItem.val();
            $.get('/lyric/' + searchTerm, render.bind(undefined, searchTerm), 'json');

        });
    });

    var render = function (searchTerm, data, xhr){
        var _render = render.bind(searchTerm, data);

        // verify that message body exists

        var songList = data.message.body.track_list;
=======
    var render = function (searchTerm, data, xhr){
        var _render = render.bind(searchTerm, data);

        // verify that message body exists

        var songList = data.message.body.track_list;


        //shuffled songlist
>>>>>>> ba9ee40457f9c3728339031268f8419ac99bcc10

        var collection = shuffle(songList);

<<<<<<< HEAD
        //shuffled songlist

        var collection = shuffle(songList);
>>>>>>> ba9ee40457f9c3728339031268f8419ac99bcc10

        var recursiveIterator = (function _rci(item) {
            $.get('/track/' + item.track.track_id, function (data) {
                var trackBody = data.message.body.lyrics.lyrics_body;
                var re = new RegExp ( '\\b' + searchTerm + '\\b', 'g');
                var foundLine = trackBody.split(/\n/g).find( function(el){
                    return el.match(re);
                });
                return foundLine ? successfulItems(foundLine) : _rci(collection.pop());
            }, 'json');

=======
        var recursiveIterator = (function _rci(item) {
            $.get('/track/' + item.track.track_id, function (data) {
                var trackBody = data.message.body.lyrics.lyrics_body;
                var re = new RegExp ( '\\b' + searchTerm + '\\b', 'g');
                var foundLine = trackBody.split(/\n/g).find( function(el){
                    return el.match(re);
                });
                return foundLine ? successfulItems(foundLine) : _rci(collection.pop());
            }, 'json');

>>>>>>> ba9ee40457f9c3728339031268f8419ac99bcc10
        })(collection.pop());

    };
});

var successfulItems = function(word){

    $('#show-lyrics').append($('<p>').text(word));
};

var shuffle = function(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
