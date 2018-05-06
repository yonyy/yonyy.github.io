const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');

const styledMap = require('../stylemap/stylemap');

const FONT_FAMILY = 'Lato, sans-serif';
const FONT_WEIGHT = 'bold';
const STYLE_NAME = 'Brew Style';
const CENTER_LAT_LONG = {lat: 32.8806222, lng: -117.1652732};

class Map extends React.Component {
	constructor(props) {
		super(props);

		this.filterOutData = this.filterOutData.bind(this);
	}

	componentDidMount() {
		const { Map, Marker, StyledMapType } = this.props.google.maps;
		
		const styledMapType = new StyledMapType(styledMap, {
			name: STYLE_NAME
		});

		const node = ReactDOM.findDOMNode(this.mapRef);

		this.map = new Map(node, {
			center: CENTER_LAT_LONG,
			zoom: 11,
			mapTypeControlOptions: {
				mapTypeIds: ['styled_map']
			}
		});

		this.markers = this.props.data.map((brewery) => {
			let marker = new Marker({
				position: brewery.coordinates,
				map: this.map
			});

			marker.addListener('mouseover', function() {
				marker.setLabel({
					fontFamily: FONT_FAMILY,
					fontWeight: FONT_WEIGHT,
					fontSize: '18px',
					text: brewery.label
				});

				marker.setZIndex(100);
			});

			marker.addListener('mouseout', function() {
				marker.setLabel('');
				marker.setZIndex(1);
			});

			marker.setZIndex(1);
			return marker;
		});

		this.map.mapTypes.set('styled_map', styledMapType);
		this.map.setMapTypeId('styled_map');
	}

	componentDidUpdate() {
		this.filterOutData();
	}

	filterOutData() {
		const points = this.props.points;
		const indices = points.map(p => p.id);
		this.markers.map((m, index) => {
			if (indices.indexOf(index) === -1)
				m.setMap(null);
			else if (m.getMap() === null)
				m.setMap(this.map);
		});
	}

	render() {
		return (
			<div className='bk-map' id='map' ref={node => this.mapRef = node}></div>
		);
	}
}

Map.propTypes = {
	points: PropTypes.array.isRequired,
	google: PropTypes.object,
	data: PropTypes.array.isRequired
};

module.exports = Map;