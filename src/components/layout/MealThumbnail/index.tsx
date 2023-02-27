import { useState } from 'react';
import RecepieDetailModal, {
	RecepieType,
} from 'src/features/RecepiesPage/RecepieDetailModal';
import style from './MealThumbnail.module.scss';

type MealThumbnailProps = {
	recepie: RecepieType;
};

const MealThumbnail = ({ recepie }: MealThumbnailProps) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const openModal = () => {
		setIsModalOpen(true);
	};

	return (
		<>
			<button onClick={openModal} className={style.container}>
				<img
					alt='a thumbnail of meals recepie'
					src={recepie.thumbnail}
					className={style.image}
				/>
				<p className={style.title}>{recepie.title}</p>
			</button>
			<RecepieDetailModal
				closeModal={closeModal}
				isModalOpen={isModalOpen}
				recepie={recepie}
			/>
		</>
	);
};

export default MealThumbnail;
