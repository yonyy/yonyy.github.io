const React = require('react');


const Li = ({ brewery }) => {
	return (
		<li>
			<p>{ brewery.label }</p>
			<p>{ brewery.address }</p>
			<p>Visited?: { brewery.visited.toString() }</p>
		</li>
	)
}

class List extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<ul>
					{
						this.props.data.map((b, i) => {
							let { index } = b;
							let key = index || i;
							return <Li brewery={b} key={key}/>
						})
					}
				</ul>
			</div>
		)
	}
}

module.exports = List;