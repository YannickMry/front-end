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

var destinations = [];
destinations.push(madagascar, caraibe, canada, espagne);


var template = '<td class="padding-30 destination">'+
    '<img src="" alt="" width="300px">'+
'</td>'+
'<td class="padding-30 offre">'+'</td>'+
'<td class="padding-30 prix">'+'</td>'+
'<td class="padding-30 actions">'+
    '<button class="description">Description</button>'+
    '<button class="modifier">Modifier</button>'+
    '<button class="supprimer">Supprimer</button>'+
    '<p>Description:<span class="details"></span></p>'+
'</td>';

var count = 0;

miseAJour(template);
clearInput();

// Event listener sur le boutton ajouter
$("#ajouter-modifier").on('click', '#btn-ajouter', function(e){
    e.preventDefault();
    addDestiation();
});

// function Ajouter une destination
function addDestiation(){
    var nomDestination = $('#destination').val();
    var image = $('#image').val();
    var altImage = $('#alt').val();
    var offre = $('#offre').val();
    var prix = $('#prix').val();
    var details = $('#details').val();

    var destination = {
        nom: nomDestination,
        image: image,
        alt: 'image '+altImage,
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
    $('tbody').children('tr').remove();
    $.each(destinations, function(index, elements){
        $('tbody').append('<tr id="line-'+ ++count +'" data-destination="'+elements.nom+'"></tr>');
            $('#line-'+count).append(template);
            $('#line-'+count+' .destination img').attr('src', elements.image);
            $('#line-'+count+' .destination img').attr('alt', elements.alt);
            $('#line-'+count+' .offre').text(elements.nom+', '+elements.offre);
            $('#line-'+count+' .prix').text(elements.prix);
            $('#line-'+count+' .modifier').attr('data-index', index);
            $('#line-'+count+' .supprimer').attr({'data-ligne': count, 'data-index': index});
            $('#line-'+count+' .description').attr('data-ligne', count);
    });
}

//Event listener sur les bouttons modifier de chaque ligne
$('table').on('click', '.modifier', function(e){
    e.preventDefault();
    fillInput(e.target.dataset.index);
})

// Function pour remplir les input 
function fillInput(idTable){
    $('#destination').val(destinations[idTable].nom);
    $('#image').val(destinations[idTable].image);
    $('#alt').val(destinations[idTable].alt);
    $('#offre').val(destinations[idTable].offre);
    $('#prix').val(destinations[idTable].prix);
    $('#details').val(destinations[idTable].details);

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
    var nomDestination = $('#destination').val();
    var image = $('#image').val();
    var altImage = $('#alt').val();
    var offre = $('#offre').val();
    var prix = $('#prix').val();
    var details = $('#details').val();

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
}

// Event listener sur les bouttons supprimer
$('table').on('click','.supprimer', function(e){
    e.preventDefault();
    deleteRow(e.target.dataset.index);
})

// Function pour supprimer un élément du tableau et du dom html
function deleteRow(idTable){
    destinations.splice(idTable, 1);
    miseAJour(template);
}

// listener sur l'input de la recherche de destination avec function de recherche
$("#chercher-destination").keyup(function(){
    var filter = $("#chercher-destination").val().toUpperCase();
    var arrayTr = $("table tbody").children('tr');

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

// Clear input
function clearInput(){
    var input = $('#ajouter-modifier').children('form').children('input');
    input.each(function(){
        this.value = '';
    })
}