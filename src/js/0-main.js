/* eslint-disable indent */
'use strict';

const searchButton = document.querySelector('.js-search-button');
const searchText = document.querySelector('.js-search-text');
const showList = document.querySelector('.js-search-list');
const favList = document.querySelector('.js-fav-list');

const errorMessage = document.querySelector('.fetch-error');

//  --- ARRAYS ---

let shows = [];
let favs = [];

console.log(shows);
console.log(favs);

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
		}
	}
}

//  --- SELECT FAV ---
function findNewFav() {
	return fav.show.id === newFav.show.id;
}

function selectFav(event) {
	event.currentTarget.classList.add('fav');
	const index = event.currentTarget.dataset.index;
	const newFav = shows[index];

	let favRepeated = false;

	let i;
	console.log(favs);
	for (i = 0; i < favs.length; i++) {
		if (shows[index].show.id === favs[i].show.id) {
			console.log(favs[i]);
			favs.splice(i, 1);
			favRepeated = true;
		}
	}
	favs.push(newFav);

	if (favRepeated) {
		favs.pop();
	}
	for (const fav of favs) {
		console.log(fav.show.name);
	}
	console.log(favs);
	printFavs();
	storeData();
}

//  --- PRINT FAVS ---

function printFavs() {
	favList.innerHTML = '';
	if (favs !== null) {
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
	article.dataset.index = favs.length - 1;

	article.appendChild(favImage);
	li.appendChild(article);

	let favName = document.createElement('h3');
	favName.classList.add('fav-name', 'js-favorites-name');
	favName.appendChild(document.createTextNode(fav.show.name));
	article.appendChild(favName);
}

//  --- LOCAL STORAGE ---
function storeData() {
	localStorage.setItem('favs', JSON.stringify(favs));
}

function getStorage() {
	favs = JSON.parse(localStorage.getItem('favs'));
	printFavs();
}
getStorage();
