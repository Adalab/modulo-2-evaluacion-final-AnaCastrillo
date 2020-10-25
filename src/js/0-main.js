/* eslint-disable indent */
'use strict';

const searchButton = document.querySelector('.js-search-button');
const searchText = document.querySelector('.js-search-text');
const showList = document.querySelector('.js-search-list');
const favList = document.querySelector('.js-fav-list');
const errorMessage = document.querySelector('.fetch-error');

let showListItems;
let favIndex;

//  --- ARRAYS ---
let favs = [];
let shows = [];

//  --- API FETCH ---
function searchShows() {
	event.preventDefault();
	fetch(`http://api.tvmaze.com/search/shows?q=${searchText.value}`, {
		method: 'GET',
	})
		.then(function (resp) {
			return resp.json();
		})
		.then(function (result) {
			writeShows(result);
		})
		.catch(function (error) {
			errorMessage.innerHTML = `Parece que hay problemas para conectar con el servidor. ${error}`;
		});
}

searchButton.addEventListener('click', searchShows);

//  --- SAVE SHOWS IN ARRAY ---

function writeShows(result) {
	shows = [];
	for (const show of result) {
		shows.push(show);
	}
	printShows();
}

//  --- PRINT SHOWS ---

function printShows() {
	showList.innerHTML = '';
	if (shows.length === 0) {
		errorMessage.innerHTML =
			'No hemos podido encontrar la serie que estas buscando.';
	} else {
		errorMessage.innerHTML = '';
		let i;
		for (i = 0; i < shows.length; i++) {
			const show = shows[i];
			//  ---print image
			let showImage = document.createElement('img');
			if (show.show.image === null) {
				showImage.src =
					'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
			} else {
				showImage.src = show.show.image.medium;
			}

			//  ---print name
			let showName = document.createElement('h3');
			showName.classList.add('searchList--item-name', 'js-show-name');
			showName.appendChild(document.createTextNode(show.show.name));

			//  ---print item
			let article = document.createElement('article');
			article.classList.add('searchList--item', 'js-shows-item');
			article.dataset.index = i;
			article.id = show.show.id;

			let li = document.createElement('li');
			showList.appendChild(li);
			li.appendChild(article);
			article.appendChild(showImage);
			article.appendChild(showName);

			article.addEventListener('click', selectFav);
			showListItems = document.querySelectorAll('.js-shows-item');
		}
		selected();
	}
}

//  --- SELECT FAV ---

function selectFav(event) {
	event.currentTarget.classList.add('fav');
	const index = event.currentTarget.dataset.index;
	const newFav = shows[index];
	let favRepeated = false;
	if (favs !== null) {
		let i;

		for (i = 0; i < favs.length; i++) {
			if (shows[index].show.id === favs[i].show.id) {
				event.currentTarget.classList.remove('fav');
				favs.splice(i, 1);
				favRepeated = true;
			}
		}
	}
	favs.push(newFav);

	if (favRepeated) {
		favs.pop();
	}

	printFavs();
	storeData();
}

//  --- PRINT FAVS ---

function printFavs() {
	favList.innerHTML = '';
	if (favs !== null) {
		favIndex = 0;
		for (const fav of favs) {
			printFav(fav);
		}
	}
}

function printFav(fav) {
	let favImage = document.createElement('img');
	if (fav.show.image === null) {
		favImage.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
	} else {
		favImage.src = fav.show.image.medium;
	}

	let li = document.createElement('li');
	li.classList.add('side__favs--list', 'js-favs-item');
	favList.appendChild(li);
	li.id = fav.show.id;

	let article = document.createElement('article');
	article.classList.add('side__favs--list-item');
	article.dataset.index = favIndex;
	favIndex = favIndex + 1;

	article.appendChild(favImage);
	li.appendChild(article);

	let favName = document.createElement('h3');
	favName.classList.add('fav-name', 'js-favorites-name');
	favName.appendChild(document.createTextNode(fav.show.name));
	article.appendChild(favName);

	article.addEventListener('click', removeFav);
}

//  --- PAINT SELECTED ---

function selected() {
	let index;
	let i;
	for (index = 0; index < favs.length; index++) {
		for (i = 0; i < shows.length; i++) {
			if (favs[index].show.id === shows[i].show.id) {
				showListItems[i].classList.add('fav');
			}
		}
	}
}

//  --- REMOVE FAVS ---

function removeFav(event) {
	const indexFav = event.currentTarget.dataset.index;
	let indexShow;
	for (indexShow = 0; indexShow < shows.length; indexShow++) {
		if (favs[indexFav].show.id === shows[indexShow].show.id) {
			showListItems[indexShow].classList.remove('fav');
		}
	}
	favs.splice(indexFav, 1);
	printFavs();
}

//  --- LOCAL STORAGE ---
function storeData() {
	const jsonFavs = JSON.stringify(favs);
	localStorage.setItem('favs', jsonFavs);
}

function getStorage() {
	const storedFavs = localStorage.getItem('favs');
	const lastFavs = JSON.parse(storedFavs);
	if (lastFavs !== null) {
		favs = lastFavs;
	}
	printFavs();
}

getStorage();
