var destinations = {
    madagascar: {
        image: 'img/madagascar.jpg',
        alt: 'image madagascar',
        offre: 'Circuit aquatique, Lorem ipsum dolor sit amet',
        prix: '700€',
        details: 'Madagascar, Circuit aquatique, Lorem ipsum dolor sit amet, 700€',
    },
    caraibe: {
        image: 'img/maison.jpeg',
        alt: 'image maison',
        offre: 'Circuit exploration sous marine, Lorem ipsum dolor sit amet',
        prix: '900€',
        details: 'Caraïbe, Circuit exploration sous marine, Lorem ipsum dolor sit amet, 900€',
    },
    canada: {
        image: 'img/montagne.jpeg',
        alt: 'image montagnes',
        offre: 'Circuit montagne, Lorem ipsum dolor sit amet',
        prix: '999€',
        details: 'Canada, Circuit montagne, Lorem ipsum dolor sit amet, 999€',
    },
    espagne: {
        image: 'img/ocean.jpeg',
        alt: 'image ocean',
        offre: 'Circuit océan, Lorem ipsum dolor sit amet',
        prix: '1050€',
        details: 'Espagne, Circuit océan, Lorem ipsum dolor sit amet, 1050',
    },
}



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

// Ajouter une destination


function miseAJour(template){
    $.each(destinations, function(destination, elements){
        $('tbody').append('<tr id="line-'+ ++count +'"></tr>');
            $('#line-'+count).append(template);
            $('#line-'+count+' .destination img').attr('src', elements.image);
            $('#line-'+count+' .destination img').attr('alt', elements.alt);
            $('#line-'+count+' .offre').text(elements.offre);
            $('#line-'+count+' .prix').text(elements.prix);
            $('#line-'+count+' .modifier').attr('data-ligne', count);
            $('#line-'+count+' .supprimer').attr('data-ligne', count);
            $('#line-'+count+' .description').attr('data-ligne', count);
    });
}