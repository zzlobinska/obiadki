import { useState } from 'react';
import { BsArrowDownShort, BsSearch } from 'react-icons/bs';
import { Button, Input, InputSelect, Modal } from 'src/components';
import style from './RecepiesHeader.module.scss';

const RecepiesHeader = () => {
	const [isModalActive, setIsModalActive] = useState(true);
	const closeModal = () => {
		setIsModalActive(false);
	};
	return (
		<header className={style.header}>
			<InputSelect wrapperStyle={style.select}/>
			<div className={style.searchbar}>
				<Input wrapperStyle={style.select} placeholder='Szukaj...' />
				<BsSearch className={style.searchbar_icon} />
			</div>
			<div className={style.add_recepie}>
				<Button className={style.btn} label='dodaj przepis' />
			</div>
			<Modal title='cipka' closeModal={closeModal} isOpen={isModalActive}>
				<div></div>
			</Modal>
		</header>
	);
};

export default RecepiesHeader;
