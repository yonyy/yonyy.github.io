const React = require('react');
const ReactDOM = require('react-dom');

const ESC = 'Escape';

class Menu extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { navOpen: false };
		this.toggleNav = this.toggleNav.bind(this);
		this.resetFocus = this.resetFocus.bind(this);
		this.captureEsc = this.captureEsc.bind(this);
	}

	componentDidUpdate() {
		if (this.state.navOpen)
			this.addListeners();
		else
			this.removeListeners();
	}

	addListeners() {
		document.body.addEventListener('click', this.toggleNav, false);
		document.body.addEventListener('keyup', this.captureEsc, false);
	}

	removeListeners() {
		document.body.removeEventListener('click', this.toggleNav);
		document.body.removeEventListener('keyup', this.captureEsc);
	}

	captureEsc(evt) {
		if (evt.key !== ESC)
			return;

		this.toggleNav(evt);
		this.resetFocus();
	}

	toggleNav(evt) {
		this.setState({navOpen: !this.state.navOpen});
		evt.stopPropagation();
	}

	resetFocus() {
		let node = ReactDOM.findDOMNode(this.navButtonRef);
		node.focus();
	}

	render() {
		let bkNavClass = 'bk-nav' + ((this.state.navOpen) ? '' : ' bk-nav-hidden');
		let controlOnClick = (this.state.navOpen) ? null : this.toggleNav;

		return (
			<div className='bk-nav-container'>
				<button ref={(node) => { this.navButtonRef = node; }} onClick={controlOnClick} className='bk-button bk-button-icon bk-nav-control'>
					<i className='bk-icon fas fa-bars bk-icon'></i>
				</button>
				<nav className={bkNavClass}>
					<ul className='bk-nav-list' >
						<li className='bk-nav-list-item'>
							<a className='bk-link' href='#'>The Conquered</a>
						</li>
						<li className='bk-nav-list-item'>
							<a className='bk-link' href='#'>The Conquerors</a>
						</li>
						<li className='bk-nav-list-item'>
							<a className='bk-link' href='https://github.com/yonyy/yonyy.github.io'>Curious? <i className='bk-icon fas fa-code'></i></a>
						</li>
					</ul>
				</nav>
			</div>
		);
	}
}

module.exports = Menu;