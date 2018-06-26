import React from 'react';
import PropTypes from 'prop-types';

class HeaderContainer extends React.PureComponent {
	render() {
		return (
			<div className='bk-heading-container'>
				<div className='bk-heading'>
					{ this.props.children }
				</div>
			</div>	
		);
	}
}

HeaderContainer.propTypes = {
	children: PropTypes.array
};

export default HeaderContainer;