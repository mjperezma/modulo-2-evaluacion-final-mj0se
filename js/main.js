'use strict';
const btn = document.querySelector('.js-btn');
const inputText = document.querySelector('.js-input');
const inputTextValue = inputText.value;
let show = document.querySelector('.js-show');
let saveShow = [];

// solicitar datos a la api solo de lo que queremos imprimir, imagen y nombre :

function getInfoApiShow(ev) {
  ev.preventDefault();
  const inputTextValue = inputText.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputTextValue}`)
    .then(response => response.json())
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        saveShow.push({
          name: data[index].show.name,
          image: data[index].show.image.medium
        });
      }
      getResultsApi(saveShow);
    });
}

function getResultsApi(DataShow) {
  console.log(DataShow);
}

// pintar html de los datos buscados por el usuario

// evento click del botón buscar

btn.addEventListener('click', getInfoApiShow);
