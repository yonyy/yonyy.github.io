const FONT_FAMILY = 'Lato, sans-serif';
const FONT_WEIGHT = 'bold';

class GoogleMarkers {
	static setGoogleMapsClass(Maps) {
		GoogleMarkers.Maps = Maps;
	}

	constructor(breweries, map) {
		this.markers = this.setMarkers(breweries, map);
	}

	setMarkers(breweries, map) {
		const gM = this;
		return breweries.map((brewery, index) => {
			const marker = new GoogleMarkers.Maps.Marker({
				position: brewery.coordinates,
				animation: GoogleMarkers.Maps.Animation.DROP
			});

			marker.addListener('click', function() {
				if (marker.getLabel() !== '')
					return;

				gM.clearLabels();
				gM.setMarkerAnimation(marker);
				marker.setLabel({
					fontFamily: FONT_FAMILY,
					fontWeight: FONT_WEIGHT,
					fontSize: '16px',
					color: '#212121',
					text: brewery.label
				});

				marker.setZIndex(100);
			});

			marker.addListener('mouseover', function() {
				gM.setMarkerAnimation(marker);
				marker.setLabel({
					fontFamily: FONT_FAMILY,
					fontWeight: FONT_WEIGHT,
					fontSize: '18px',
					text: brewery.label
				});

				marker.setZIndex(100);
			});

			marker.addListener('mouseout', function() {
				gM.clearMarkerAnimation(marker);
				marker.setLabel('');
				marker.setZIndex(1);
			});

			marker.setZIndex(1);

			setTimeout(() => {
				marker.setMap(map);
			}, index * 100);

			return marker;
		});
	}

	clearLabels() {
		this.markers.map((marker) => {
			marker.setLabel('');
			marker.setZIndex(1);
		});
	}

	setMarkerAnimation(marker) {
		if (marker.getAnimation() !== null)
			return;
		
		marker.setAnimation(GoogleMarkers.Maps.Animation.BOUNCE);
	}

	clearMarkerAnimation(marker) {
		if (marker.getAnimation() === null)
			return;	
		marker.setAnimation(null);
	}
}

module.exports = GoogleMarkers;