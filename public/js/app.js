$(function(){

    $("#search-button").on('click', function(e) {
        e.preventDefault();
        var searchTerm = $('#input-4').val();
        $.get(('/lyric/' + searchTerm), {type:$('#search-field').val()}, render);
    });

    var renderTemplate_showMany = Handlebars.compile( $('template#show-many').html());

var render = function(data){
    var parser = JSON.parse(data);
    console.log(data);
    //capture the jquery destination/container

    //feed the template
    var html = renderTemplate_showMany({lyric:parser});
    $('#show-lyrics').html('').show().append(html);
    $('#input-4').val('');
    // $('#show-lyrics').text(data);
};



});
