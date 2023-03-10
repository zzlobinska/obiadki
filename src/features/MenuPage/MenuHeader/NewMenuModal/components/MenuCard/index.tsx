import { useEffect, useState } from 'react';
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
};

const MenuCard = (props: MenuCardProps) => {
  const [isDayActive, setIsDayActive] = useState<boolean>(true);
  const [menuRecipes, setMenuRecipes] = useState<RecipeType[]>([]);
  const [randomRecipe, setRandomRecipe] = useState<RecipeType>();
  const disableDay = () => {
    setIsDayActive((prev) => !prev);
  };
  const disabledTextClass = classNames(style.generator__txt, {
    [style.disabled]: !isDayActive
  });
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
    setMenuRecipes(data.data);
    const randomRecipeNumber = Math.floor(Math.random() * recipesTotal);

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

    console.log(recipeData.data[0]);

    console.log(randomRecipe);
  };

  return (
    <div className={style.row}>
      <div className={style.date}>
        <button onClick={disableDay} className={style.date__btn}>
          {isDayActive && <BsXSquare size={20} />}
          {!isDayActive && <BsArrowUpLeftSquare size={20} />}
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
            <div className={style.randomMenu}>
              <button className={style.randomMenu__btn}>
                <BsArrowUpLeftSquare size={30} />
              </button>
              <button
                onClick={fetchMenuRecipes}
                className={style.randomMenu__btn}
              >
                <BsDice3 size={30} />
              </button>
            </div>
          </>
        )}
      </div>
      {!isDayActive && <hr className={style.cross} />}
    </div>
  );
};

export default MenuCard;
