import classNames from 'classnames';
import { useState } from 'react';
import { BsArrowUpLeftSquare, BsDice3, BsPlusSquare, BsXSquare } from 'react-icons/bs';
import style from './MenuCard.module.scss';

type MenuCardProps = {
	day: Date;
};

const MenuCard = (props: MenuCardProps) => {
	const [isDayActive, setIsDayActive] = useState<boolean>(true);
	const disableDay = () => {
		setIsDayActive(prev => !prev);
	};
	const disabledTextClass = classNames(style.generator__txt, {
		[style.disabled]: !isDayActive,
	});
	const disabledBtnClass = classNames(style.generator__btn, {
		[style.disabled]: !isDayActive,
	})
	return (
		<div className={style.row}>
			<div className={style.date}>
				<button onClick={disableDay} className={style.date__btn}>
					{isDayActive && <BsXSquare size={20} />}
					{!isDayActive && <BsArrowUpLeftSquare size={20} />}
				</button>
				<div className={style.date__text}>
					<p className={classNames(style.weekday, {
						[style.disabled]: !isDayActive,
					})}>
						{props.day.toLocaleString('pl', { weekday: 'short' })}
					</p>
					<p className={classNames(style.day, {
						[style.disabled]: !isDayActive,
					})}>{props.day.toLocaleDateString('pl')}</p>
				</div>
			</div>
			<div className={style.generator}>
				<button disabled={!isDayActive} className={disabledBtnClass}>
					<BsPlusSquare size={35} />
					<p className={disabledTextClass}>dodaj</p>
				</button>
				<button
					disabled={!isDayActive}
					className={disabledBtnClass}
				>
					<BsDice3 size={35} />
					<p className={disabledTextClass}>losuj</p>
				</button>
			</div>
			{!isDayActive && <hr className={style.cross} />}
		</div>
	);
};

export default MenuCard;
