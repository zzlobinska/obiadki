import { BsFillClockFill, BsFillPeopleFill } from 'react-icons/bs';
import { Button, Modal } from 'src/components';
import style from './RecepieDetailModal.module.scss';

export type CategoryType = {
	id: number;
	attributes: {
		name: string;
	};
};

export type RecepieType = {
	thumbnail: string;
	description: string;
	ingredients: any[];
	portion_number: number;
	prepare_time: string;
	title: string;
	categories: {
		data: CategoryType[];
	};
};

type NewRecepieModalProps = {
	closeModal: () => void;
	isModalOpen: boolean;
	recepie: RecepieType;
};

const RecepieDetailModal = (props: NewRecepieModalProps) => {
	const {
		thumbnail,
		description,
		ingredients,
		portion_number,
		prepare_time,
		title,
		categories,
	} = props.recepie;
	const category = categories.data;

	return (
		<Modal closeModal={props.closeModal} isOpen={props.isModalOpen}>
			<div className={style.content}>
				<img className={style.image} src={thumbnail} />
				<h2 className={style.title}>{title}</h2>
				<div className={style.categories}>
					{category.map((cat) => (
						<div className={style.category} key={cat.id}>
							{cat.attributes.name}
						</div>
					))}
				</div>
				<div className={style.details}>
					<div className={style.detail}>
						<BsFillPeopleFill size={30} />
						<p className={style.detail_text}>{portion_number}</p>
					</div>
					<div className={style.detail}>
						<BsFillClockFill size={25} />
						<p className={style.detail_text}>{prepare_time}</p>
					</div>
				</div>
				<div className={style.recipe}>
					<h3 className={style.recipe__title}>lista składników</h3>
					<ul className={style.ingridients}>
						{ingredients?.map((ingredient) => (
							<li key={ingredient.id} className={style.ingridient}>
								{ingredient.ingredient_quantity} {ingredient.ingredient_unit}{' '}
								{ingredient.ingredient_name}
							</li>
						))}
					</ul>
				</div>
				<div className={style.recipe}>
					<h3 className={style.recipe__title}>przepis</h3>
					<ul className={style.steps}>
						<li className={style.step}>{description}</li>
					</ul>
				</div>
				<div className={style.btns}>
					<Button label='Edytuj Przepis' />
					<Button label='Usuń Przepis' />
				</div>
			</div>
		</Modal>
	);
};

export default RecepieDetailModal;
