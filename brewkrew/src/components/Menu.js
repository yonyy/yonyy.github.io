import React from 'react';
import ReactDOM from 'react-dom';
import smoothScroll from './util/smoothScroll';
import { throttle } from 'lodash';

const ESC = 'Escape';

class Menu extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { navOpen: false };
		this.toggleNav = this.toggleNav.bind(this);
		this.resetFocus = this.resetFocus.bind(this);
		this.captureEsc = this.captureEsc.bind(this);
		this.smoothScroll = this.smoothScroll.bind(this);
		this.throttleOnClick = throttle(this.toggleNav, 100, { 'trailing' : false });
	}

	componentDidUpdate() {
		if (this.state.navOpen)
			this.addListeners();
		else
			this.removeListeners();
	}

	addListeners() {
		document.body.addEventListener('click',  this.throttleOnClick, false);
		document.body.addEventListener('keyup', this.captureEsc, false);
	}

	removeListeners() {
		document.body.removeEventListener('click', this.throttleOnClick);
		document.body.removeEventListener('keyup', this.captureEsc);
	}

	captureEsc(evt) {
		if (evt.key !== ESC)
			return;

		this.toggleNav(evt);
		this.resetFocus();
	}

	toggleNav() {
		this.setState({navOpen: !this.state.navOpen});
	}

	resetFocus() {
		let node = ReactDOM.findDOMNode(this.navButtonRef);
		node.focus();
	}

	smoothScroll(evt) {
		evt.preventDefault();
		const target = evt.target.getAttribute('href').split('#')[1];
		smoothScroll(target);
	}

	render() {
		let bkNavClass = 'bk-nav' + ((this.state.navOpen) ? '' : ' bk-nav-hidden');
		return (
			<div className='bk-nav-container'>
				<button type='button' aria-label='Menu' aria-haspopup='true' aria-controls='menuItems' aria-expanded={this.state.navOpen}
					type='button' ref={(node) => { this.navButtonRef = node; }} onClick={this.throttleOnClick} className='bk-button bk-button-icon bk-nav-control'>
					<i aria-hidden='true' className='bk-icon fas fa-bars bk-icon'></i>
				</button>
				<nav className={bkNavClass} id='menuItems'>
					<ul className='bk-nav-list' role='menubar' >
						<li className='bk-nav-list-item' role='menuitem'>
							<a className='bk-link' href='#cards' onClick={this.smoothScroll}>The Conquered</a>
						</li>
						<li className='bk-nav-list-item' role='menuitem'>
							<a className='bk-link' href='#conquerors' onClick={this.smoothScroll}>The Krew</a>
						</li>
						<li className='bk-nav-list-item' role='menuitem'>
							<a className='bk-link' href='https://github.com/yonyy/yonyy.github.io'>Curious? <i aria-hidden='true' className='bk-icon fas fa-code'></i></a>
						</li>
					</ul>
				</nav>
			</div>
		);
	}
}

export default Menu;