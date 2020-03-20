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
      //   getResultsApi(saveShow);
      paintResultShow();
    });
}

// function getResultsApi(saveShow) {
//   //   console.log(saveShow);
// }

// pintar html de los datos buscados por el usuario

function paintResultShow() {
  let htmlCodeShow = '';

  for (const show of saveShow) {
    htmlCodeShow += `<li class="card__show__title">`;
    htmlCodeShow += `<h3> ${show.name}</h3>`;
    if (show.image === '') {
      htmlCodeShow += `<img src="https://via.placeholder.com/210x295/ffffff/666666/?
      text=TV">`;
    } else {
      htmlCodeShow += `<img src="${show.image}" alt="Image- of-${show.name}">`;
    }
    htmlCodeShow += `</li>`;
    console.log(show.name);
    console.log(show.image);
  }

  show.innerHTML = htmlCodeShow;
}

// evento click del botón buscar
btn.addEventListener('click', paintResultShow);
btn.addEventListener('click', getInfoApiShow);
