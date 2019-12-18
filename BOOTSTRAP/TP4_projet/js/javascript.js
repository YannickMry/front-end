var madagascar = {
    nom: 'Madagascar',
    image: 'img/madagascar.jpg',
    alt: 'image madagascar',
    offre: 'Circuit aquatique, Lorem ipsum dolor sit amet',
    prix: '700€',
    details: 'Madagascar, Circuit aquatique, Lorem ipsum dolor sit amet, 700€',
};
var caraibe = {
    nom: 'Caraibe',
    image: 'img/maison.jpeg',
    alt: 'image maison',
    offre: 'Circuit exploration sous marine, Lorem ipsum dolor sit amet',
    prix: '900€',
    details: 'Caraïbe, Circuit exploration sous marine, Lorem ipsum dolor sit amet, 900€',
};
var canada = {
    nom: 'Canada',
    image: 'img/montagne.jpeg',
    alt: 'image montagnes',
    offre: 'Circuit montagne, Lorem ipsum dolor sit amet',
    prix: '999€',
    details: 'Canada, Circuit montagne, Lorem ipsum dolor sit amet, 999€',
};

var espagne = {
    nom: 'Espagne',
    image: 'img/ocean.jpeg',
    alt: 'image ocean',
    offre: 'Circuit océan, Lorem ipsum dolor sit amet',
    prix: '1050€',
    details: 'Espagne, Circuit océan, Lorem ipsum dolor sit amet, 1050',
};

console.log('Made with ♥');

var destinations = [];
destinations.push(madagascar, caraibe, canada, espagne);

var template = '<div class="destination col-3 my-3">' +
    '<img src="" alt="" style="width: 300px;">' +
'</div>'+
'<div class="offre col-6 text-break d-flex align-items-center"></div>' +
'<div class="prix col-1 d-flex justify-content-center align-items-center"></div>' +
'<div class="actions col-2 d-flex flex-column justify-content-center align-items-center">' +
    '<div class="row mb-4">' +
        '<button class="description btn btn-info">D</button>' +
        '<button class="modifier btn btn-warning mx-2"><i class="far fa-edit"></i></button>' +
        '<button class="supprimer btn btn-danger"><i class="fas fa-trash"></i></button>' +
    '</div>' +
    '<p>Description:<span class="details"></span></p>' +
'</div>';

var count = 0;

miseAJour(template);

$("#ajouter button").on('click', function(e){
    e.preventDefault();
    addDestiation();
});

// Ajouter une destination
function addDestiation(){
    var nomDestination = $('#ajouter_destination').val();
    var image = $('#ajouter_image').val();
    var altImage = $('#ajouter_alt').val();
    var offre = $('#ajouter_offre').val();
    var prix = $('#ajouter_prix').val();
    var details = $('#ajouter_details').val();

    var destination = {
        nom: nomDestination,
        image: 'img/'+image,
        alt: 'image'+altImage,
        offre: offre,
        prix: prix+'€',
        details: details,
    }

    destinations.push(destination);

    miseAJour(template);
}


function miseAJour(template){
    $('#tbody').children('.row').remove();
    $.each(destinations, function(index, elements){
        $('#tbody').append('<div class="row w-100" id="line-'+ ++count +'" data-destination="'+elements.nom+'"></div>');
            $('#line-'+count).append(template);
            $('#line-'+count+' .destination img').attr('src', elements.image);
            $('#line-'+count+' .destination img').attr('alt', elements.alt);
            $('#line-'+count+' .offre').text(elements.nom+', '+elements.offre);
            $('#line-'+count+' .prix').text(elements.prix);
            $('#line-'+count+' .modifier').attr('data-ligne', count);
            $('#line-'+count+' .supprimer').attr({'data-ligne': count, 'data-index': index});
            $('#line-'+count+' .description').attr('data-ligne', count);
    });
}

$('#table').on('click','.supprimer', function(e){
    e.preventDefault();
    deleteRow(e.target.dataset.ligne, e.target.dataset.index);
})

function deleteRow(idRow, idTable){
    destinations.splice(idTable, 1);
    $('#tbody #line-'+idRow).remove();
    miseAJour(template);
}

$("#chercher-destination").keyup(function(){
    var filter = $("#chercher-destination").val().toUpperCase();
    var arrayTr = $("#table #tbody").children('.row');

    var textValue;

    $.each(arrayTr, function(i, tr){
        textValue = tr.dataset.destination;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            $(tr).show();
        } else {
            $(tr).hide();
        }
    });
    
});

$('#btn-connexion').on('click', function(e){
    e.preventDefault();
    var connexion = {login: $('#login').val(), password: $('#password').val()};
    
    $.ajax({
        method: "POST",
        url: "http://localhost/sites/etu/BOOTSTRAP/TP4_projet/data/donnee.php",
        data: connexion,
        dataType: "html",
    })
    .done(function (xhr) {
        if(xhr == 'Success admin'){
            $('.modifier').attr('class', 'modifier btn btn-warning');
            $('.supprimer').attr('class', 'supprimer btn btn-danger');
        } else if(xhr == 'Success user'){
            $('.modifier').attr('class', 'modifier d-none');
            $('.supprimer').attr('class', 'supprimer d-none');
        } else {
            $('.modifier').attr('class', 'modifier d-none');
            $('.supprimer').attr('class', 'supprimer d-none');
        }
    })
    .fail(function () {
        alert("une erreur est survenue");
    });
});

$.ajax({
    method: "POST",
    url: "http://localhost/sites/etu/BOOTSTRAP/TP4_projet/data/donnee.php",
    dataType: "html",
})
.done(function (xhr) {
    if(xhr == 'Success admin'){
        alert('Vous etes connecté !');
        $('.modifier').attr('class', 'modifier btn btn-warning');
        $('.supprimer').attr('class', 'supprimer btn btn-danger');
    } else if(xhr == 'Success user'){
        $('.modifier').attr('class', 'modifier d-none');
        $('.supprimer').attr('class', 'supprimer d-none');
    } else {
        $('.modifier').attr('class', 'modifier d-none');
        $('.supprimer').attr('class', 'supprimer d-none');
    }
})
.fail(function () {
    alert("une erreur est survenue");
});