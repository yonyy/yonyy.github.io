import React from 'react';
import PropTypes from 'prop-types';

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
						return <span aria-label={`Current page number ${number}`} aria-current='true' className='bk-control-page-active' key={number}>{number}</span>;
					return <span aria-label={`Page number ${number}`} key={number}>{number}</span>;
				})
			}
		</span>
	);
};

PageNumbers.propTypes = {
	pageNumber: PropTypes.number.isRequired,
	pagesTotal: PropTypes.number.isRequired
};

class Pagination extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const isDisabled = (back) => {
			return (back && this.props.pageNumber === 0) || (!back && this.props.pageNumber === this.props.length - 1);
		};

		const getClassName = (baseClass, back) => {
			if (isDisabled(back))
				return `${baseClass} bk-button-disabled`;
			return baseClass;
		};

		return (
			<div className='bk-pagination-controls-container'>
				<div className='bk-pagination-controls'>
					<div className='bk-control-back'>
						<button type='button' aria-label='Previous page' aria-disabled={isDisabled(true)}
							className={getClassName('bk-button bk-button-icon', true)} onClick={this.props.backPage}>
							<i aria-hidden='true' className='fas fa-chevron-left bk-icon'></i>
						</button>
					</div>
					<div className='bk-control-pages'>
						<PageNumbers pageNumber={this.props.pageNumber} pagesTotal={this.props.length} />
					</div>
					<div className='bk-control-forward'>
						<button type='button' aria-label='Next page' aria-disabled={isDisabled(false)}
							className={getClassName('bk-button bk-button-icon', false)} onClick={this.props.nextPage}>
							<i className='fas fa-chevron-right bk-icon'></i>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

Pagination.propTypes = {
	pageNumber: PropTypes.number.isRequired,
	length: PropTypes.number.isRequired,
	nextPage: PropTypes.func.isRequired,
	backPage: PropTypes.func.isRequired
};

export default Pagination;