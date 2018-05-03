const React = require('react');
const PropTypes = require('prop-types');
const BreweryCards = require('./BreweryCards');
const SortBy = require('./SortBy');
const Pagination = require('./Pagination');
const Loading = require('./Loading');
const { sortByAZ, sortByZA, sortByDistance, sortByRating } = require('./util/sortByMethods');

class PaginationCards extends React.Component {
	constructor(props) {
		super(props);
		this.sliceCards = this.sliceCards.bind(this);
		this.backPage = this.backPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.setSortMethod = this.setSortMethod.bind(this);

		this.slices = this.sliceCards(this.props.breweries);
		this.sortByMethods = {
			'aZ' : PaginationCards.sortByAZ,
			'zA' : PaginationCards.sortByZA,
			'distance' : PaginationCards.sortByDistance,
			'rating' : PaginationCards.sortByRating
		};

		const id = PaginationCards.generateID(this.props.breweries);
		this.state = {
			pageNumber: 0,
			id,
			sortByMethod: sortByDistance,
			loading: true
		};

		this.computeAsyncDistance();
	}

	static generateID(arr) {
		return arr.reduce((acc, el) => {
			return acc + el.label;
		}, '');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		var nextID = PaginationCards.generateID(nextProps.breweries);
		if (nextID !== prevState.id) {
			return {
				pageNumber: 0,
				id: PaginationCards.generateID(nextProps.breweries),
				loading: prevState.sortByMethod === sortByDistance
			};
		}

		return null;
	}

	componentDidUpdate() {
		if (this.state.loading) {
			this.slices = [[]];
			this.computeAsyncDistance();
		}
	}

	static mapFuncToString(func) {
		switch(func) {
		case sortByAZ:
			return 'aZ';
		case sortByZA:
			return 'zA';
		case sortByDistance:
			return 'distance';
		case sortByRating:
			return 'rating';
		}
	}

	static mapStringToFunc(key) {
		switch(key) {
		case 'aZ':
			return sortByAZ;
		case 'zA':
			return sortByZA;
		case 'distance':
			return sortByDistance;
		case 'rating':
			return sortByRating;
		}
	}

	sliceCards(arr) {
		return arr.reduce((acc, curr, index) => {
			if (index !== 0 && index % this.props.limit === 0)
				acc.push([]);
			acc[acc.length - 1].push(curr);
			return acc;
		}, [[]]);
	}

	setPage(pageNumber) {
		this.setState({ pageNumber });
	}

	backPage() {
		if (this.state.pageNumber - 1 >= 0)
			this.setPage(this.state.pageNumber - 1);
	}

	nextPage() {
		if (this.state.pageNumber + 1 < this.slices.length)
			this.setPage(this.state.pageNumber + 1);
	}

	computeAsyncDistance() {
		sortByDistance(this.props.breweries).then(b => {
			this.slices = this.sliceCards(b);
			this.setState({ loading: false });
		});
	}

	setSortMethod(method) {
		if (method === this.state.sortByMethod)
			return;

		const sortByMethod = PaginationCards.mapStringToFunc(method);
		const loading = (sortByMethod === sortByDistance);

		if (loading)
			this.computeAsyncDistance();

		this.setState({
			sortByMethod,
			loading
		});
	}

	render() {
		const active = PaginationCards.mapFuncToString(this.state.sortByMethod);
		if (this.state.sortByMethod !== sortByDistance)
			this.slices = this.sliceCards(this.state.sortByMethod(this.props.breweries));
		
		const page = this.slices[this.state.pageNumber];

		return (
			<React.Fragment>
				<SortBy onSelect={this.setSortMethod} active={active}/>
				<Loading loading={this.state.loading}>
					<BreweryCards breweries={page} />
					<Pagination pageNumber={this.state.pageNumber} length={this.slices.length} backPage={this.backPage} nextPage={this.nextPage} />
				</Loading>
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
	limit: PropTypes.number.isRequired
};

module.exports = PaginationCards;