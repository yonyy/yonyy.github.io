import React from 'react';

class SearchResultsDropdown extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='bk-search-result-dropdown-container'>
				<ul className='bk-search-results'>
					<li className='bk-search-result'>
						<div className='bk-search-result-container'>
							<p>Alesmith Brewery</p>
							<p>3205 Drew Street Los Angeles Ca 90065</p>
						</div>
					</li>
					<li className='bk-search-result'>
						<div className='bk-search-result-container'>
							<p>Alesmith Brewery</p>
							<p>3205 Drew Street Los Angeles Ca 90065</p>
						</div>
					</li>
					<li className='bk-search-result'>
						<div className='bk-search-result-container'>
							<p>Alesmith Brewery</p>
							<p>3205 Drew Street Los Angeles Ca 90065</p>
						</div>
					</li>
					<li className='bk-search-result'>
						<div className='bk-search-result-container'>
							<p>Alesmith Brewery</p>
							<p>3205 Drew Street Los Angeles Ca 90065</p>
						</div>
					</li>
				</ul>
			</div>
		);
	}
}

export default SearchResultsDropdown;