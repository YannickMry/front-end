// Structure controle et boucle

// function getRandomInt(max){
//     return Math.floor(Math.random() * Math.floor(max+1));
// }

// function isInf(nb){
//     if (nb > NB_A){
//         return true;
//     }else {
//         return false;
//     }
// }

// const NB_A = getRandomInt(10);
// var res = null;
// var count = 3;

// while(res != NB_A && count != 0){    
//     var res = window.prompt('Choisissez un chiffre entre 0 et 10 :');

//     if(isInf(res)){
//         console.log('Le nombre est inferieur à : ' + res);
//     }else{
//         console.log('Le nomre est superieur à : ' + res);
//     }

//     count -= 1;
//     if(count != 0){
//         console.log('plus que ' + count + ' essaie ! ');
//     } else if(res == NB_A){
//         console.log('Gagné !');
//     } else if(count == 0){
//         console.log('Perdu ! Le chiffre était : ' + NB_A);
//     }
// }

// Tableau et gestion d'évènement

var france = ['Bordeaux', 'Lyon', 'Toulouse', 'Grenoble'];
var espagne = ['Valencia', 'Madrid', 'Malaga', 'Cambril'];

function searchInTab(event){
    event.preventDefault();
    var userVille = document.getElementById('ville').value;

    var franceFound = france.find(city => city == userVille);
    var espagneFound = espagne.find(city => city == userVille);

    if(franceFound != undefined){
        alert('Bienvenu en France !');
    }else if (espagneFound != undefined) {
        alert('Bienvenu en Espagne !');
    }
}

document.getElementById('ville').addEventListener('keyup', function(){
    var userVille = document.getElementById('ville').value;

    var cityFrance = france.find(city => city == userVille);
    var cityEspagne = espagne.find(city => city == userVille);

    if(cityFrance === undefined && cityEspagne === undefined){
        document.getElementById('submitVille').disabled = true;
    } else {
        document.getElementById('submitVille').disabled = false;
    }

})

document.getElementById('submitVille').addEventListener("click", searchInTab);
