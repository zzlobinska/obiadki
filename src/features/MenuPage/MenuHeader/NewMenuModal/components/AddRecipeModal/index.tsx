import { useState } from 'react';

import { Modal } from 'src/components';
import RecipesHeader from 'src/features/RecipesPage/RecipesHeader';
import RecipesList from 'src/features/RecipesPage/RecipesList';

import style from './AddRecipeModal.module.scss';

type AddRecipeModalprops = {
  setRecipe: any;
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
