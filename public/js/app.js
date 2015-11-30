
$(function() {
    //hide the play button
    $('#mash-button').hide();

    /////////////////////PLAY BUTTON CLICK EVENT//////////////////////////

    //add click event to play button
    $("#mash-button").click(function() {
        //create audio placeholder variable
        var audio = '';
        //Pick random song
        (randomMusic = function() {
            var musicRandomizer = Math.floor((Math.random() * 8) + 1);
            audio = new Audio('../music/' + musicRandomizer + '.mp3')
        })();
        //set audio volume
        audio.volume = .3;

        //Random Voice Generator
        var randomVoices = function() {
            var voices = responsiveVoice.getVoices();
            var collectVoices = [];
            collectVoices.push(voices[0], voices[1], voices[2], voices[3], voices[4], voices[5], voices[7], voices[14], voices[20], voices[23], voices[60], voices[61]);
            var voiceRandomer = Math.floor((Math.random() * collectVoices.length) + 1);
            return collectVoices[voiceRandomer].name;
        };
        //Once we have random song and random voice, speak it
        responsiveVoice.speak(message.join(), randomVoices());

        //If still speaking, play background, if not, pause.  setTimeout to avoid max stack calls
         (isPlayingRecursion = function() {
            if (responsiveVoice.isPlaying()) {
                console.log('recursive running!')
                audio.play();
                window.setTimeout(isPlayingRecursion, 500)
            } else {
                console.log('hit pause')
                audio.pause();
            }
        })();
        //end of play button click event
    });

    ///////////////////////////SEARCH BUTTON CLICK EVENT/////////////////////////////


    $("#search-button").on('click', function(e) {
        //clear global message variable used for speech above
        message = [];
        e.preventDefault();
        //empty lyrics container
        $('#show-lyrics').empty();
        //iterate over values of input and make first API calls to get list of songs with that lyric
        $.each($('.inputter'), function() {
            var $currentItem = $(this);
            var searchTerm = $currentItem.val();
            //returns a list of songs with that lyric, but not the actual lyrics, binging the searchTerm to be used later, but leaving the scope.
            $.get('/lyric/' + searchTerm, render.bind(undefined, searchTerm), 'json');
        });
    });

<<<<<<< HEAD
    var render = function (searchTerm, data, xhr){
      console.log(data)
        var _render = render.bind(searchTerm, data);
=======
    //adds enter capabilities to search-button click event
    $('.inputter').keypress(function(e) {
        var key = e.which;
        if (key === 13) {
            $('#search-button').click();
            return false;
        }
    });
>>>>>>> dev2

    /////////////////////////RENDER//////////////////////////////////////

    var render = function(searchTerm, data, xhr) {
        //binding in case of later need
        var _render = render.bind(searchTerm, data);
        //get song list
        var songList = data.message.body.track_list;
        //shuffle songlist
        var collection = shuffle(songList);

        var recursiveIterator = (function _rci(item) {
<<<<<<< HEAD
          if (item != undefined ) {
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

        }
      else {
        alert('Could not find ' + searchTerm + ', please try another word!');

      }})(collection.pop());

    };
});


var successfulItems = function(word, item, searchTerm){

  var spotifyID = item.track.track_spotify_id;

  var $newSpan = $('<span class = lyrics-span>')
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
       });
    spotifyCall(spotifyID, searchTerm);
};

var spotifyCall = function(spotifyID, searchTerm) {
  $.get('/spotify/' + spotifyID, function(data) {
    renderSpotify(data, spotifyID);
  }, 'json');
}

