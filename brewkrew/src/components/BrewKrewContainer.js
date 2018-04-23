const React = require('react');
const ReactDOM = require('react-dom');
const ErrorBoundary = require('./ErrorBoundary')
const HeaderContainer = require('./HeaderContainer');
const Menu = require('./Menu');
const Search = require('./Search');

const styledMap = require('../stylemap/stylemap');
const data = require('../db');

class BrewKrewContainer extends React.Component {
	constructor(props) {
		super(props);

		this.data = data;
	}

	componentDidMount() {
		// Create a new StyledMapType object, passing it an array of styles,
		// and the name to be displayed on the map type control.
		const { Map, Marker, StyledMapType } = this.props.google.maps;
		
		const styledMapType = new StyledMapType(styledMap, {
				name: 'Silver'
		});

		const myLatLng = {lat: 32.8806222, lng: -117.1652732};
		const node = ReactDOM.findDOMNode(this.mapRef);

		// Create a map object, and include the MapTypeId to add
		// to the map type control.
		this.map = new Map(node, {
			center: myLatLng,
			zoom: 11,
			mapTypeControlOptions: {
			mapTypeIds: ['styled_map']
			}
		});

		this.markers = data.map((brewery, index) => {
			let marker = new Marker({
				position: brewery.coordinates,
				map: this.map
			});

			marker.addListener('mouseover', function() {
				marker.setLabel({
					fontFamily: 'Lato, sans-serif',
					fontWeight: 'bold',
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

		//Associate the styled map with the MapTypeId and set it to display.
		this.map.mapTypes.set('styled_map', styledMapType);
		this.map.setMapTypeId('styled_map');
	}

	render() {
		return (
			<ErrorBoundary>
				<div className='bk-container'>
					<HeaderContainer>
						<div className='bk-heading-item'>
							<Menu/>
						</div>
						<div className='bk-heading-item'>
							<header className='bk-header'><h1>Brew Krew</h1></header>
						</div>
						<div className='bk-heading-item'>
							<Search/>
						</div>
					</HeaderContainer>
					<div className='bk-section'>
						<div className='bk-map' id='map' ref={node => this.mapRef = node}></div>
					</div>
					<div className='bk-section'></div>
				</div>
			</ErrorBoundary>
		);
	}
}

module.exports = BrewKrewContainer;