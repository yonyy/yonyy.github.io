const React = require('react');
const PropTypes = require('prop-types');

class BreweryCard extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		const { brewery } = this.props;
		return (
			<div className='bk-card-container'>
				<button className='bk-card'>
					<div className='bk-card-info'>
						<p><strong>{brewery.label}</strong></p>
						<p>{brewery.address}</p>
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
	})
};

module.exports = BreweryCard;