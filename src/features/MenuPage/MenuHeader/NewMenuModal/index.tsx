import { Modal } from 'src/components';
import { useState } from 'react';

type NewMenuModalProps = {
	isModalOpen: boolean;
	closeModal: () => void;
};

const NewMenuModal = (props: NewMenuModalProps) => {
	return (
		<Modal isOpen={props.isModalOpen} closeModal={props.closeModal}>
			<div></div>
		</Modal>
	);
};

export default NewMenuModal;
