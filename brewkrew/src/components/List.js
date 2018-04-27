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
						this.props.data.map((b) => {
							return <Li brewery={b} key={b.id}/>
						})
					}
				</ul>
			</div>
		)
	}
}

module.exports = List;