import { useState } from 'react';
import { Modal } from 'src/components';
import MealThumbnail from 'src/components/layout/MealThumbnail';
import NewRecepieModal from '../NewRecepieModal';
import RecepieDetailModal from '../RecepieDetailModal';
import style from './RecepiesList.module.scss';



const RecepiesList = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const openModal = () => {
		setIsModalOpen(true);
	};
	const DUMMY_RECEPIES = [
		{
			title: 'nalesniki',
			image:
				'https://images.aws.nestle.recipes/resized/2020_02_19T16_00_53_image_708_600.ashx',
			key: Math.random(),
		},
	];

	

	
	return (
		<div className={style.recepies}>
			{DUMMY_RECEPIES.map((recepie) => (
				<div key={recepie.key}>
					<MealThumbnail
						openModal={openModal}
						title={recepie.title}
						image={recepie.image}
						
					/>
					<RecepieDetailModal
						closeModal={closeModal}
						isModalOpen={isModalOpen}
						image={recepie.image}
						title={recepie.title}
					
					/>
				</div>
			))}
		</div>
	);
};

export default RecepiesList;
