import { RecipeType } from 'src/constans/types';
import RecipesHeader from 'src/features/RecipesPage/components/RecipesHeader';
import RecipesList from 'src/features/RecipesPage/components/RecipesList';

import style from './AddRecipeModal.module.scss';

type AddRecipeModalprops = {
  setRecipe: (recipe: RecipeType) => void;
};

const AddRecipeModal = ({ setRecipe }: AddRecipeModalprops) => {
  return (
    <div className={style.content}>
      <RecipesHeader inModal />
      <RecipesList setRecipe={setRecipe} inModal />
    </div>
  );
};

export default AddRecipeModal;
