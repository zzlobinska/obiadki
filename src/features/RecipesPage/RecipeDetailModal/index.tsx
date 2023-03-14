import { useState } from 'react';
import { BsFillClockFill, BsFillPeopleFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';

import { RecipesApi } from 'src/api';
import { Button, Modal } from 'src/components';
import { notifyApiError, notifySuccess } from 'src/components/layout/Toasts';

import NewRecipeModal from '../NewRecipeModal';
import { changeVersion } from '../slice';

import style from './RecipeDetailModal.module.scss';

import placeholder from '../../../assets/img/placeholder.png';

export interface CategoryType {
  id: number;
  attributes: {
    name: string;
    parent: {
      data: CategoryType;
    };
  };
}

export interface SelectedCategoryType extends CategoryType {
  label: string;
  value: number;
}

export type ServerIngridientType = {
  ingredient_name: string;
  ingredient_unit: string;
  ingredient_quantity: number;
  id: string;
};

export type RecipeType = {
  thumbnail: string;
  description: string;
  ingredients: ServerIngridientType[];
  portion_number: number;
  prepare_time: string;
  title: string;
  id: number;
  categories: {
    data: CategoryType[];
  };
};

type NewRecipeModalProps = {
  closeModal: () => void;
  isModalOpen: boolean;
  recipe: RecipeType;
};

const RecipeDetailModal = (props: NewRecipeModalProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editRecipe, setEditRecipe] = useState<boolean>(false);
  const {
    thumbnail,
    description,
    ingredients,
    portion_number,
    prepare_time,
    title,
    categories,
    id
  } = props.recipe;
  const category = categories?.data || [];

  const dispatch = useDispatch();

  const deleteRecipe = async () => {
    if (window.confirm('Czy na pewno chcesz usunąć przepis?')) {
      try {
        await RecipesApi.deleteRecipe(id);
        dispatch(changeVersion());
        notifySuccess(['Przepis został usunięty.']);
        props.closeModal();
      } catch (error) {
        notifyApiError(error);
      }
    }
  };

  const editModal = () => {
    setIsEditModalOpen(true);
    setEditRecipe(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Modal closeModal={props.closeModal} isOpen={props.isModalOpen}>
        <div className={style.content}>
          <img
            className={style.image}
            src={thumbnail}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = placeholder;
            }}
            alt='a dish from recipe'
          />
          <h2 className={style.title}>{title}</h2>
          <div className={style.categories}>
            {category.map((cat) => (
              <div className={style.category} key={cat.id}>
                {cat.attributes.name}
              </div>
            ))}
          </div>
          <div className={style.details}>
            <div className={style.detail}>
              <BsFillPeopleFill size={30} />
              <p className={style.detail_text}>{portion_number}</p>
            </div>
            <div className={style.detail}>
              <BsFillClockFill size={25} />
              <p className={style.detail_text}>{prepare_time}</p>
            </div>
          </div>
          <div className={style.recipe}>
            <h3 className={style.recipe__title}>lista składników</h3>
            <ul className={style.ingridients}>
              {ingredients?.map((ingredient) => (
                <li key={ingredient.id} className={style.ingridient}>
                  {ingredient.ingredient_quantity} {ingredient.ingredient_unit}{' '}
                  {ingredient.ingredient_name}
                </li>
              ))}
            </ul>
          </div>
          <div className={style.recipe}>
            <h3 className={style.recipe__title}>przepis</h3>
            <ul className={style.steps}>
              <li className={style.step}>{description}</li>
            </ul>
          </div>
          <div className={style.btns}>
            <Button onClick={editModal} label='Edytuj Przepis' />
            <Button onClick={deleteRecipe} label='Usuń Przepis' red />
          </div>
        </div>
      </Modal>

      <Modal
        title='Nowy Przepis'
        closeModal={closeEditModal}
        isOpen={isEditModalOpen}
      >
        <NewRecipeModal
          editRecipe={editRecipe}
          recipe={props.recipe}
          closeModal={closeEditModal}
          isModalActive={isEditModalOpen}
        />
      </Modal>
    </>
  );
};

export default RecipeDetailModal;
