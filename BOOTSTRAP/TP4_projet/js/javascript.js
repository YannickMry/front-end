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

var template = '<div class="card">' +
'<div class="destination card-header p-0">' +
    '<img src="" alt="" class="w-100">' +
'</div>' +
'<div class="card-body">' +
    '<p class="offre card-text"></p>' +
    '<p class="prix h4 text-primary text-center">300 €</p>' +
'</div>' +
'<div class="actions card-footer d-flex justify-content-around">' +
    '<button class="modifier d-none btn btn-warning mx-2"><i class="far fa-edit"></i></button>' +
    '<button class="supprimer d-none btn btn-danger"><i class="fas fa-trash"></i></button>' +
'</div>' +
'</div>';
var destinations = [];
var count = 0;
const PATH = "http://localhost/front-end/BOOTSTRAP/TP4_projet/data/donnee.php";

console.log('Made with ♥');

destinations.push(madagascar, caraibe, canada, espagne);
miseAJour(template);
check_auth(PATH, null);
clearInput();

// Event listener sur le boutton ajouter
$("#ajouter-modifier").on('click', '#btn-ajouter', function(e){
    e.preventDefault();
    addDestiation();
});

// function Ajouter une destination
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
    clearInput();
    alert('Nouvelle destination ajoutée !');
}


function miseAJour(template){
    $('#conteneur').children('.carte').remove();
    $.each(destinations, function(index, elements){
        $('#conteneur').append('<div class="carte col-sm-12 col-md-6 col-lg-4 mb-4" id="line-'+ ++count +'" data-destination="'+elements.nom+'"></div>');
            $('#line-'+count).append(template);
            $('#line-'+count+' .destination img').attr('src', elements.image);
            $('#line-'+count+' .destination img').attr('alt', elements.alt);
            $('#line-'+count+' .offre').text(elements.nom+', '+elements.offre);
            $('#line-'+count+' .prix').text(elements.prix);
            $('#line-'+count+' .modifier').attr({'data-ligne': count, 'data-index': index});
            $('#line-'+count+' .supprimer').attr({'data-ligne': count, 'data-index': index});
            $('#line-'+count+' .description').attr({'data-ligne': count, 'data-index': index});
    });
    check_auth(PATH, null);
}

//Event listener sur les bouttons modifier de chaque ligne
$('#conteneur').on('click', '.modifier', function(e){
    e.preventDefault();
    fillInput(e.target.parentNode.dataset.index);
})

// Function pour remplir les input 
function fillInput(idTable){
    $('#ajouter_destination').val(destinations[idTable].nom);
    $('#ajouter_image').val(destinations[idTable].image);
    $('#ajouter_alt').val(destinations[idTable].alt);
    $('#ajouter_offre').val(destinations[idTable].offre);
    $('#ajouter_prix').val(destinations[idTable].prix);
    $('#ajouter_details').val(destinations[idTable].details);

    if($('#ajouter-modifier #btn-ajouter').length != 0){
        $('#btn-ajouter').text('Modifier');
        $('#ajouter-modifier').off("click", "#btn-ajouter");
        $('#btn-ajouter').attr({'id': 'btn-modifier', 'data-index': idTable});
    } else {
        $('#btn-modifier').attr('data-index', idTable);
    }
}

// Ajouter un event listener sur le btn modifier afin de modifier un element du tableau
$('#ajouter-modifier').on('click', '#btn-modifier', function(e){
    e.preventDefault();
    updateRow(e.target.dataset.index); 
});

//function pour modifier la ligne d'un tableau
function updateRow(idTable){
    var nomDestination = $('#ajouter_destination').val();
    var image = $('#ajouter_image').val();
    var altImage = $('#ajouter_alt').val();
    var offre = $('#ajouter_offre').val();
    var prix = $('#ajouter_prix').val();
    var details = $('#ajouter_details').val();

    destinations[idTable].nom = nomDestination;
    destinations[idTable].image = image;
    destinations[idTable].alt = altImage;
    destinations[idTable].offre = offre;
    destinations[idTable].prix = prix;
    destinations[idTable].details = details;

    miseAJour(template);
    $('#btn-modifier').text('Ajouter');
    $('#ajouter-modifier').off("click", "#btn-modifier");
    $('#btn-modifier').attr('id', 'btn-ajouter');
    clearInput();
    alert('Destination modifiée avec succès !');
}

$('#conteneur').on('click','.supprimer', function(e){
    e.preventDefault();
    deleteRow(e.target.dataset.ligne, e.target.dataset.index);
})

function deleteRow(idRow, idTable){
    destinations.splice(idTable, 1);
    $('#conteneur #line-'+idRow).remove();
    miseAJour(template);
    alert('Destination supprimée avec succès !');
}

$("#chercher-destination").keyup(function(){
    var filter = $("#chercher-destination").val().toUpperCase();
    var arrayTr = $("#conteneur").children('.carte');

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
    check_auth(PATH, connexion);
});

// Clear input
function clearInput(){
    var input = $('#ajouter-modifier').children('form').children('.form-group').children('input');
    input.each(function(){
        this.value = '';
    })
}

function check_auth(url, form){
    $.ajax({
        method: "POST",
        url: url,
        data: form,
        dataType: "html",
    })
    .done(function (xhr) {
        if(xhr == 'Success admin'){
            $('.modifier').removeClass('d-none');
            $('.supprimer').removeClass('d-none');
            $('#connexionModal').modal('hide');
            alert('Vous etes connecté en tant qu\'admin !');
        } else if(xhr == 'Success user'){
            $('.modifier').addClass('d-none');
            $('.supprimer').addClass('d-none');
            $('#connexionModal').modal('hide');
            alert('Vous etes connecté en tant qu\'utilisateur !');
        } else {
            $('#connexionModal').modal('hide');
            $('.modifier').addClass('d-none');
            $('.supprimer').addClass('d-none');
        }
    })
    .fail(function () {
        alert("une erreur est survenue, veuillez vérifier le chemin d'accès au fichier donnee.php");
    });
}