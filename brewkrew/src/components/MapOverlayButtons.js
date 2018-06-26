import React from 'react';
import PropTypes from 'prop-types';
import AnchorButton from './AnchorButton';
import ResetSearchButton from './ResetSearchButton';

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
	children: PropTypes.object
};

export default MapOverLayButtons;