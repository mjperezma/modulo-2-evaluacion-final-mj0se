'use strict';
const btn = document.querySelector('.js-btn');
const inputText = document.querySelector('.js-input');
const inputTextValue = inputText.value;
let show = document.querySelector('.js-show');
let saveShow = [];

// solicitar datos a la api solo de lo que queremos imprimir, imagen, nombre e id :

function getInfoApiShow(ev) {
  ev.preventDefault();
  const inputTextValue = inputText.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputTextValue}`)
    .then(response => response.json())
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        saveShow.splice();
        if (data[index].show.image === null) {
          saveShow.push({
            name: data[index].show.name,
            id: data[index].show.id,
            image: "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
          })
        } else {
          saveShow.push({
            name: data[index].show.name,
            image: data[index].show.image.medium,
            id: data[index].show.id
          })
        };

      }

      paintResultShow();
    });
}


// pintar html de los datos buscados por el usuario

function paintResultShow() {
  let htmlCodeShow = '';

  for (const show of saveShow) {
    htmlCodeShow += `<li id="${show.id}" class="card__show">`;
    htmlCodeShow += `<h3 class="card__show__title"> ${show.name}</h3>`;
    htmlCodeShow += `<img class="img__card" src="${show.image}">`;
    htmlCodeShow += `</li>`;
    console.log(show.name);
    console.log(show.image);
  }

  show.innerHTML = htmlCodeShow;
}

// evento click del botón buscar

btn.addEventListener('click', getInfoApiShow);