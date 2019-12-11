var obj = {envoi:'coucou'};

$('button').on('click', function(e){
    e.preventDefault();
    
    $.ajax({
        method: "POST",
        url: "donnee.php",
        dataType: "html",
        data: obj
    })
    .done(function (xhr) {
        alert("Donnée : " + xhr)
    })
});