const React = require('react');
const PropTypes = require('prop-types');

class AnchorButton extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { reverse: false };

		this.smoothScroll = this.smoothScroll.bind(this);
	}

	smoothScroll(evt) {
		evt.preventDefault();
		document.getElementById(this.target)
			.scrollIntoView({behavior: 'smooth'});

		this.setState({reverse: !this.state.reverse});
	}

	render() {
		const { targetDown, targetUp } = this.props;

		this.target = (this.state.reverse) ? targetUp : targetDown;
		const reverseClass = (this.state.reverse) ? ' bk-reverse' : '';

		return (
			<div>
				<div className='bk-down-link'>
					<a className='bk-link bk-button-icon' href={'#' + this.target} onClick={this.smoothScroll}>
						<i className={'fas fa-arrow-down bk-icon bk-transform-reverse' + reverseClass}></i>
					</a>
				</div>
				{ this.props.children }
			</div>
		);
	}
}

AnchorButton.propTypes = {
	targetDown: PropTypes.string.isRequired,
	targetUp: PropTypes.string.isRequired,
	children: PropTypes.object
};

module.exports = AnchorButton;