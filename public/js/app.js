$(function(){
  $('#mash-button').hide();

    $("#search-button").on('click', function(e) {
        e.preventDefault();
        $('#show-lyrics').empty();


          $.each($('.inputter'), function () {
            var $currentItem = $(this);
            var searchTerm = $currentItem.val();
            // var searchTerm = presearchTerm.split(' ').join("+");
            $.get('/lyric/' + searchTerm, render.bind(undefined, searchTerm), 'json');

        });
    });

    var render = function (searchTerm, data, xhr){
      console.log(data);
        var _render = render.bind(searchTerm, data);

        // verify that message body exists

        var songList = data.message.body.track_list;
        console.log(songList);


        //shuffled songlist
        var collection = shuffle(songList);
        console.log(collection);

        var recursiveIterator = (function _rci(item) {
          if (item !== undefined ) {
                $.get('/track/' + item.track.track_id, function (data) {
                    var trackBody = data.message.body.lyrics.lyrics_body;
                    var re = new RegExp ( '\\b' + searchTerm + '\\b', 'gi');
                    var foundLine = trackBody.split(/\n/g).find( function(el){
                        return el.match(re);
                    });
                    if (foundLine === "******* This Lyrics is NOT for Commercial use *******") {
                      foundLine = false;
                    }
                    return foundLine ? successfulItems(foundLine, item, searchTerm) : _rci(collection.pop());
            }, 'json');

            } else {
                alert('Could not find ' + searchTerm + ', please try another word!');

        }})(collection.pop());

    };
});


var successfulItems = function(word, item, searchTerm){

  var spotifyID = item.track.track_spotify_id;

  $('#mash-button').show();
  var $newSpan = $('<span class = lyrics-span>');
  var $newP = $('<p>').text(word);
  $newSpan.append($newP);
  $('#show-lyrics').append($newSpan);
  var $newSpanClearFix = $('<span class = lyrics-span-clearfix>');
  $newSpanClearFix.addClass(spotifyID);
  var $newSpanArtistInfo = $('<span class = lyrics-span-artist-info>');
  $newSpanArtistInfo.addClass(spotifyID);
  $newSpan.append($newSpanClearFix);

  $newSpanClearFix.append($newSpanArtistInfo);



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

        //  console.log(speechSynthesis);
         //
        //  console.log( msg);

       });

    spotifyCall(spotifyID, searchTerm);

};





var spotifyCall = function(spotifyID, searchTerm) {
  $.get('/spotify/' + spotifyID, function(data) {
    renderSpotify(data, spotifyID);
  }, 'json');
};

var renderSpotify = function(data, spotifyID) {
  console.log(data);
  var artists = data.artists;
  var artistsNames = [];
  artists.forEach(function(el) {
    artistsNames.push(el.name);
});
  var songName = data.name;
  var imageURL = data.album.images[1].url;
  var spotifyLink = data.external_urls.spotify;
  var songDiv = $("<p class='song-data'>").text("Song Name: " + songName);
  var artistDiv = $("<p class='artist-data'>").text("Artists: " + artistsNames.toString());
$(".lyrics-span-artist-info" + "." + spotifyID).append(artistDiv).append(songDiv);

  //create a a href in a span and append to lyrics paragragh
        var $img = $('<img />',{
                    class: 'artist-image',
                     src: imageURL,
                   })
                    .appendTo($('.lyrics-span-clearfix' + "." + spotifyID));
                    // $('.lyrics-span-clearfix' + "." + spotifyID).addClass('has-image');


var $playSpotifyP = $('<p />', {
    class: "spotify-play",
    text: "Play Song Now"
}).appendTo($('.lyrics-span-artist-info' + "." + spotifyID));

$playSpotifyP.on('click', function(e) {
$('.spotify-widget-container').empty();
  var $spotifyWidget = $('<iframe>', {
    src: "https://embed.spotify.com/?uri=spotify:track:"  + spotifyID,
    width: "300",
    height: "80",
    frameborder: "0",
    allowtransparency: "true",
    class: "spotify-widget"
  }).appendTo($('.spotify-widget-container'));
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
};
