const React = require('react');
const ReactDOM = require('react-dom');

class Menu extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { navOpen: false };
		this.toggleNav = this.toggleNav.bind(this);
		this.collapseNav = this.collapseNav.bind(this);
		this.resetFocus = this.resetFocus.bind(this);
	}

	componentDidUpdate() {
		document.body.addEventListener('mouseup', this.collapseNav);
	}

	toggleNav() {
		this.setState({navOpen: !this.state.navOpen});
	}

	collapseNav(evt) {
		this.setState({navOpen: false});
		this.resetFocus();
	}

	resetFocus() {
		let node = ReactDOM.findDOMNode(this.navButtonRef);
		node.focus();
	}

	render() {
		let bkNavClass = 'bk-nav' + ((this.state.navOpen) ? '' : ' bk-nav-hidden');
		let onMouseUp = (this.state.navOpen) ? this.collapseNav : null;

		return (
			<div className='bk-nav-container'>
				<button ref={(node) => { this.navButtonRef = node }} onClick={this.toggleNav} className='bk-button bk-button-icon bk-nav-control'>
					<i className="bk-icon fas fa-bars bk-icon"></i>
				</button>
				<nav className={bkNavClass}>
					<ul className='bk-nav-list' >
						<li onMouseUp={onMouseUp} className='bk-nav-list-item'>
							<a onClick={onMouseUp} href='#'>The Conquered</a>
						</li>
						<li onMouseUp={onMouseUp} className='bk-nav-list-item'>
							<a onClick={onMouseUp} href='#'>The Conquerors</a>
						</li>
					</ul>
				</nav>
			</div>
		)
	}
}

module.exports = Menu;