var renderSpotify = function(data, spotifyID) {
  console.log(data)
  var artists = data.artists
  var artistsNames = [];
  artists.forEach(function(el) {
    artistsNames.push(el.name)
  })
  var songName = data.name;
  var imageURL = data.album.images[2].url;
  var spotifyLink = data.external_urls.spotify
$(".lyrics-span-artist-info" + "." + spotifyID).text("Artists: " + artistsNames.toString() + " Song Name: " + songName);
  //create a a href in a span and append to lyrics paragragh
        var $img = $('<img />',{
                    class: 'artist-image',
                     src: imageURL,
                   })
                    .appendTo($('.lyrics-span-clearfix' + "." + spotifyID));
                    $('.lyrics-span-clearfix' + "." + spotifyID).addClass('has-image');

  var $newLink = $("<a />", {
    class : "spotify-link",
    href : spotifyLink,
    text: "spotify link"
}).appendTo($('.lyrics-span-artist-info' + "." + spotifyID));
};
=======
            //guard against terms that couldn't be found
            if (item !== undefined) {
                //if passes guard, make second api call with track ID to get lyrics
                $.get('/track/' + item.track.track_id, function(data) {
                    //get track body
                    var trackBody = data.message.body.lyrics.lyrics_body;
                    //instantiate new RegExp to check for word boundairies, case insentive and global
                    var re = new RegExp('\\b' + searchTerm + '\\b', 'gi');
                    //split by line, and check lines for search term with RegExp, return line if found
                    var foundLine = trackBody.split(/\n/g).find(function(el) {
                        return el.match(re);
                    });
                    //guard agaisnt unwanted possibility
                    if (foundLine === "******* This Lyrics is NOT for Commercial use *******") {
                        foundLine = false;
                    }
                    //otherwise check if we found the line and either call next functions with bounded arguments or recurse with a second item from the shuffled collection of songs
                    return foundLine ? successfulItems(foundLine, item, searchTerm) : _rci(collection.pop());
                }, 'json');

            } else {
                //if not found
                alert('Could not find ' + searchTerm + ', please try another word!');
                //immediately invoke
            }
        })(collection.pop());
        //end of render
    };
    ////////////////////////////JQUERY APPEND////////////////////////////

    var successfulItems = function(word, item, searchTerm) {
        //save spotifyID from musixmatch API return
        var spotifyID = item.track.track_spotify_id;
        //show play button
        $('#mash-button').show();

        //Create and append neccesary spans to show results, including hidden hovers to be used later after Spotify Call
        var $lyricSpan = $('<span class = lyrics-span>');
        var $lyricText = $('<p>').text(word);
        $lyricSpan.append($lyricText);
        $('#show-lyrics').append($lyricSpan);
        var $lyricSpanClearFix = $('<span class = lyrics-span-clearfix>');
        //Add class of the spotifyID so each div can be identified when appending info
        $lyricSpanClearFix.addClass(spotifyID);
        var $lyricSpanArtistInfo = $('<span class = lyrics-span-artist-info>');
        //Add class of the spotifyID so each div can be identified when appending info
        $lyricSpanArtistInfo.addClass(spotifyID);
        $lyricSpan.append($lyricSpanClearFix);
        $lyricSpanClearFix.append($lyricSpanArtistInfo);
        //push the results into the global message Array to be read
        message.push(word);
        //Call spotify with necceary arguments for API call
        spotifyCall(spotifyID, searchTerm);

    };

    /////////////////////////SPOTIFY API CALL/////////////////////////

    //call spotify api with ID
    var spotifyCall = function(spotifyID, searchTerm) {
        $.get('/spotify/' + spotifyID, function(data) {
            renderSpotify(data, spotifyID);
        }, 'json');
    };
>>>>>>> dev2

    var renderSpotify = function(data, spotifyID) {
        //parse spotify data
        var artists = data.artists;
        var artistsNames = [];
        artists.forEach(function(el) {
            artistsNames.push(el.name);
        });
        var songName = data.name;
        var imageURL = data.album.images[1].url;
        var spotifyLink = data.external_urls.spotify;
        //create spotify divs to append to the spans created earlier, add the info for them
        var songDiv = $("<p class='song-data'>").text("Song Name: " + songName);
        var artistDiv = $("<p class='artist-data'>").text("Artists: " + artistsNames.toString());
        //append to earlier Spans by ID
        $(".lyrics-span-artist-info" + "." + spotifyID).append(artistDiv).append(songDiv);
        //create img tag
        var $img = $('<img />', {
                class: 'artist-image',
                src: imageURL,
            })
            .appendTo($('.lyrics-span-clearfix' + "." + spotifyID));
        //append and add class so we know it has image
        $('.lyrics-span-clearfix' + "." + spotifyID).addClass('has-image');
        //create play spotify button
        var $playSpotifyP = $('<p />', {
                class: "spotify-play",
                text: "Play Song Now"
            })
            .appendTo($('.lyrics-span-artist-info' + "." + spotifyID));
        //add on click logic for spotify button
        $playSpotifyP.on('click', function(e) {
            $('.spotify-widget-container').empty();
            var $spotifyWidget = $('<iframe>', {
                src: "https://embed.spotify.com/?uri=spotify:track:" + spotifyID,
                width: "300",
                height: "80",
                frameborder: "0",
                allowtransparency: "true",
                class: "spotify-widget"
            }).appendTo($('.spotify-widget-container'));
        });
    };

    //Shuffle Function
    var shuffle = function(array) {
        var m = array.length,
            t, i;

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
});
//GLOBAL MESSAGE ARRAY SORRY MOM
var message = [];
