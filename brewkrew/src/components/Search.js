const React = require('react');
const SearchResultsDropdown = require('./SearchResultsDropdown');

class Search extends React.Component {
	constructor(props) {
		super(props)
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

		return (
			<div className='bk-search-container'>
				<button className='bk-button bk-button-icon'
				onClick={this.toggleSearchField}>
					<i className="fas fa-search bk-icon"></i>
				</button>
				<input tabIndex={tabIndex} onChange={this._onChange} value={this.props.value}
					className={bkSearchClass} type='text'
					placeholder=':visited' />
			</div>
		);
	}
}

module.exports = Search;