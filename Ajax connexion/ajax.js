$('#btn-connexion').on('click', function(e){
    e.preventDefault();
    var connexion = {login: $('#login').val(), password: $('#password').val()};
    
    $.ajax({
        method: "POST",
        url: "donnee.php",
        dataType: "html",
        data: connexion
    })
    .done(function (xhr) {
        if(xhr == 'Success'){
            location.reload();
        }else{
            alert('Identifiant incorrect');
        }
    });
});