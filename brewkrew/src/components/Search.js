const React = require('react');

class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = { searchOpen: false };
		this.toggleSearchField = this.toggleSearchField.bind(this);
	}

	toggleSearchField() {
		this.setState({searchOpen: !this.state.searchOpen});
	}

	render() {
		let bkSearchClass = 'bk-search-expand-animation' + ((this.state.searchOpen) ? ' bk-search-expanded' : '');
		return (
			<div className='bk-search-container'>
				<button className='bk-button bk-button-icon'
				onClick={this.toggleSearchField}>
					<i className="fas fa-search bk-icon"></i>
				</button>
				<input className={bkSearchClass} type='text'/>
			</div>
		);
	}
}

module.exports = Search;