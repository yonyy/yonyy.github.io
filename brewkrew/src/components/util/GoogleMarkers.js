const FONT_FAMILY = 'Lato, sans-serif';
const FONT_WEIGHT = 'bold';

class GoogleMarkers {
	static setGoogleMapsClass(Maps) {
		GoogleMarkers.Maps = Maps;
	}

	static setDoubleClick(func) {
		GoogleMarkers.doubleClick = func;
	}

	constructor(breweries, map) {
		this.markers = this.setMarkers(breweries, map);
		this.activeMarker = null;
		this.map = map;
	}

	setMarkers(breweries, map) {
		const gM = this;
		return breweries.map((brewery, index) => {
			const marker = new GoogleMarkers.Maps.Marker({
				position: brewery.coordinates,
				animation: GoogleMarkers.Maps.Animation.DROP
			});

			marker.addListener('click', function() {
				if (gM.activeMarker === marker) {
					GoogleMarkers.doubleClick && GoogleMarkers.doubleClick(brewery);
					return;
				}

				gM.clearMarker(gM.activeMarker);
				gM.showMarker(marker, brewery.label);
				gM.activeMarker = marker;
			});

			marker.addListener('mouseover', function() {
				gM.showMarker(marker, brewery.label);
				gM.activeMarker = marker;
			});

			marker.addListener('mouseout', function() {
				gM.clearMarker(marker);
			});

			marker.setZIndex(1);

			setTimeout(() => {
				marker.setMap(map);
			}, index * 50);

			return marker;
		});
	}

	showMarker(marker, label) {
		if (!marker)
			return;

		marker.setAnimation(GoogleMarkers.Maps.Animation.BOUNCE);
		marker.setLabel({
			fontFamily: FONT_FAMILY,
			fontWeight: FONT_WEIGHT,
			fontSize: '18px',
			text: label
		});
		marker.setZIndex(100);
	}

	clearMarker(marker) {
		if (!marker)
			return;

		marker.setAnimation(null);
		marker.setLabel('');
		marker.setZIndex(1);
	}

	filterOutByIndices(indices) {
		this.markers.map((m, index) => {
			if (indices.indexOf(index) === -1)
				m.setMap(null);
			else if (m.getMap() === null)
				m.setMap(this.map);
		});
	}
}

export default GoogleMarkers;