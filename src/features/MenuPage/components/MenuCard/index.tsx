import { useState } from 'react';
import { useEffect } from 'react';
import {
  BsArrowUpLeftSquare,
  BsDice3,
  BsPlusSquare,
  BsXSquare
} from 'react-icons/bs';
import classNames from 'classnames';

import { RecipesApi } from 'src/api';
import { Modal } from 'src/components';
import MealThumbnail from 'src/components/layout/MealThumbnail';
import { RecipeType, ServerRecipeType } from 'src/constans/types';
import { getFullRecipe } from 'src/utils/helpers';

import AddRecipeModal from '../AddRecipeModal';

import style from './MenuCard.module.scss';

const funnyTextArray = [
  'Brak przepisu na ten dzień.',
  'Oho, szykuje się wyjazd :O',
  'Twój portfel nie będzie Ci wdzięczny...',
  'Kuchnia od Ciebie odpocznie! See you soon',
  'A co? Lodówka pusta?',
  'Też bym chciała do restauracji ;(',
  'tzw obiad składak xD'
];

type MenuCardProps = {
  day: Date;
  key: string;
  ready?: boolean;
  recipe?: ServerRecipeType;
  onMealSelect?: (data: {
    date: Date;
    recipe: number;
    id: string;
    isDisabled: boolean;
  }) => void;
  id: string;
  isDisabled?: boolean;
};

const MenuCard = (props: MenuCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDayActive, setIsDayActive] = useState<boolean>(!props.isDisabled);
  const [randomRecipe, setRandomRecipe] = useState<RecipeType | null>(
    props.ready && props.recipe ? getFullRecipe(props.recipe) : null
  );

  const generateFunnyText = () => {
    const id =
      Math.floor(new Date(props.day).getTime() / 1_000_000) %
      funnyTextArray.length;

    return funnyTextArray[id];
  };

  const disableDay = () => {
    setIsDayActive((prev) => !prev);
    getBack();
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const disabledBtnClass = classNames(style.generator__btn, {
    [style.disabled]: !isDayActive
  });

  const fetchMenuRecipes = async () => {
    const totalQuery = {
      pagination: {
        page: 1,
        pageSize: 1
      }
    };
    const { data } = await RecipesApi.getRecipes(totalQuery);
    const recipesTotal = data.meta.pagination.total;
    const randomRecipeNumber = Math.floor(Math.random() * recipesTotal + 1);

    const query = {
      pagination: {
        page: randomRecipeNumber,
        pageSize: 1
      }
    };
    const { data: recipeData } = await RecipesApi.getRecipes(query);
    setRandomRecipe(getFullRecipe(recipeData.data[0]));
  };

  const setRecipeHandler = (recipe: RecipeType) => {
    setRandomRecipe(recipe);
    closeModal();
  };

  useEffect(() => {
    if (
      (randomRecipe || !isDayActive) &&
      props.onMealSelect &&
      randomRecipe?.id
    ) {
      props.onMealSelect({
        date: props.day,
        recipe: randomRecipe?.id,
        id: props.id,
        isDisabled: !isDayActive
      });
    }
  }, [randomRecipe, isDayActive]);

  const getBack = () => {
    setRandomRecipe(null);
  };

  return (
    <>
      <div className={style.row}>
        <div className={style.date}>
          <button onClick={disableDay} className={style.date__btn}>
            {!props.ready && isDayActive && <BsXSquare size={20} />}
            {!props.ready && !isDayActive && <BsArrowUpLeftSquare size={20} />}
          </button>
          <div className={style.date__text}>
            <p
              className={classNames(style.weekday, {
                [style.disabled]: !isDayActive
              })}
            >
              {props.day.toLocaleString('pl', { weekday: 'short' })}
            </p>
            <p
              className={classNames(style.day, {
                [style.disabled]: !isDayActive
              })}
            >
              {props.day.toLocaleDateString('pl')}
            </p>
          </div>
        </div>
        <div
          className={classNames(style.generator, {
            [style.mobileColumn]: !randomRecipe
          })}
        >
          {!randomRecipe && !props.ready ? (
            <>
              <button
                onClick={openModal}
                disabled={!isDayActive}
                className={disabledBtnClass}
              >
                <BsPlusSquare size={35} />
                <p
                  className={classNames(style.text, {
                    [style.disabledText]: !isDayActive
                  })}
                >
                  dodaj
                </p>
              </button>
              <button
                onClick={fetchMenuRecipes}
                disabled={!isDayActive}
                className={disabledBtnClass}
              >
                <BsDice3 size={35} />
                <p
                  className={classNames(style.text, {
                    [style.disabledText]: !isDayActive
                  })}
                >
                  losuj
                </p>
              </button>
            </>
          ) : (
            <>
              {isDayActive ? (
                <MealThumbnail randomRecipe recipe={randomRecipe} />
              ) : (
                <p className={style.no_recipe}>{generateFunnyText()}</p>
              )}
              {!props.ready && (
                <div className={style.randomMenu}>
                  <button onClick={getBack} className={style.randomMenu__btn}>
                    <BsArrowUpLeftSquare size={30} />
                  </button>
                  <button
                    onClick={fetchMenuRecipes}
                    className={style.randomMenu__btn}
                  >
                    <BsDice3 size={30} />
                  </button>
                </div>
              )}
              
            </>
          )}
        </div>
        {!isDayActive && <hr className={style.cross} />}
      </div>
      <Modal title='dodaj przepis' closeModal={closeModal} isOpen={isModalOpen}>
        <AddRecipeModal setRecipe={setRecipeHandler} />
      </Modal>
    </>
  );
};

export default MenuCard;
