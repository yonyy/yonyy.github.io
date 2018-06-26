import React from 'react';
import PropTypes from 'prop-types';
import BreweryCards from './BreweryCards';
import SortBy from './SortBy';
import Pagination from './Pagination';
import Loading from './Loading';
import { sortByAZ, sortByZA, sortByDistance, sortByRating } from './util/sortByMethods';

class PaginationCards extends React.Component {
	constructor(props) {
		super(props);
		this.sliceCards = this.sliceCards.bind(this);
		this.backPage = this.backPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.setSortMethod = this.setSortMethod.bind(this);
		this.sort = this.sort.bind(this);

		const id = PaginationCards.generateID(this.props.breweries);
		this.state = {
			pageNumber: 0,
			id,
			sortByMethod: sortByDistance,
			loading: true,
			slices: [[]]
		};

		this.sort();
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
				loading: true,
				slices: [[]]
			};
		}

		return null;
	}

	componentDidUpdate() {
		if (this.state.loading) {
			this.sort();
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
		if (this.state.pageNumber + 1 < this.state.slices.length)
			this.setPage(this.state.pageNumber + 1);
	}

	sort() {
		const { breweries } = this.props;
		if (this.state.sortByMethod === sortByDistance) {
			this.state.sortByMethod(breweries).then(b => {
				const slices = this.sliceCards(b);
				this.setState({ loading: false, slices });
			});
		} else {
			const sorted = this.state.sortByMethod(breweries);
			const slices = this.sliceCards(sorted);
			this.setState({ loading: false, slices });
		}
	}

	setSortMethod(method) {
		if (method === this.state.sortByMethod)
			return;

		const sortByMethod = PaginationCards.mapStringToFunc(method);
		this.setState({
			sortByMethod,
			loading: true,
			slices: [[]]
		});
	}

	render() {
		const active = PaginationCards.mapFuncToString(this.state.sortByMethod);
		const page = this.state.slices[this.state.pageNumber];
		const length = this.state.slices.length;
		return (
			<React.Fragment>
				<SortBy onSelect={this.setSortMethod} active={active}/>
				<Loading loading={this.state.loading}>
					<BreweryCards breweries={page} />
					<Pagination pageNumber={this.state.pageNumber} length={length} backPage={this.backPage} nextPage={this.nextPage} />
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

export default PaginationCards;