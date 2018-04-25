const React = require('react');
const ReactDOM = require('react-dom');

class AnchorButton extends React.PureComponent {
	constructor(props) {
		super(props);

		this.smoothScroll = this.smoothScroll.bind(this);
	}

	smoothScroll(evt) {
		evt.preventDefault();
		document.getElementById(this.props.target)
				.scrollIntoView({behavior: 'smooth'});
	}

	render() {
		const { target } = this.props;

		return (
			<div>
				<div className='bk-down-link'>
					<a className='bk-link bk-button-icon' href={'#' + target} onClick={this.smoothScroll}>
						<i className="fas fa-arrow-down bk-icon"></i>
					</a>
				</div>
				{ this.props.children }
			</div>
		);
	}
}

module.exports = AnchorButton;