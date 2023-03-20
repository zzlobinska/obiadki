import React, { useEffect, useMemo, useState } from 'react';
import {
  BsFillClockFill,
  BsFillPeopleFill,
  BsFillPlusSquareFill
} from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';

import { CategoriesApi, RecipesApi } from 'src/api';
import { Button, Input, Textarea, useValidator } from 'src/components';
import Multiselect from 'src/components/layout/Multiselect';
import { notifyDanger, notifySuccess } from 'src/components/layout/Toasts';
import {
  IngridientType,
  RecipeType,
  SelectedCategoryType,
  ServerCategoryType
} from 'src/constans/types';

import { changeVersion } from '../../slice';
import Ingredient from '../Ingredient';

import style from './NewRecipeModal.module.scss';

type NewRecipeModalProps = {
  closeModal: () => void;
  isModalActive: boolean;
  recipe?: RecipeType;
  editRecipe?: boolean;
};

const getCategories = (recipe?: RecipeType) => {
  return recipe?.categories?.data?.map((cat) => ({
    label: cat.attributes.name,
    value: cat.id,
    ...cat
  }));
};

const getIngridients = (recipe?: RecipeType) => {
  return recipe?.ingredients.map((ingredient) => ({
    quantity: ingredient.ingredient_quantity,
    name: ingredient.ingredient_name,
    id: ingredient.id,
    unit: {
      label: ingredient.ingredient_unit,
      value: ingredient.ingredient_unit
    }
  }));
};

const NewRecipeModal = ({
  recipe,
  closeModal,
  editRecipe
}: NewRecipeModalProps) => {
  const [file, setFile] = useState<string>(recipe?.thumbnail || '');
  const [ingridientsList, setIngridientsList] = useState<IngridientType[]>(
    getIngridients(recipe) || []
  );
  const [description, setDescription] = useState<string>(
    recipe?.description || ''
  );
  const [title, setTitle] = useState<string>(recipe?.title || '');
  const [portionNumber, setPortionNumber] = useState<number | string>(
    recipe?.portion_number || ''
  );
  const [prepareTime, setPrepareTime] = useState<string>(
    recipe?.prepare_time || ''
  );
  const [categoriesList, setCategoriesList] = useState<ServerCategoryType[]>(
    []
  );

  const [selectedCategories, setSelectedCategories] = useState<
    SelectedCategoryType[]
  >(getCategories(recipe) || []);

  const dispatch = useDispatch();

  const addIngridient = () => {
    const newIngridient = {
      quantity: undefined,
      name: '',
      unit: null,
      id: uuid()
    };

    setIngridientsList((prev) => [...prev, newIngridient]);
  };

  const changeIngredientHandler = (ingredient: IngridientType) => {
    setIngridientsList((prev) =>
      prev.map((ing) => {
        return ing.id === ingredient.id ? ingredient : ing;
      })
    );
  };

  const addRecipe = async () => {
    if (ingridientsList.length === 0) {
      notifyDanger(['Musisz dodać składnik.']);

      return;
    }
    if (!validator.allValid()) {
      validator.showMessages();
      return;
    }

    try {
      const queryData = {
        data: {
          description: description,
          portion_number: +portionNumber,
          prepare_time: prepareTime,
          thumbnail: file,
          title: title,
          ingredients: ingridientsList.map((ingridient) => ({
            ingredient_name: ingridient.name,
            ingredient_quantity: ingridient.quantity,
            ingredient_unit: ingridient.unit?.label
          })),
          categories: selectedCategories
        }
      };
      if (recipe?.id) {
        await RecipesApi.putRecipe(recipe.id, queryData);
      } else {
        await RecipesApi.postRecipe(queryData);
        notifySuccess(['Przepis został dodany.']);
      }

      dispatch(changeVersion());

      closeModal();
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const validator = useValidator();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await CategoriesApi.getCategories({});
      setCategoriesList(
        data.data.filter(
          (cat: ServerCategoryType) => cat.attributes.parent.data
        )
      );
    };
    fetchCategories();
  }, []);

  const options = useMemo(
    () =>
      categoriesList.map((cat) => ({
        ...cat,
        label: cat.attributes.name,
        value: cat.id
      })),
    [categoriesList]
  );
  return (
    <div className={style.content}>
      <div className={style.main}>
        <div className={style.name}>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            label='Nazwa'
            value={title}
            validator={validator}
            rule={'required'}
            id='title'
          />
          <Input
            label='Link do zdjęcia'
            onChange={(e) => setFile(e.target.value)}
            value={file}
            id='file'
            validator={validator}
            rule={'required'}
          />
        </div>
        <div className={style.details}>
          <div className={style.wrapper}>
            <BsFillPeopleFill size={40} />
            <Input
              onChange={(e) => setPortionNumber(e.target.value)}
              value={portionNumber}
            />
          </div>
          <div className={style.wrapper}>
            <BsFillClockFill size={40} />
            <Input
              onChange={(e) => setPrepareTime(e.target.value)}
              value={prepareTime}
              id='prepare_time'
              validator={validator}
              rule={'required'}
            />
          </div>
        </div>
        <Multiselect
          label='Kategorie'
          value={selectedCategories}
          onChange={setSelectedCategories}
          options={options}
        />
      </div>
      <div className={style.add}>
        <button onClick={addIngridient} className={style.ingridients_btn}>
          <p>Dodaj składnik</p>
          <BsFillPlusSquareFill size={25} />
        </button>
      </div>
      {ingridientsList.map((ingridient) => (
        <Ingredient
          setIngridientsList={setIngridientsList}
          key={ingridient.id}
          ingridient={ingridient}
          changeIngredientHandler={changeIngredientHandler}
          validator={validator}
          rule={'required'}
        />
      ))}
      <Textarea
        onChange={setDescription}
        value={description}
        label='Przepis'
        id='description'
        validator={validator}
        rule={'required'}
      />
      <Button onClick={addRecipe} label={editRecipe ? 'Zapisz' : 'Dodaj'} />
    </div>
  );
};

export default NewRecipeModal;
