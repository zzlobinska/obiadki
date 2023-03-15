import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import RecipeDetailModal, {
  RecipeType
} from 'src/features/RecipesPage/RecipeDetailModal';

import style from './MealThumbnailInModal.module.scss';

import placeholder from '../../../assets/img/placeholder.png';

type MealThumbnailInModalProps = {
  recipe: RecipeType;
  randomRecipe?: boolean;
  setRecipe?: any;
};

const MealThumbnailInModal = ({
  recipe,
  setRecipe
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
      <RecipeDetailModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        recipe={recipe}
      />
    </div>
  );
};

export default MealThumbnailInModal;
