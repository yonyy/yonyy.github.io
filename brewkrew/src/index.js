import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import BrewKrewContainer from './components/BrewKrewContainer';
import ErrorBoundary from './components/ErrorBoundary';

import style from './sass/main.scss';

class BrewKrew extends React.Component {
	render() {
		if (google)
			return (<BrewKrewContainer google={google}/>);

		return (<div></div>);
	}
}

class BrewKrewErrorBoundary extends React.Component {
	render() {
		return (
			<ErrorBoundary>
				<BrewKrew />
			</ErrorBoundary>
		);
	}
}

BrewKrewErrorBoundary.style = style;

function render() {
	ReactDOM.render(<BrewKrewErrorBoundary />, document.getElementById('root'));
	Modal.setAppElement('#root');
}

document.addEventListener('DOMContentLoaded', render, false);