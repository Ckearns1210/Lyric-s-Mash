
$(function(){

    $("#search-button").on('click', function(e) {
        e.preventDefault();
        // // var searchTerm3 = $('#input-6').val();
        // $.get('/lyric/' + searchTerm3, render2,'json');
        // // var searchTerm2 = $('#input-5').val();
        // $.get('/lyric/' + searchTerm2, render1 , 'json');
        // // var searchTerm1 = $('#input-4').val();
        // $.get('/lyric/' + searchTerm1, render , 'json');

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


        //shuffled songlist

        var collection = shuffle(songList);

        var recursiveIterator = (function _rci(item) {
            $.get('/track/' + item.track.track_id, function (data) {
                var trackBody = data.message.body.lyrics.lyrics_body;
                var re = new RegExp ( '\\b' + searchTerm + '\\b', 'g');
                var foundLine = trackBody.split(/\n/g).find( function(el){
                    return el.match(re);
                });
                return foundLine ? successfulItems(foundLine) : _rci(collection.pop());
            }, 'json');

        })(collection.pop());
        // randomize songlist
        // iterate over each, execute get track, if true get lyric
        // returns either true or false

        // var random = Math.floor(Math.random() * (songList.length + 1));
        //grab random track
        // var randomTrack = songList[random].track;
        //grab that tracks ID to for new api search
        // var trackId = randomTrack.track_id;

        // getSongLine(trackId);
    };


    // var getSongLine = function (trackId) {
    //     $.get(('/track/' + trackId), function(data){
    //     var parser = JSON.parse(data);
    //     console.log(parser);
    //
    //     var trackBody = parser.message.body.lyrics.lyrics_body;
    //     var searchTerm = $('#input-4').val();
    //
    //     if (trackBody.indexOf(searchTerm) === -1)  {
    //         var tracked = $.get(('/lyric/' + $('#input-4').val()), render);
    //     } else {
    //
    //     var foundLine = trackBody.split(/\n/g).find( function(el){
    //             return el.indexOf(searchTerm) >=1 ;
    //     });
    //
    //         /// error handle
    //
    //     console.log(trackBody);
    //     $('#show-lyrics').append($('<p>').text(foundLine));
    //     }
    //
    //     });
    //
    // };




});
var successfulItems = function(word){

    $('#show-lyrics').append($('<p>').text(word));
};

function shuffle(array) {
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
