/* eslint-disable indent */
'use strict';

const submitButton = document.querySelector('.search-submit');
const textInput = document.querySelector('.search-text');
const form = document.querySelector('.js-form');
const errorMessage = document.querySelector('.fetch-error');

// -------------------------PREVENT DEFAULT--------------------------------------
function handleForm(ev) {
	ev.preventDefault();
}

form.addEventListener('submit', handleForm);

// -------------------------FETCH API--------------------------------------------
function search() {
	fetch(`http://api.tvmaze.com/search/shows?q=${textInput.value}`, {
		method: 'GET',
	})
		.then(function (resp) {
			return resp.json();
		})
		.then(function (result) {
			showURL(result);
		})
		.catch(function (error) {
			errorMessage.innerHTML = `Parece que ha habído un problema al buscar tu serie </p> <p class="error-text">${error}`;
		});
}

submitButton.addEventListener('click', search);

// -------------------------SEARCH RESULTS------------------------------------------
const showList = document.querySelector('.js-searchList');
function showURL(result) {
	showList.innerHTML = '';
	if (!result.success) {
		for (const resultShow of result) {
			const showItem = document.createElement('li');
			showItem.classList.add('show-item');
			showItem.addEventListener('click', selectFav);
			const showImage = document.createElement('img');
			const showNameContainer = document.createElement('h3');
			const showName = document.createTextNode(resultShow.show.name);
			if (resultShow.show.image === null) {
				showImage.src =
					'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
			} else {
				showImage.src = resultShow.show.image.medium;
			}
			showItem.appendChild(showImage);
			showNameContainer.appendChild(showName);
			showItem.appendChild(showNameContainer);
			showList.appendChild(showItem);
		}
	} else {
		errorMessage.innerHTML = `Parece que ha habído un problema al buscar tu serie </p> <p class="error-text">${result.error}`;
	}
}

// -------------------------SELECT FAV------------------------------------------
const favItems = [];
const favList = document.querySelector('.js-favs');

function selectFav(event) {
	favItems.push(event.currentTarget.innerHTML);
	console.log(favItems.length);
	paintFav();
}

function paintFav() {
	const favListItem = document.createElement('li');
	favListItem.addEventListener('click', removeFav);
	favListItem.innerHTML += favItems[favItems.length - 1];
	favListItem.classList.add(favItems.length - 1);
	favList.appendChild(favListItem);
}

// -------------------------REMOVE FAV------------------------------------------
function removeFav(event) {
	console.log(event.currentTarget.classList[0]);
	const favItemPosition = parseInt(event.currentTarget.classList[0]);
	console.log(favItemPosition);
	console.log(favItems);
	favList.removeChild(event.currentTarget);
	favItems.splice(favItemPosition, 1);
}
