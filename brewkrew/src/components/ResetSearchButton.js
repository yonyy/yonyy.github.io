import React from 'react';
import PropTypes from 'prop-types';

class ResetSearchButton extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { onClick } = this.props;
		const label = 'Reset search';

		return (
			<button aria-label={label} className='bk-button bk-button-icon' onClick={onClick}>
				<i aria-hidden='true' className='fas fa-undo bk-icon'></i>
			</button>
		);
	}
}

ResetSearchButton.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default ResetSearchButton;