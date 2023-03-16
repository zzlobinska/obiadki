import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RecipesApi } from 'src/api';
import { Button } from 'src/components';
import { getFormattedRecipe } from 'src/features/MenuPage/MenuHeader/NewMenuModal/components/MenuCard';

import RecipeDetailModal from '../RecipeDetailModal';

import style from './SingleRecipePage.module.scss';

const SingleRecipePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<any>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchRecipe = async () => {
    if (id) {
      setIsLoading(true);
      const { data } = await RecipesApi.getRecipe(id);
      setRecipe(getFormattedRecipe(data.data));
      setIsLoading(false);
      return data.data;
    } else {
      navigate('/przepisy');
    }
  };

  useEffect(() => {
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
    </div>
  );
};

export default SingleRecipePage;
