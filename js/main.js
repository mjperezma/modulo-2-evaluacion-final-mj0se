'use strict';
const btn = document.querySelector('.js-btn');
const inputText = document.querySelector('.js-input');
const inputTextValue = inputText.value;
let show = document.querySelector('.js-show');
const btnreset = document.querySelector('.button__reset');
let saveShow = [];
let favouriteShows = [];
let favoritesShowsSelected = [];

// solicitar datos a la api solo de lo que queremos imprimir, imagen, nombre e id :

function getInfoApiShow(ev) {
  ev.preventDefault();
  const inputTextValue = inputText.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputTextValue}`)
    .then(response => response.json())
    .then(data => {
      saveShow.splice(0);
      for (let index = 0; index < data.length; index++) {
        if (data[index].show.image === null) {
          saveShow.push({
            name: data[index].show.name,
            id: data[index].show.id,
            image: 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
          });
        } else {
          saveShow.push({
            name: data[index].show.name,
            image: data[index].show.image.medium,
            id: data[index].show.id
          });
        }
      }
      paintResultShow();
    });
}

// creo el código html de los datos buscados por el usuario

function getHtmlCodeResultShow(show) {
  let htmlCode = '';
  htmlCode += `<li class="card__show js-card-show" data-id="${show.id}">`;
  htmlCode += `<h3 class="card__show__title"> ${show.name}</h3>`;
  htmlCode += `<img class="card__show__img" src="${show.image}">`;
  htmlCode += `</li>`;
  return htmlCode;
}

// pinto el resultado del código html

function paintResultShow() {
  let htmlCodeShow = '';
  for (const show of saveShow) {
    htmlCodeShow += getHtmlCodeResultShow(show);
  }
  show.innerHTML = htmlCodeShow;
  lintenFavouriteShow();
}

// escuchar serie favorita

function lintenFavouriteShow() {
  let btnfavourite = document.querySelectorAll('.js-card-show');
  for (const btn of btnfavourite) {
    btn.addEventListener('click', addFavouriteShow);
  }
}

// añadir serie favorita

function addFavouriteShow(ev) {
  // obtener el id de la serie clickada
  let clickedIdShow = ev.currentTarget.dataset.id;
  let foundItemFavouriteShow;
  for (let item of favouriteShows) {
    if (item.id === parseInt(clickedIdShow)) {
      foundItemFavouriteShow = item;
    }
  }
  if (foundItemFavouriteShow === undefined) {
    // buscar el producto clickado
    let foundFavouriteShow;
    for (let show of saveShow) {
      if (show.id === parseInt(clickedIdShow)) {
        foundFavouriteShow = show;
      }
    }

    // añadirlo a favoritos
    favouriteShows.push({
      id: foundFavouriteShow.id,
      name: foundFavouriteShow.name,
      image: foundFavouriteShow.image
    });
  }
  setInLocalStorage();
  paintResultShow();
  paintCodeFavouriteShow();
}

// función para crear html las series favoritas

const ulFavourite = document.querySelector('.card__favourites');

function getHtmlCodeFavShow(favourite) {
  let htmlCodeFav = '';

  htmlCodeFav += `<li class="container__list" class="card__show" id="${favourite.id}">`;
  htmlCodeFav += `<h3 class="card__show__title"> ${favourite.name}</h3>`;
  htmlCodeFav += `<div class="card__show__div">`;
  htmlCodeFav += `<img class="card__show__img" src="${favourite.image}">`;
  htmlCodeFav += `<button class="button button--delete js-button js-id-remove"  data-id="${favourite.id}" ><i class="fa fa-times" aria-hidden="true"></i></button>`;
  htmlCodeFav += `</li>`;
  htmlCodeFav += `</div>`;

  return htmlCodeFav;
}

// funcion para pintar series fav
function paintCodeFavouriteShow() {
  let htmlFavShow = '';
  for (const favourite of favouriteShows) {
    htmlFavShow += getHtmlCodeFavShow(favourite);
  }
  ulFavourite.innerHTML = htmlFavShow;
  detectBtnRemove();
}
// eliminar de la lista de favoritos

function detectBtnRemove() {
  const btnremovefavorite = document.querySelectorAll('.js-id-remove');
  for (const btnremove of btnremovefavorite) {
    btnremove.addEventListener('click', removeFavourite);
  }
}
// eliminar un elemento de la lista
function removeFavourite(ev) {
  const clickedDeleted = parseInt(ev.currentTarget.dataset.id);
  for (let index = 0; index < favouriteShows.length; index++) {
    if (clickedDeleted === favouriteShows[index].id) {
      favouriteShows.splice(index, 1);
    }
  }
  setInLocalStorage();
  paintResultShow();
  paintCodeFavouriteShow();
}

// evento del boton borrar todos
const buttonAll = document.querySelector('.button--reset');
buttonAll.addEventListener('click', removeAllFavourites);

// eliminar todos los elementos de la lista de fav
function removeAllFavourites() {
  for (let index = 0; index < favouriteShows.length; index++) {
    favouriteShows.splice(favouriteShows[index], favouriteShows.length);
  }
  setInLocalStorage();
  paintResultShow();
  paintCodeFavouriteShow();
}

// funcion para guardar favoritas en localstorage
function getFromLocalStorage() {
  const localStorageShow = localStorage.getItem('favourite');
  if (localStorageShow !== null) {
    favouriteShows = JSON.parse(localStorageShow);
    paintResultShow();
    paintCodeFavouriteShow();
  }
}

function setInLocalStorage() {
  const strinfigyShow = JSON.stringify(favouriteShows);
  localStorage.setItem('favourite', strinfigyShow);
}
// evento click del botón buscar

btn.addEventListener('click', getInfoApiShow);

getFromLocalStorage();
