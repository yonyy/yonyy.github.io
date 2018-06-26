import _ from 'lodash';
import distance from './distance';
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
	return _.chain(breweries)
		.sortBy((brewery) => {
			return (brewery.yelp.businesses.length) ? brewery.yelp.businesses[0].rating : -1;
		})
		.reverse()
		.reduce((acc, brewery) => {
			const rating = (brewery.yelp.businesses.length) ? brewery.yelp.businesses[0].rating : -1;
			const tail = acc[acc.length - 1];
			if (!tail.length)
				tail.push(brewery);
			else {
				const tailBrewery = tail[0];
				const groupRating = (tailBrewery.yelp.businesses.length) ? tailBrewery.yelp.businesses[0].rating : -1;
				if (groupRating === rating)
					tail.push(brewery);
				else
					acc.push([brewery]);
			}

			return acc;
		}, [[]])
		.map((group) => {
			return _.chain(group)
				.sortBy((brewery) => {
					return (brewery.yelp.businesses.length) ? brewery.yelp.businesses[0].review_count : -1;
				})
				.reverse()
				.value();
		})
		.reduce((acc, group) => {
			return acc.concat(group);
		}, [])
		.value();
}

export {
	sortByAZ,
	sortByZA,
	sortByDistance,
	sortByRating
};