$(function(){

    $("#search-button").on('click', render);
});

var render = function(data) {
$.get('lyric/' + $("#input-4").val()).done(renderSingle);
};

var renderSingle = function(data){
var $result = $('<div id="show-lyric">');
$('#show-lyrics').append($result.text("hello"));
};
