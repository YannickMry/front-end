var countries = {
    'France': ['Bordeaux', 'Lyon', 'Toulouse', 'Grenoble'],
    'Espagne': ['Valencia', 'Madrid', 'Malaga', 'Cambril'],
}

// A déclencher au début
document.getElementById('partie2').setAttribute('style', 'display: none');
btnDisabled();


// BTN Choisir destination
document.getElementById('choisirDest').addEventListener('click', function(){
    if(document.getElementById('partie2').style.display == 'none'){
        document.getElementById('partie2').setAttribute('style', 'display: block');
    }else{
        document.getElementById('partie2').setAttribute('style', 'display: none');
    }
});

// Event Select ville
document.querySelector('#partie2 button').addEventListener('click', function(event){
    event.preventDefault();

    var userCity = document.querySelector('#partie2 input').value;

    console.log(getCountry(userCity));

    var cities = getCities(userCity);
    cities.forEach(city => {
        var newLi = document.createElement('li');
            newLi.innerHTML = city;
            document.getElementById('listeVille').appendChild(newLi);
    })

});

// Event qui disable le btn si la ville est pas bonne
document.querySelector('#partie2 input').addEventListener('keyup', function(){
    btnDisabled();
})


function addList(element){
    document.querySelector('#partie2 ul').appendChild(element);
}

function btnDisabled(){
    var userCity = document.querySelector('#partie2 input').value;
    if(checkCity(userCity) != undefined){
        document.querySelector('#partie2 button').disabled = false;
    }else {
        document.querySelector('#partie2 button').disabled = true;
    }
}

function checkCity(userCity){
    var citySelected = null;
    Object.entries(countries).forEach(country => {
        countries[country[0]].forEach(city => {
            if(city === userCity){
                citySelected = city;
            }
        });
    });
    return citySelected;
}

function getCities(userCity){
    var citiesSelected = [];
    Object.entries(countries).forEach(country => {
        countries[country[0]].forEach(city => {
            citiesSelected.push(city);
        });
    });
    return citiesSelected;
}

function getCountry(userCity){
    var countrySelected = null;
    Object.entries(countries).forEach(country => {
        countries[country[0]].forEach(city => {
            if(city === userCity){
                countrySelected = country;
            }
        });
    });
    return countrySelected[0];
}




// function searchInTab(event){
//     event.preventDefault();
//     var userVille = document.getElementById('villeP2').value;

//     var franceFound = france.find(city => city == userVille);
//     var espagneFound = espagne.find(city => city == userVille);

//     if(franceFound != undefined){
//         france.forEach(element => {
//             var newLi = document.createElement('li');
//             newLi.innerHTML = element;
//             document.getElementById('listeVille').appendChild(newLi);
//         });
//         var newH3 = document.createElement('h3');
//         newH3.innerHTML = 'Bienvenu en France';
//         document.getElementById('formP2').append(newH3);

//     }else if (espagneFound != undefined) {
//         alert('Bienvenu en Espagne !');
//     }
// }

// document.getElementById('villeP2').addEventListener('keyup', function(){
//     var userVille = document.getElementById('villeP2').value;

//     var cityFrance = france.find(city => city == userVille);
//     var cityEspagne = espagne.find(city => city == userVille);

//     if(cityFrance === undefined && cityEspagne === undefined){
//         document.getElementById('submitVilleP2').disabled = true;
//     } else {
//         document.getElementById('submitVilleP2').disabled = false;
//     }

// })

// document.getElementById('submitVilleP2').addEventListener("click", searchInTab);
