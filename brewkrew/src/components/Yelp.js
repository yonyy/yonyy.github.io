const React = require('react');
const PropTypes = require('prop-types');

class Yelp extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (!this.props.card)
			return null;

		return (
			<div></div>
		);
	}
}

Yelp.propTypes = {
	card: PropTypes.object
};

module.exports = Yelp;