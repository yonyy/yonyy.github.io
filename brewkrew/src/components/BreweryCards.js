const React = require('react');
const PropTypes = require('prop-types');
const BreweryCard = require('./BreweryCard');
const Yelp = require('./Yelp');

class BreweryCards extends React.Component {
	constructor(props) {
		super(props);

		this.state = { activeCard: null };

		this.onClick = this.onClick.bind(this);
	}

	onClick({ yelp }) {
		this.setState({ activeCard: yelp });
	}

	render() {
		return (
			<div className='bk-cards-container'>
				<div className='bk-cards-row'>
					{
						this.props.breweries.map((brewery) => {
							return <BreweryCard onClick={this.onClick} brewery={brewery} key={brewery.id} />;
						})
					}
				</div>
				<Yelp card={this.state.activeCard}/>
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