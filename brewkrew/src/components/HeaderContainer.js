const React = require('react');
const PropTypes = require('prop-types');

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

module.exports = HeaderContainer;