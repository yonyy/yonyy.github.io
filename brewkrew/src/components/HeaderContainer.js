const React = require('react');

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

module.exports = HeaderContainer;