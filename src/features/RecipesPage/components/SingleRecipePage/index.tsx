import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RecipesApi } from 'src/api';
import { Button, Loader } from 'src/components';
import { notifyApiError } from 'src/components/layout/Toasts';
import { RecipeType } from 'src/constans/types';
import { getFullRecipe } from 'src/utils/helpers';

import RecipeDetailModal from '../RecipeDetailModal';

import style from './SingleRecipePage.module.scss';

const SingleRecipePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<RecipeType>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const { data } = await RecipesApi.getRecipe(id);
          setRecipe(getFullRecipe(data.data));
          return data.data;
        } catch (error) {
          notifyApiError(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        navigate('/przepisy');
      }
    };
    fetchRecipe();
  }, []);

  if (!recipe) {
    return null;
  }

  return (
    <div className={style.content}>
      <Button
        onClick={() => navigate('/przepisy')}
        className={style.back}
        label='WRÓĆ'
      />
      <RecipeDetailModal single recipe={recipe} />
      {isLoading && <Loader />}
    </div>
  );
};

export default SingleRecipePage;
