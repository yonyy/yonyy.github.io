const React = require('react');
const ErrorBoundary = require('./ErrorBoundary')
const HeaderContainer = require('./HeaderContainer');
const Menu = require('./Menu');
const Search = require('./Search');
const Map = require('./Map');

class BrewKrewContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { searchTerm: '' };
		this.setSearchTerm = this.setSearchTerm.bind(this);
	}

	setSearchTerm(term) {
		this.setState({searchTerm: term});
	}

	render() {
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
							<Search value={this.state.searchTerm} onChange={this.setSearchTerm}/>
						</div>
					</HeaderContainer>
					<div className='bk-section'>
						<Map google={this.props.google} searchTerm={this.state.searchTerm}/>
					</div>
					<div className='bk-section'></div>
				</div>
			</ErrorBoundary>
		);
	}
}

module.exports = BrewKrewContainer;