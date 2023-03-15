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
import MealThumbnail from 'src/components/layout/MealThumbnail';
import { RecipeType } from 'src/features/RecipesPage/RecipeDetailModal';

import style from './MenuCard.module.scss';

type MenuCardProps = {
  day: Date;
  key: string;
  ready?: boolean;
  recipe?: any;
  onMealSelect?: (data: { date: Date; recipe: number; id: string }) => void;
  id: string;
};

const getFormattedRecipe = (recipe: any) => ({
  ...recipe,
  ...recipe?.attributes
});

const MenuCard = (props: MenuCardProps) => {
  console.log(props.recipe);
  const [isDayActive, setIsDayActive] = useState<boolean>(true);
  const [randomRecipe, setRandomRecipe] = useState<RecipeType | null>(
    props.ready && getFormattedRecipe(props.recipe)
  );

  const disableDay = () => {
    setIsDayActive((prev) => !prev);
    getBack();
  };

  const disabledTextClass = classNames(style.generator__txt, {});
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
    setRandomRecipe({
      ...recipeData.data[0],
      ...recipeData.data[0].attributes
    });
  };

  useEffect(() => {
    if (randomRecipe && props.onMealSelect) {
      props.onMealSelect({
        date: props.day,
        recipe: randomRecipe.id,
        id: props.id
      });
    }
  }, [randomRecipe]);

  const getBack = () => {
    setRandomRecipe(null);
  };

  console.log('randomRecipe', randomRecipe);

  return (
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
      <div className={style.generator}>
        {!randomRecipe ? (
          <>
            <button disabled={!isDayActive} className={disabledBtnClass}>
              <BsPlusSquare size={35} />
              <p className={disabledTextClass}>dodaj</p>
            </button>
            <button
              onClick={fetchMenuRecipes}
              disabled={!isDayActive}
              className={disabledBtnClass}
            >
              <BsDice3 size={35} />
              <p className={disabledTextClass}>losuj</p>
            </button>
          </>
        ) : (
          <>
            <MealThumbnail randomRecipe recipe={randomRecipe} />
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
  );
};

export default MenuCard;
