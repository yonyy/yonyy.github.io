import React from 'react';
import PropTypes from 'prop-types';

function precisionRound(number, precision) {
	const factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}

class BreweryCard extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { brewery } = this.props;
		const hasYelp = brewery.yelp.businesses.length !== 0;
		const rating = hasYelp ? brewery.yelp.businesses[0].rating : null;
		const reviewCount = hasYelp ? brewery.yelp.businesses[0].review_count : null;
		const href = hasYelp ? brewery.yelp.businesses[0].url : 'javascript:void(0)';

		return (
			<div className='bk-card-container'>
				<a target='_blank' href={href} className='bk-card'>
					<div className='bk-card-info'>
						<p><strong>{brewery.label}</strong></p>
						<p>{brewery.address}</p>
						{brewery.distance && <p>{precisionRound(brewery.distance, 2)} miles</p>}
						<p>{rating && reviewCount? <React.Fragment>{rating} <i className='fas fa-star bk-icon'></i> {reviewCount} Reviews</React.Fragment>: 'No rating available'}</p>
					</div>
					<div className='bk-card-status'>
						{(brewery.visited) ? <i className="fas fa-check bk-icon"></i> : null}
					</div>
				</a>
			</div>
		);
	}
}

BreweryCard.propTypes = {
	brewery: PropTypes.shape({
		label: PropTypes.string.isRequired,
		address: PropTypes.string.isRequired,
		visited: PropTypes.bool.isRequired,
		yelp: PropTypes.object.isRequired
	})
};

export default BreweryCard;