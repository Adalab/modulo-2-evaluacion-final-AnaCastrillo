/* eslint-disable indent */
'use strict';

const searchButton = document.querySelector('.js-search-button');
const searchText = document.querySelector('.js-search-text');
const showList = document.querySelector('.js-search-list');
const favList = document.querySelector('.js-fav-list');

// const errorMessage = document.querySelector('.fetch-error');

//  --- ARRAYS ---

let shows = [];
let favs = [];

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
			showList.innerHTML =
				'Parece que hay problemas para conectar con el servidor.';
			console.log(error);
		});
}

searchButton.addEventListener('click', searchShows);

//  --- SAVE SHOWS IN ARRAY ---

function writeShows(result) {
	shows = [];
	for (let i = 0; i < result.length; i++) {
		const show = result[i];
		shows.push(show);
	}
	printShows();
}
