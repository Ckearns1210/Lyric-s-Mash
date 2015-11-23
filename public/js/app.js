
$(function(){

    $("#search-button").on('click', function(e) {
        e.preventDefault();
        var searchTerm1 = $('#input-4').val();
        $.get(('/lyric/' + searchTerm1), render);
        var searchTerm2 = $('#input-5').val();
        $.get(('/lyric/' + searchTerm2), render2);
        var searchTerm3 = $('#input-6').val();
        $.get(('/lyric/' + searchTerm2), render3);
    });

    var renderTemplate_showMany = Handlebars.compile( $('template#show-many').html());

var render = function(data){
    var parser = JSON.parse(data);
    console.log(parser);

    // //combining works!
    // captured = _.extend($('#input-4').val(''), $('#input-5').val(''));
    //
    // //feed the template
    // var html = renderTemplate_showMany({lyric:parser});
    // $('#show-lyrics').html('').show().append(html);

    //cant get random of each element with random using template... can't figure it out
    //will do it with appending
    var rando = Math.floor(Math.random() * (parser.length + 1));
    var $lyric1 = $('<p>').text( JSON.stringify(parser[rando].snippet).replace(/[^A-Za-z0-9]/g, ' '));
    $('#show-lyrics').append($lyric1);
};

var render2 = function(data){
    var parser = JSON.parse(data);
    console.log(parser);

    var rando = Math.floor(Math.random() * (parser.length + 1));
    var $lyric2 = $('<p>').text( JSON.stringify(parser[rando].snippet).replace(/[^A-Za-z0-9]/g, ' '));
    $('#show-lyrics').append($lyric2);
};

var render3 = function(data){
    var parser = JSON.parse(data);
    console.log(parser);

    var rando = Math.floor(Math.random() * (parser.length + 1));
    var $lyric3 = $('<p>').text(JSON.stringify(parser[rando].snippet).replace(/[^A-Za-z0-9]/g, ' '));
    $('#show-lyrics').append($lyric3);
};



});
