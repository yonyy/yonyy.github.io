const React = require('react');
const PropTypes = require('prop-types');
const BreweryCards = require('./BreweryCards');

const PageNumbers = ({ pageNumber, pagesTotal }) => {
	const maxShow = 5;
	const floor = Math.floor(pageNumber / maxShow);
	const ceil = (maxShow * floor + maxShow < pagesTotal) ? maxShow * floor + maxShow : pagesTotal;
	let range = [];
	for (let number = maxShow * floor + 1; number <= ceil; number++) {
		range.push(number);
	}

	return (
		<span>
			{
				range.map((number) => {
					if (number - 1 === pageNumber)
						return <span className='bk-control-page-active' key={number}>{number}</span>;
					return <span key={number}>{number}</span>;
				})
			}
		</span>
	);
};

PageNumbers.propTypes = {
	pageNumber: PropTypes.number.isRequired,
	pagesTotal: PropTypes.number.isRequired
};

class PaginationCards extends React.Component {
	constructor(props) {
		super(props);
		this.sliceCards = this.sliceCards.bind(this);
		this.backPage = this.backPage.bind(this);
		this.nextPage = this.nextPage.bind(this);

		this.slices = this.sliceCards();
	}

	sliceCards() {
		return this.props.breweries.reduce((acc, curr, index) => {
			if (index !== 0 && index % this.props.limit === 0)
				acc.push([]);
			acc[acc.length - 1].push(curr);
			return acc;
		}, [[]]);
	}

	backPage() {
		if (this.props.pageNumber - 1 >= 0)
			this.props.setPage(this.props.pageNumber - 1);
	}

	nextPage() {
		if (this.props.pageNumber + 1 < this.slices.length)
			this.props.setPage(this.props.pageNumber + 1);
	}

	render() {
		const getClassName = (baseClass, back) => {
			if ((back && this.props.pageNumber === 0) || (!back && this.props.pageNumber === this.slices.length - 1))
				return `${baseClass} bk-control-disabled`;
			return baseClass;
		};

		this.slices = this.sliceCards();
		const page = this.slices[this.props.pageNumber];
	
		return (
			<React.Fragment>
				<BreweryCards breweries={page} />
				<div className='bk-pagination-controls-container'>
					<div className='bk-pagination-controls'>
						<div className='bk-control-back'>
							<button className='bk-button bk-button-icon' onClick={this.backPage}>
								<i className={getClassName('fas fa-chevron-left bk-icon', true)}></i>
							</button>
						</div>
						<div className='bk-control-pages'>
							<PageNumbers pageNumber={this.props.pageNumber} pagesTotal={this.slices.length} />
						</div>
						<div className='bk-control-forward'>
							<button className='bk-button bk-button-icon' onClick={this.nextPage}>
								<i className={getClassName('fas fa-chevron-right bk-icon', false)}></i>
							</button>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

PaginationCards.propTypes = {
	breweries: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		address: PropTypes.string.isRequired,
		visited: PropTypes.bool.isRequired,
		yelp: PropTypes.object.isRequired
	})),
	limit: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
	pageNumber: PropTypes.number.isRequired
};

module.exports = PaginationCards;