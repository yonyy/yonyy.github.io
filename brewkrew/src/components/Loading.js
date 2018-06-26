import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.loading)
			return (
				<div className={`bk-loading bk-loading-${this.props.size}`}>
					<i className='fas fa-spinner fa-spin'></i>
				</div>
			);
		
		return (
			<React.Fragment>
				{this.props.children}
			</React.Fragment>
		);
	}
}

Loading.propTypes = {
	loading: PropTypes.bool,
	size: PropTypes.string,
	children: PropTypes.array.isRequired
};

Loading.defaultProps = {
	loading: false,
	size: 'md',
};

export default Loading;