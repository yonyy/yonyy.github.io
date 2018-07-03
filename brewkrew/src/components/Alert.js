import React from 'react';
import Modal from 'react-modal';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		textAlign: 'center'
	}
};

class Alert extends React.Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: true
		};

		this.closeModal = this.closeModal.bind(this);
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}

	render() {
		return (
			<div>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Alert">
					<p><strong>Warning:</strong> This project has been moved into its own <a style={{ fontSize: '1em', color: '#2196F3' }} className='bk-link' href='https://github.com/yonyy/brewkrew'>repository</a>. 
						No further development will made to this project. New changes will be forwarded to the new repo.</p>
					<button onClick={this.closeModal} className='bk-action-button '>Close</button>
				</Modal>
			</div>
		);
	}
}

export default Alert;