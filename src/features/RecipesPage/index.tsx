
import style from './Recipes.module.scss';
import RecipesList from './RecipesList';
import RecipesHeader from './RecipesHeader';


const RecipesPage = () => {
	return (
		<div className={style.content}>
			<RecipesHeader />
			<RecipesList />
		</div>
	);
};

export default RecipesPage;
