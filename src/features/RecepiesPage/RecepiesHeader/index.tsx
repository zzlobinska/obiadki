import { useState } from 'react';
import {
	BsArrowDownShort,
	BsSearch,
	BsFillPeopleFill,
	BsFillClockFill,
} from 'react-icons/bs';
import { Button, Input, InputSelect, Modal, Textarea } from 'src/components';
import Searchbar from 'src/components/layout/Searchbar';
import NewRecepieModal from '../NewRecepieModal';
import style from './RecepiesHeader.module.scss';

const RecepiesHeader = () => {
	const [isModalActive, setIsModalActive] = useState(false);
	const closeModal = () => {
		setIsModalActive(false);
	};
	const openModal = () => {
		setIsModalActive(true);
	};
	return (
		<header className={style.header}>
			<InputSelect wrapperStyle={style.select} />
			<Searchbar />
			<div className={style.add_recepie}>
				<Button
					onClick={openModal}
					className={style.btn}
					label='dodaj przepis'
				/>
			</div>
			<NewRecepieModal closeModal={closeModal} isModalActive={isModalActive} />
		</header>
	);
};

export default RecepiesHeader;
