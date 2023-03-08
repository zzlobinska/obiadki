import { useState } from 'react';
import { BsPlusSquare } from 'react-icons/bs';

import { Modal } from 'src/components';

import NewMenuModal from './NewMenuModal';

import style from './MenuHeader.module.scss';

const MenuHeader = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
		
	};

	return (
		<div className={style.header}>
			<h2 className={style.title}>moje jadłospisy</h2>
			<button onClick={openModal} className={style.btn}>
				<BsPlusSquare size={40} />
			</button>
			<NewMenuModal isModalOpen={isModalOpen} closeModal={closeModal} />
		</div>
	);
};

export default MenuHeader;
