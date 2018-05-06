const React = require('react');
const PropTypes = require('prop-types');
const BreweryCard = require('./BreweryCard');

class BreweryCards extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='bk-cards-container'>
				<div className='bk-cards-row'>
					{
						this.props.breweries.map((brewery) => {
							return <BreweryCard brewery={brewery} key={brewery.id} />;
						})
					}
				</div>
			</div>
		);
	}
}

BreweryCards.propTypes = {
	breweries: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		address: PropTypes.string.isRequired,
		visited: PropTypes.bool.isRequired,
		yelp: PropTypes.object.isRequired
	}))
};

module.exports = BreweryCards;