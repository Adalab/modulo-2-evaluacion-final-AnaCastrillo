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
function showURL(result) {
	if (!result.success) {
		for (const resultShow of result) {
			const showItem = document.createElement('li');
			const showImage = document.createElement('img');
			const showList = document.querySelector('.js-searchList');
			const showName = document.createTextNode(resultShow.show.name);
			if (resultShow.show.image === null) {
				showImage.src =
					'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
			} else {
				showImage.src = resultShow.show.image.medium;
			}
			showItem.appendChild(showImage);
			showItem.appendChild(showName);
			showList.appendChild(showItem);
		}
	} else {
		console.log('else');
		errorMessage.innerHTML = `Parece que ha habído un problema al buscar tu serie </p> <p class="error-text">${result.error}`;
	}
}
