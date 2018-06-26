import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import GoogleMarkers from './util/GoogleMarkers';
import styledMap from '../stylemap/stylemap';

const STYLE_NAME = 'Brew Style';
const CENTER_LAT_LONG = {lat: 32.8806222, lng: -117.1652732};

class Map extends React.Component {
	constructor(props) {
		super(props);
		this.filterOutData = this.filterOutData.bind(this);
		this.doubleClick = this.doubleClick.bind(this);
		GoogleMarkers.setGoogleMapsClass(this.props.google.maps);
		GoogleMarkers.setDoubleClick(this.doubleClick);
		
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
		this.markers.filterOutByIndices(indices);
	}

	doubleClick(brewery) {
		this.props.doubleClick(brewery.label);
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
	data: PropTypes.array.isRequired,
	doubleClick: PropTypes.func.isRequired
};

export default Map;