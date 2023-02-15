import style from './MealThumbnail.module.scss';

type MealThumbnailProps = {
	title: string;
	image: string;
};

const MealThumbnail = (props: MealThumbnailProps) => {
	return (
		<div className={style.container}>
			<img
				alt='a thumbnail of meals recepie'
				src={props.image}
				className={style.image}
			/>
			<p className={style.title}>{props.title}</p>
		</div>
	);
};

export default MealThumbnail;
