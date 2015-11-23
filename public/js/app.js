$(function(){

  var renderTemplate_showMany = Handlebars.compile( $('template#show-many').html());
  var renderTemplate_login = Handlebars.compile( $('template#login').html());
    $("#search-button").on('click', function(e) {
        e.preventDefault();
        var searchTerm = $('#input-4').val();
        $.get(('/lyric/' + searchTerm), {type:$('#search-field').val()}, render);
    });

    //if no user is logged in
    $.get('/login/', renderLogin)


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

var renderLogin = function() {
  console.log('hitting login')

  var html = renderTemplate_login;
  $('#login-page').html('').show().append(html);
}



});
