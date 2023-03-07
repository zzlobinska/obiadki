import { BsFillClockFill, BsFillPeopleFill } from 'react-icons/bs';
import { Modal } from 'src/components';
import style from './RecepieDetailModal.module.scss';

type NewRecepieModalProps = {
	closeModal: () => void;
	isModalOpen: boolean;
	image: string;
	title: string;
};

const RecepieDetailModal = (props: NewRecepieModalProps) => {
	return (
		<Modal closeModal={props.closeModal} isOpen={props.isModalOpen}>
			<div className={style.content}>
				<img className={style.image} src={props.image} />
				<h2 className={style.title}>{props.title}</h2>
				<div className={style.details}>
					<div className={style.detail}>
						<BsFillPeopleFill size={30} />
						<p className={style.detail_text}>2-3</p>
					</div>
					<div className={style.detail}>
						<BsFillClockFill size={25} />
						<p className={style.detail_text}>15 min</p>
					</div>
				</div>
				<div className={style.recipe}>
					<h3 className={style.recipe__title}>lista składników</h3>
					<ul className={style.ingridients}>
						<li className={style.ingridient}>5 kg monki</li>
						<li className={style.ingridient}>5 kg monki</li>
					</ul>
				</div>
				<div className={style.recipe}>
					<h3 className={style.recipe__title}>przepis</h3>
					<ul className={style.steps}>
						<li className={style.step}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
							quibusdam!
						</li>
						<li className={style.step}>cook some meth</li>
					</ul>
				</div>
			</div>
		</Modal>
	);
};

export default RecepieDetailModal;
