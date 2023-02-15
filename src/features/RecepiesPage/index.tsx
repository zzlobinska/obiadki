
import style from './Recepies.module.scss';
import RecepiesList from './RecepiesList';
import RecepiesHeader from './RecepiesHeader';

const RecepiesPage = () => {
	return (
		<div className={style.content}>
			<RecepiesHeader />
			<RecepiesList />
		</div>
	);
};

export default RecepiesPage;
