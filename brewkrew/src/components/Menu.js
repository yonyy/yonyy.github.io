const React = require('react');

class Menu extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { navOpen: false };
		this.toggleNav = this.toggleNav.bind(this);
	}

	toggleNav() {
		this.setState({navOpen: !this.state.navOpen});
	}

	render() {
		let bkNavClass = 'bk-nav' + ((this.state.navOpen) ? '' : ' bk-nav-hidden');
		return (
			<div className='bk-nav-container'>
				<button onClick={this.toggleNav} className='bk-button bk-button-icon bk-nav-control'>
					<i className="bk-icon fas fa-bars bk-icon"></i>
				</button>
				<nav className={bkNavClass}>
					<ul className='bk-nav-list'>
						<li className='bk-nav-list-item'>
							<a href='#'>The Conquered</a>
						</li>
						<li className='bk-nav-list-item'>
							<a href='#'>The Conquerors</a>
						</li>
					</ul>
				</nav>
			</div>
		)
	}
}

module.exports = Menu;