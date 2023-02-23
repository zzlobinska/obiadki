import { useState } from 'react';
import RecepieDetailModal from 'src/features/RecepiesPage/RecepieDetailModal';
import style from './MealThumbnail.module.scss';

type MealThumbnailProps = {
	title: string;
	image: string;
	openModal: () => void;
};

const MealThumbnail = (props: MealThumbnailProps) => {
	return (
		<button onClick={props.openModal} className={style.container}>
			<img
				alt='a thumbnail of meals recepie'
				src={props.image}
				className={style.image}
			/>
			<p className={style.title}>{props.title}</p>
		</button>
	);
};

export default MealThumbnail;
