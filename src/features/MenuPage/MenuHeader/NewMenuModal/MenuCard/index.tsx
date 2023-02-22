import { BsDice3, BsPlusSquare, BsXSquare } from 'react-icons/bs';
import style from './MenuCard.module.scss';

const MenuCard = () => {
	return (
		<div className={style.row}>
			<div className={style.date}>
				<button className={style.date__btn}>
					<BsXSquare size={20} />
				</button>
				<div className={style.date__text}>
					<p className={style.weekday}>PON</p>
					<p className={style.day}>14.02.2023</p>
				</div>
			</div>
			<div className={style.generator}>
				<button className={style.generator__btn}>
					<BsPlusSquare size={35} />
					<p className={style.generator__txt}>dodaj</p>
				</button>
				<button className={style.generator__btn}>
					<BsDice3 size={35} />
					<p className={style.generator__txt}>losuj</p>
				</button>
			</div>
		</div>
	);
};

export default MenuCard;
