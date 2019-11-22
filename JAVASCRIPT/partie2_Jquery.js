var countries = {
    'France': ['Bordeaux', 'Lyon', 'Toulouse', 'Grenoble'],
    'Espagne': ['Valencia', 'Madrid', 'Malaga', 'Cambril'],
};
var countryTmp = null;

// Init
$('#jquery article').hide();
disableBtnSubmit();

// Event permettant de faire apparaitre les éléments contenu dans la balise article
$('#jquery #choisirDestJquery').click(function(){
    $("article").toggle("slow");
});

// Event permettant d'afficher les villes et le pays quand l'user a mis une ville correcte dans l'input
$('#jquery #submitVille').click(function(){
    miseAJour();
    // Modifier le btn choisir destination en ajouter destination
    $('#jquery #choisirDestJquery').remove();

    if($('#jquery #addBtnJquery button').length < 1){
        $('#jquery #addBtnJquery').append('<button id="ajoutDestJquery">Ajouter une destination</button>')
    }

});

// Event dès qu'une touche est appuyé dans l'élement input, joue la fonction disableBtnSubmit
$("#jquery input").keyup(disableBtnSubmit);

// Event pour ajouter une ville dans un tableau
$(document).click(function(event){
    if(event.target.id === 'ajoutDestJquery'){
        var userCity = $('#jquery input').val();
        var selected = checkCity(userCity);

        if(selected == null){
            var res = prompt('Voulez vous vraiment ajouter cette ville ? y/n');
            if(res === 'y'){
                countries[countryTmp].push(userCity);
                miseAJour();
            }
        }else {
            alert('La ville existe déjà en ' + selected.country);
        }
    }
});

// Mise à jour de l'affichage
function miseAJour(){
    var userCity = $('#jquery input').val();
    var selected = checkCity(userCity);
    if(selected.country != null){
        countryTmp = selected.country;
    }

    // Créer la liste des villes
    var ul = addList();

    // Initialisation de la div showList
    $('#jquery #showList').html('');
    // Afficher le pays et les villes associées sans celle rentré par l'utilisateur
    $('#jquery #showList').append('<h1>Bienvenu en ' + countryTmp + '</h1>' + ul);
}

//
function addList(){
    var li = "";
    $.each(countries[countryTmp], function(key, city){
        li = li + "<li>" + city + "</li>";
    });

    var html = "<ul>" + li + "</ul>";

    return html;
}


// Désactive le btn de submit si la ville entré dans l'input n'appartient pas à une ville dans l'objet countries
// Return : void
function disableBtnSubmit(){
    var userCity = $('#jquery input').val();
    var selected = checkCity(userCity);

    if(selected === null){
        $('#jquery #submitVille').prop('disabled', true);
    } else {
        $('#jquery #submitVille').prop('disabled', false);
    }
}

// Si la ville n'est pas dans l'objet return null
// Si elle est dans l'objet return un objet avec la ville et le pays de la ville
function checkCity(userVal){
    var selectedByUser = null;

    $.each(countries, function(country, cities){
        $.each(cities, function(key, city){
            if(city === userVal){
                selectedByUser = {
                    country: country,
                    city: city
                };
            }
        });
    });

    return selectedByUser;
}