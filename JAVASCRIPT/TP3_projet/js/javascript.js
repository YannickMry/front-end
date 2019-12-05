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



console.log(destinations);
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
    $('tbody').children('tr').remove();
    $.each(destinations, function(index, elements){
        $('tbody').append('<tr id="line-'+ ++count +'" data-destination="'+elements.nom+'"></tr>');
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

$('table').on('click','.supprimer', function(e){
    e.preventDefault();
    deleteRow(e.target.dataset.ligne, e.target.dataset.index);
})

function deleteRow(idRow, idTable){
    destinations.splice(idTable, 1);
    $('tbody #line-'+idRow).remove();
    miseAJour(template);
}

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