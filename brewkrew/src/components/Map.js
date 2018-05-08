const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');
const GoogleMarkers = require('./util/GoogleMarkers');
const styledMap = require('../stylemap/stylemap');

const STYLE_NAME = 'Brew Style';
const CENTER_LAT_LONG = {lat: 32.8806222, lng: -117.1652732};

class Map extends React.Component {
	constructor(props) {
		super(props);
		GoogleMarkers.setGoogleMapsClass(this.props.google.maps);
		this.filterOutData = this.filterOutData.bind(this);
	}

	componentDidMount() {
		const { Map, StyledMapType } = this.props.google.maps;
		
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

		this.markers = new GoogleMarkers(this.props.data, this.map);
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