const React = require('react');
const PropTypes = require('prop-types');
const conquerors = require('./util/conquerors');

const ConquerorImage = ({ url, initials }) => {
	if (!url) {
		return (
			<div className='bk-conqueror-img'>
				<p className={'bk-conqueror-initials'}>{ initials }</p>
			</div>
		);
	}

	return (
		<img className='bk-conqueror-img' src={url}></img>
	);
};

ConquerorImage.propTypes = {
	url: PropTypes.string,
	initials: PropTypes.string
};

const Conqueror = ({ conqueror }) => {
	return (
		<div className='bk-conqueror-container'>
			<div className='bk-conqueror-img-container'>
				<ConquerorImage url={conqueror.backgroundUrl} initials={conqueror.initials}	/>		
			</div>
			<div className='bk-conqueror-name'>
				<p>{ conqueror.name }</p>
			</div>
		</div>
	);
};

Conqueror.propTypes = {
	conqueror: PropTypes.object.isRequired
};

class Conquerors extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='bk-conquerors-container'>
				{
					conquerors.map((c, index) => {
						return <Conqueror conqueror={c} key={index} />;
					})
				}
			</div>
		);
	}
}

module.exports = Conquerors;