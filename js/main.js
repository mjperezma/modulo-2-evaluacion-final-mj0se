'use strict';
const btn = document.querySelector('.js-btn');
const inputText = document.querySelector('.js-input');
const inputTextValue = inputText.value;
let show = document.querySelector('.js-show');
let series = [];


// solicitar datos a la api solo de lo que queremos imprimir, imagen y nombre :

function getInfoShows() {

    fetch(`http://api.tvmaze.com/shows?=${inputTextValue}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            for (let index = 0; index < data.length; index++) {

                series.push({
                    image: data[index].image.medium,
                    name: data[index].name
                });
                // console.log(series[index].name);
                // console.log(series[index].image);
            }
            paintShows();
        });
}


// pintar la serie que buscamos


function paintShows() {

    let htmlCodeShow = `<ul class="show__section">`

    for (const show of series) {
        htmlCodeShow += `<li>`
        htmlCodeShow += `<h3>${show.name} </h3>`
        htmlCodeShow += `<img src="${show.image}" alt="image-of-show">`
        htmlCodeShow += `</li>`

        console.log(show.name);
        console.log(show.image);
    }

    htmlCodeShow = `</ul>`;
    show.innerHTML = htmlCodeShow;

}


// evento click del botón buscar
const clickButtonSearch = () => {
    console.log('Me han clickado');

}

getInfoShows();

btn.addEventListener('click', clickButtonSearch);