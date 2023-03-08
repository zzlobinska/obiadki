import { useState } from 'react';

import RecipeDetailModal, {
  RecipeType
} from 'src/features/RecipesPage/RecipeDetailModal';

import style from './MealThumbnail.module.scss';

import placeholder from '../../../assets/img/placeholder.png';

type MealThumbnailProps = {
  recipe: RecipeType;
};

const MealThumbnail = ({ recipe }: MealThumbnailProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button onClick={openModal} className={style.container}>
        <img
          alt='a thumbnail of meals recipe'
          src={recipe.thumbnail || placeholder}
          className={style.image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = placeholder;
          }}
        />
        <p className={style.title}>{recipe.title}</p>
      </button>
      <RecipeDetailModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        recipe={recipe}
      />
    </>
  );
};

export default MealThumbnail;
