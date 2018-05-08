const React = require('react');
const PropTypes = require('prop-types');
const ErrorBoundary = require('./ErrorBoundary');
const HeaderContainer = require('./HeaderContainer');
const Menu = require('./Menu');
const Search = require('./Search');
const Map = require('./Map');
const AnchorButton = require('./AnchorButton');
const PaginationCards = require('./PaginationCards');
const Conquerors = require('./Conquerors');
const data = require('../db');

class BrewKrewContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { searchTerm: '', results: [] };
		this.triggerSearch = this.triggerSearch.bind(this);
		this.filterMarkers = this.filterMarkers.bind(this);
		this.filterVisited = this.filterVisited.bind(this);

		this.data = data;
		this.cardListLimit = 10;
	}

	triggerSearch(term) {
		let results = (term.startsWith(':')) ? this.executeCommand(term) : this.filterMarkers(term);
		this.setState({searchTerm: term, results});
	}

	executeCommand(rawCommand) {
		const command = rawCommand.substring(1).toLowerCase();
		switch (command) {
		case 'visited':
			return this.filterVisited(true);
		case '!visited':
			return this.filterVisited(false);
		default:
			return this.filterMarkers(rawCommand);
		}
	}

	filterMarkers(label) {
		return this.data.filter((brewery) => {
			return brewery.label.toLowerCase().startsWith(label.toLowerCase());
		});
	}

	filterVisited(visited) {
		return this.data.filter((brewery) => {
			return brewery.visited === visited;
		});
	}

	render() {
		const results = (this.state.searchTerm) ? this.state.results : data;
		return (
			<ErrorBoundary>
				<div className='bk-container'>
					<HeaderContainer>
						<div className='bk-heading-item'>
							<Menu/>
						</div>
						<div className='bk-heading-item'>
							<header className='bk-header'><h1>Brew Krew</h1></header>
						</div>
						<div className='bk-heading-item'>
							<Search value={this.state.searchTerm} onChange={this.triggerSearch} results={this.state.results}/>
						</div>
					</HeaderContainer>
					<div className='bk-sections-container'>
						<div className='bk-section'>
							<AnchorButton targetUp='map' targetDown='cards'>
								<Map google={this.props.google} data={data} points={results} doubleClick={this.triggerSearch}/>
							</AnchorButton>
						</div>
						<div className='bk-section' id='cards'>
							<PaginationCards limit={this.cardListLimit} breweries={results} pageNumber={this.state.pageNumber} setPage={this.setPage}/>
						</div>
						<div className='bk-section' id='conquerors'>
							<Conquerors />
						</div>
					</div>
				</div>
			</ErrorBoundary>
		);
	}
}

BrewKrewContainer.propTypes = {
	google: PropTypes.object
};

module.exports = BrewKrewContainer;