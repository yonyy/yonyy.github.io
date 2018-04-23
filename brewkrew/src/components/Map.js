const React = require('react');
const ReactDOM = require('react-dom');

const data = require('../db');
const styledMap = require('../stylemap/stylemap');

const FONT_FAMILY = 'Lato, sans-serif';
const FONT_WEIGHT = 'bold';
const STYLE_NAME = 'Brew Style';
const CENTER_LAT_LONG = {lat: 32.8806222, lng: -117.1652732};

class Map extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { searchTerm: (this.props.searchTerm || '') };
		this.data = data;

		this.filterMarkers = this.filterMarkers.bind(this);
		this.executeCommand = this.executeCommand.bind(this);
		this.filterVisited = this.filterVisited.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.searchTerm !== prevState.searchTerm)
			return Object.assign({}, prevState, { searchTerm: nextProps.searchTerm });
		return null;
	}

	componentDidUpdate() {
		if (this.state.searchTerm.startsWith(':'))
			this.executeCommand(this.state.searchTerm);
		else
			this.filterMarkers(this.state.searchTerm);
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

		this.markers = this.data.map((brewery, index) => {
			let marker = new Marker({
				position: brewery.coordinates,
				map: this.map
			});

			marker.addListener('mouseover', function() {
				marker.setLabel({
					fontFamily: FONT_FAMILY,
					fontWeight: FONT_WEIGHT,
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
		}) 

		this.map.mapTypes.set('styled_map', styledMapType);
		this.map.setMapTypeId('styled_map');
	}

	filterMarkers(label) {
		this.data.map((brewery, index) => {
			const marker = this.markers[index];
			if (brewery.label.toLowerCase().indexOf(label.toLowerCase()) === -1)
				marker.setMap(null);
			else if (marker.getMap() === null)
				marker.setMap(this.map);
		});
	}

	filterVisited(visited) {
		this.data.map((brewery, index) => {
			const marker = this.markers[index];
			if (brewery.visited !== visited)
				marker.setMap(null);
			else if (marker.getMap() === null)
				marker.setMap(this.map);
		});
	}

	executeCommand(rawCommand) {
		const command = rawCommand.substring(1);
		switch (command) {
			case 'visited':
				return this.filterVisited(true);
			case 'notvisited':
				return this.filterVisited(false);
		}
	}

	render() {
		return (
			<div className='bk-map' id='map' ref={node => this.mapRef = node}></div>
		);
	}
}

module.exports = Map;