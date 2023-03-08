
import RecipesHeader from './RecipesHeader';
import RecipesList from './RecipesList';

import style from './Recipes.module.scss';


const RecipesPage = () => {
	return (
		<div className={style.content}>
			<RecipesHeader />
			<RecipesList />
		</div>
	);
};

export default RecipesPage;
