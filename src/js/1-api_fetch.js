/* eslint-disable indent */
'use strict';

const submitButton = document.querySelector('.search-submit');

const form = document.querySelector('.js-form');
function handleForm(ev) {
	ev.preventDefault();
}

form.addEventListener('submit', handleForm);

// -------------------------------------------------------------------------------

const textInput = document.querySelector('.search-text');

function search() {
	console.log(textInput.value);
	fetch(`http://api.tvmaze.com/search/shows?q=${textInput.value}`, {
		method: 'GET',
		// mode: 'cors',
		// headers: {
		// 	'content-type': 'application/json',
		// },
	})
		.then(function (resp) {
			return resp.json();
		})
		.then(function (result) {
			showURL(result);
		})
		.catch(function (error) {
			console.log(error);
		});
}

submitButton.addEventListener('click', search);

function showURL(result) {
	for (const resultShow of result) {
		console.log(resultShow.show.name);
	}
}
