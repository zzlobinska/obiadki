import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import placeholder from 'src/assets/img/placeholder.png';
import { RecipeType } from 'src/constans/types';
import RecipeDetailModal from 'src/features/RecipesPage/components/RecipeDetailModal';

import Modal from '../Modal';

import style from './MealThumbnailInModal.module.scss';

type MealThumbnailInModalProps = {
  recipe: RecipeType;
  randomRecipe?: boolean;
  setRecipe?: (recipe: RecipeType) => void;
};

const MealThumbnailInModal = ({
  recipe,
  setRecipe = () => {}
}: MealThumbnailInModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={style.container}>
      <button className={style.add} onClick={() => setRecipe(recipe)}>
        <img
          alt='a thumbnail of meals recipe'
          src={recipe.thumbnail || placeholder}
          className={style.image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = placeholder;
          }}
        />
      </button>
      <button onClick={openModal} className={style.title}>
        <p className={style.text}>{recipe.title}</p>
        <BsSearch size={15} />
      </button>
      <Modal closeModal={closeModal} isOpen={isModalOpen}>
        <RecipeDetailModal closeModal={closeModal} recipe={recipe} />
      </Modal>
    </div>
  );
};

export default MealThumbnailInModal;
