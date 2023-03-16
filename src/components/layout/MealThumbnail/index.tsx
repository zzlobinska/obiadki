import { useState } from 'react';
import classNames from 'classnames';

import RecipeDetailModal, {
  RecipeType
} from 'src/features/RecipesPage/RecipeDetailModal';

import Modal from '../Modal';

import style from './MealThumbnail.module.scss';

import placeholder from '../../../assets/img/placeholder.png';

type MealThumbnailProps = {
  recipe: RecipeType;
  randomRecipe?: boolean;
};

const MealThumbnail = ({ recipe, randomRecipe }: MealThumbnailProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={openModal}
        className={classNames(style.container, {
          [style.container_menu]: randomRecipe
        })}
      >
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
      <Modal closeModal={closeModal} isOpen={isModalOpen}>
        <RecipeDetailModal closeModal={closeModal} recipe={recipe} />
      </Modal>
    </>
  );
};

export default MealThumbnail;
