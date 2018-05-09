const React = require('react');
const PropTypes = require('prop-types');
const AnchorButton = require('./AnchorButton');
const ResetSearchButton = require('./ResetSearchButton');

class MapOverLayButtons extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<div className='bk-map-buttons'>
					<div className='bk-down-link'>
						<AnchorButton targetUp='map' targetDown='cards'/>
						<ResetSearchButton onClick={this.props.resetSearch}/>
					</div>
				</div>
				{ this.props.children }
			</React.Fragment>
		);
	}
}

MapOverLayButtons.propTypes = {
	resetSearch: PropTypes.func,
	children: PropTypes.array
};

module.exports = MapOverLayButtons;