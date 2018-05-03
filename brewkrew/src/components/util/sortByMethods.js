const _ = require('lodash');
const distance = require('./distance');
const MINUTES = 60000 * 10; // 10 minutes

function sortByAZ(breweries) {
	return _.sortBy(breweries, (brewery) => {
		return brewery.label;
	});
}

function sortByZA(breweries) {
	return sortByAZ(breweries).reverse();
}

function clearWindowPosition() {
	window.position = null;
}

function setWindowPosition(position) {
	window.position = position;
	setTimeout(clearWindowPosition, MINUTES);
}

function getCurrentPosition() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, {enableHighAccuracy: true});
	});
}

async function sortByDistance(breweries) {
	const position = (window.position) ? window.position : await getCurrentPosition();
	if (!window.position)
		setWindowPosition(position);

	const {latitude, longitude} = position.coords;
	const sorted = _.sortBy(breweries, (brewery) => {
		const d = distance(latitude, longitude, brewery.coordinates.lat, brewery.coordinates.lng);
		brewery.distance = d;
		return d;
	});

	return sorted;
}

function sortByRating(breweries) {
	return _.sortBy(breweries, (brewery) => {
		return (brewery.yelp.businesses.length) ? brewery.yelp.businesses[0].rating : -1;
	});
}

module.exports = {
	sortByAZ,
	sortByZA,
	sortByDistance,
	sortByRating
};