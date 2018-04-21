const React = require('react');
const ReactDom = require('react-dom');
const styledMap = require('./stylemap/stylemap');

function initMap() {

	// Create a new StyledMapType object, passing it an array of styles,
	// and the name to be displayed on the map type control.
	var styledMapType = new google.maps.StyledMapType(styledMap,
		{name: 'Styled Map'});

	var myLatLng = {lat: 32.8806222, lng: -117.1652732};
	// Create a map object, and include the MapTypeId to add
	// to the map type control.
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: myLatLng,
	  zoom: 11,
	  mapTypeControlOptions: {
		mapTypeIds: ['styled_map']
	  }
	});

	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: 'Hello World!'
	});

	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('styled_map', styledMapType);
	map.setMapTypeId('styled_map');
}

setTimeout(initMap, 1000);