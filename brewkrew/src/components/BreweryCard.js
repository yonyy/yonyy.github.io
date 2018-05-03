const React = require('react');
const PropTypes = require('prop-types');

function precisionRound(number, precision) {
	const factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}

class BreweryCard extends React.PureComponent {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.onClick(this.props.brewery);
	}

	render() {
		const { brewery } = this.props;
		const rating = brewery.yelp.businesses.length ? brewery.yelp.businesses[0].rating : null;
		const reviewCount = brewery.yelp.businesses.length ? brewery.yelp.businesses[0].review_count : null;
		return (
			<div className='bk-card-container'>
				<button type='button' onClick={this.onClick} className='bk-card'>
					<div className='bk-card-info'>
						<p><strong>{brewery.label}</strong></p>
						<p>{brewery.address}</p>
						{brewery.distance && <p>{precisionRound(brewery.distance, 2)} miles</p>}
						<p>{rating ? <React.Fragment>{rating} <i className='fas fa-star bk-icon'></i> </React.Fragment>: 'No rating available'}</p>
						{reviewCount ? <p>{reviewCount} Reviews</p> : null}
					</div>
					<div className='bk-card-status'>
						{(brewery.visited) ? <i className="fas fa-check bk-icon"></i> : null}
					</div>
				</button>
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
	}),
	onClick: PropTypes.func.isRequired
};

module.exports = BreweryCard;