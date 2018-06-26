import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { searchOpen: false };
		this.toggleSearchField = this.toggleSearchField.bind(this);
		this._onChange = this._onChange.bind(this);
	}

	toggleSearchField() {
		this.setState({searchOpen: !this.state.searchOpen});
	}

	_onChange(evt) {
		this.props.onChange(evt.target.value);
	}

	render() {
		let bkSearchClass = 'bk-search-expand-animation' + ((this.state.searchOpen) ? ' bk-search-expanded' : '');
		let tabIndex = (this.state.searchOpen) ? 0 : -1;
		let buttonLabel = (this.state.searchOpen) ? 'Collapse search input field': 'Expand search input field';

		return (
			<div className='bk-search-container'>
				<button type='button' aria-label={buttonLabel} aria-expanded={this.state.searchOpen} aria-controls='brewerySearch'
					className='bk-button bk-button-icon' onClick={this.toggleSearchField}>
					<i aria-hidden='true' className='fas fa-search bk-icon'></i>
				</button>
				<input id='brewerySearch' tabIndex={tabIndex} onChange={this._onChange} value={this.props.value}
					className={bkSearchClass} type='text'
					placeholder=':visited' />
			</div>
		);
	}
}

Search.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default Search;