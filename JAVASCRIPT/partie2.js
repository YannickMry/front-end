var countries = {
    'France': ['Bordeaux', 'Lyon', 'Toulouse', 'Grenoble'],
    'Espagne': ['Valencia', 'Madrid', 'Malaga', 'Cambril'],
}

// A déclencher au début
document.getElementById('partie2').setAttribute('style', 'display: none');
btnDisabled();


// Event Choisir destination
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

    // DEBUT NOUVELLE LISTE
    if(document.querySelector('#partie2 #content') != null){
        document.querySelector('#partie2 #content').remove();
    }

    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'content');

    var userCity = document.querySelector('#partie2 input').value;

    var countryObject = getCountryObj(userCity);
    var country = countryObject[0];
    var cities = countryObject[1];

    var html = '<h3>Bienvenu en '+ country +'</h3>'+
            '<p>Vous pouvez aussi visiter :</p>';
    newDiv.innerHTML = html;

    var newUl = document.createElement('ul');
    cities.forEach(city => {
        if(userCity != city){
            var newLi = document.createElement('li');
            newLi.innerHTML = city;
            newUl.appendChild(newLi);
        }
    })
    newDiv.appendChild(newUl);
    document.querySelector('#partie2 form').append(newDiv);

    // DEBUT ADD BTN AJOUT NOUVELLE DESTINATION    
    if(document.querySelector('#btn #choisirDest')){
        document.querySelector('#choisirDest').remove();
    }

    if(document.querySelector('#btn').children.length < 1){
        var ajoutDest = document.createElement('button');
        ajoutDest.setAttribute('id', 'ajoutDest');
        ajoutDest.textContent = 'Ajouter une destination';
        document.querySelector('#btn').appendChild(ajoutDest);
    }
});

// Event qui disable le btn si la ville est pas bonne
document.querySelector('#partie2 input').addEventListener('keyup', function(){
    btnDisabled();
})

// Event btn Ajouter destination
document.addEventListener("click", function(event){
    event.preventDefault();
    var element = event.target;
    if(element.id === 'ajoutDest'){
        addInList(document.querySelector('#partie2 ul'), document.querySelector('#partie2 input').value);
    }
})

function addInList(element, value){
    
    if(checkCity(value)==null){
        var res = prompt('Voulez vous ajouter cette ville à la liste ? y/n');
        if(res === 'y'){
            var newLi = document.createElement('li');
            newLi.textContent = value;
            element.appendChild(newLi);
            alert("l'ajout a bien été effectué !");
        } else {
            alert("l'ajout n'a pas été effectué !");
        }
    }else {
        alert("La ville existe déjà !");
    }
    
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

function getCountryObj(userCity){
    var countrySelected = null;
    Object.entries(countries).forEach(country => {
        countries[country[0]].forEach(city => {
            if(city === userCity){
                countrySelected = country;
            }
        });
    });
    return countrySelected;
}