import React from 'react';
import PropTypes from 'prop-types';

class SortBy extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { onSelect, active } = this.props;
		const onClick = (key) => {
			return () => {
				onSelect(key);
			};
		};

		const isActive = (key) => {
			return (key == active) ? 'bk-active' : '';
		};

		return (
			<div className='bk-sortby-buttons-container'>
				<button aria-sort={isActive('aZ') ? 'descending' : 'none'} aria-label='Sort by label in descending order'
					onClick={onClick('aZ')} type='button' className={`bk-sortby-button bk-button bk-button-icon ${isActive('aZ')}`}>
					<i aria-hidden='true' className='fas fa-sort-alpha-down bk-icon'></i>
				</button>
				<button aria-sort={isActive('zA') ? 'ascending' : 'none'} aria-label='Sort by label in ascending order'
					onClick={onClick('zA')} type='button' className={`bk-sortby-button bk-button bk-button-icon ${isActive('zA')}`}>
					<i aria-hidden='true' className='fas fa-sort-alpha-up bk-icon'></i>
				</button>
				<button aria-sort={isActive('distance') ? 'descending' : 'none'} aria-label='Sort by distance in descending order'
					onClick={onClick('distance')} type='button' className={`bk-sortby-button bk-button bk-button-icon ${isActive('distance')}`}>
					<i aria-hidden='true' className='fas fa-map-marker-alt bk-icon'></i>
				</button>
				<button aria-sort={isActive('rating') ? 'descending' : 'none'} aria-label='Sort by rating in descending order'
					onClick={onClick('rating')} type='button' className={`bk-sortby-button bk-button bk-button-icon ${isActive('rating')}`}>
					<i aria-hidden='true' className='fas fa-star bk-icon'></i>
				</button>
			</div>
		);
	}
}

SortBy.propTypes = {
	onSelect: PropTypes.func.isRequired,
	active: PropTypes.string.isRequired
};

export default SortBy;