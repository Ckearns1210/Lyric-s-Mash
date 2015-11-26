$(function(){

    $("#search-button").on('click', function(e) {
        e.preventDefault();
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
