import React from 'react';
import PropTypes from 'prop-types';
import BreweryCard from './BreweryCard';

class BreweryCards extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='bk-cards-container dddsdsdsd'>
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

export default BreweryCards;