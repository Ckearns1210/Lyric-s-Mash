$(function(){

    $("#search-button").on('click', function(e) {
        e.preventDefault();
          $.each($('.inputter'), function () {
            var $currentItem = $(this);
            var searchTerm = $currentItem.val();
            // var searchTerm = presearchTerm.split(' ').join("+");
            $.get('/lyric/' + searchTerm, render.bind(undefined, searchTerm), 'json');
        });
    });



    var render = function (searchTerm, data, xhr){
        var _render = render.bind(searchTerm, data);

        // verify that message body exists

        var songList = data.message.body.track_list;
        //console.log(songList)


        //shuffled songlist
        var collection = shuffle(songList);
        // console.log(collection);



        var recursiveIterator = (function _rci(item) {
          if (item != undefined ) {
            $.get('/track/' + item.track.track_id, function (data) {
                var trackBody = data.message.body.lyrics.lyrics_body;

                var re = new RegExp ( '\\b' + searchTerm + '\\b', 'g');

                var re = new RegExp ( '\\b' + searchTerm + '\\b', 'gi');

                var foundLine = trackBody.split(/\n/g).find( function(el){
                    return el.match(re);
                });
                if (foundLine === "******* This Lyrics is NOT for Commercial use *******") {
                  foundLine = false;
                }

                return foundLine ? successfulItems(foundLine, item) : _rci(collection.pop());
            }, 'json');

        }
      else {
        alert('Could not find ' + searchTerm + ', please try another word!');

      }})(collection.pop());

    };
});

var successfulItems = function(word, item){
    var album_cover = item.track.album_coverart_100x100;
    var artist_name = item.track.artist_name;
    var track_name = item.track.track_name;

    console.log(album_cover);
    console.log(artist_name);
    console.log(track_name);

    // appending the data to the front end. please forgive my sloppyness
    $('#show-album_cover').append($('<img src='+ album_cover+ '>'));
    $('#show-artist_name').append($('<p>').text(artist_name));
    $('#show-track_name').append($('<p>').text(track_name));

    $('#show-lyrics').append($('<p>').text(word));

    // this plays the 3 lyrics through Google Voice
    $("#mash-button").click(function() {

          var msg = new SpeechSynthesisUtterance();
          var voices = window.speechSynthesis.getVoices();
          msg.voice = voices[3]; // Note: some voices don't support altering params
          msg.voiceURI = 'native';
          msg.volume = 1; // 0 to 1
          msg.rate = 1; // 0.1 to 10
          msg.pitch = 1; //0 to 2
          msg.text = word;
          msg.lang = 'en-US';

          msg.onend = function(e) {
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
          };

          window.speechSynthesis.speak(msg);


        });

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
