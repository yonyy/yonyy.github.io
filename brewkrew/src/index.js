require('babel-polyfill');
const React = require('react');
const ReactDOM = require('react-dom');

const BrewKrewContainer = require('./components/BrewKrewContainer');
const ErrorBoundary = require('./components/ErrorBoundary');

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

function render() {
	ReactDOM.render(<BrewKrewErrorBoundary />, document.getElementById('root'));
}

document.addEventListener('DOMContentLoaded', render, false);