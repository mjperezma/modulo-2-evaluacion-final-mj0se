'use strict';
const btn = document.querySelector('.js-btn');
const inputText = document.querySelector('.js-input');
const inputTextValue = inputText.value;
let show = document.querySelector('.js-show');
const btnreset = document.querySelector('.button__reset');
let saveShow = [];
let favouriteShows = [];

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

    htmlCodeShow += `<li class="card__show js-card-show" id="${show.id}">`;
    htmlCodeShow += `<h3 class="card__show__title"> ${show.name}</h3>`;
    htmlCodeShow += `<img class="card__show__img" src="${show.image}">`;
    htmlCodeShow += `<button class="js-button js-id"  data-id="${show.id}" >Add to favourites</button>`
    htmlCodeShow += `</li>`;

  }
  show.innerHTML = htmlCodeShow;
  lintenFavouriteShow();
}


// escuchar serie favorita


function lintenFavouriteShow() {

  const btnfavourite = document.querySelectorAll('.js-id');
  for (const btn of btnfavourite) {
    btn.addEventListener('click', addFavouriteShow);

  }

}

// añadir serie favorita 

function addFavouriteShow(ev) {
  let clickedIdShow = ev.target.dataset.id;
  let foundFavouriteShow;
  for (let show of saveShow) {
    if (show.id === parseInt(clickedIdShow)) {
      foundFavouriteShow = show;
    }
  }

  function addColorToFavorites() {
    const liIds = document.querySelectorAll('.js-card-show');
    for (const liId of liIds) {
      if (liId.id === clickedIdShow) {

        liId.classList.add('card__show__fav');

      }
    }

  }

  addColorToFavorites();
  favouriteShows.push({
    id: foundFavouriteShow.id,
    name: foundFavouriteShow.name,
    image: foundFavouriteShow.image

  })
  setInLocalStorage();
  paintFavouritesShows();
}


// función para pintar en html las series favoritas

const ulFavourite = document.querySelector('.card__favourites');

function paintFavouritesShows() {

  let htmlCodeFavouriteShow = '';

  for (const favourite of favouriteShows) {

    htmlCodeFavouriteShow += `<li class="list" class="card__show" id="${favourite.id}">`;
    htmlCodeFavouriteShow += `<h3 class="card__show__title"> ${favourite.name}</h3>`;
    htmlCodeFavouriteShow += `<img class="card__show__img" src="${favourite.image}">`;
    htmlCodeFavouriteShow += `</li>`;
    htmlCodeFavouriteShow += `<button class="js-button js-id-remove"  data-id="${favourite.id}" >Delete favourites</button>`

  }
  ulFavourite.innerHTML = htmlCodeFavouriteShow;
  setInLocalStorage();
  lintenFavouriteShow();
  detectBtnRemove();
}

// eliminar de la lista de favoritos

function detectBtnRemove() {
  const btnremovefavorite = document.querySelectorAll('.js-id-remove');

  for (const btnremove of btnremovefavorite) {
    btnremove.addEventListener('click', removeFavorite);
  }
}


function removeFavorite(ev) {
  const clickedDeleted = ev.currentTarget;
  for (let index = 0; index < favouriteShows.length; index++) {
    if (clickedDeleted === parseInt(favouriteShows[index].id))

      console.log(favouriteShows[index].id);
    favouriteShows.splice(index, 1);
  }

  paintFavouritesShows();
  setInLocalStorage();

}


// funcion para guardar favoritas en localstorage
function getFromLocalStorage() {
  const localStorageShow = localStorage.getItem('favourite');
  if (localStorageShow !== null) {
    favouriteShows = JSON.parse(localStorageShow);
    paintFavouritesShows();

  }
}

function setInLocalStorage() {
  const strinfigyShow = JSON.stringify(favouriteShows);
  localStorage.setItem('favourite', strinfigyShow);

}
// evento click del botón buscar

btn.addEventListener('click', getInfoApiShow);

getFromLocalStorage();