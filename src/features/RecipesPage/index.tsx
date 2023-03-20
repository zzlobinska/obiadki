import RecipesHeader from './components/RecipesHeader';
import RecipesList from './components/RecipesList';

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
