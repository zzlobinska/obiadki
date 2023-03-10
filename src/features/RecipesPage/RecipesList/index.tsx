import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { RecipesApi } from 'src/api';
import { Loader } from 'src/components';
import EndMessage from 'src/components/layout/EndMessage';
import MealThumbnail from 'src/components/layout/MealThumbnail';
import { RootState } from 'src/store';

import style from './RecipesList.module.scss';

const RecipesList = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const version = useSelector((state: RootState) => state.recipesList.version);

  const fetchRecipes = async () => {
    setIsLoading(true);
    const query = {
      pagination: {
        page,
        pageSize: 10
      }
    };
    const { data } = await RecipesApi.getRecipes(query);
    setRecipes(data.data);
    setIsLoading(false);
    return data.data;
  };

  const getMorePost = async () => {
    setPage(page + 1);
    const recipesFromServer = await fetchRecipes();
    setRecipes([...recipes, ...recipesFromServer]);
    if (recipesFromServer.length === 0 || recipesFromServer.length < 20) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [version]);

  return (
    <>
      <InfiniteScroll
        dataLength={recipes.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<EndMessage />}
      >
        <div className={style.recipes}>
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              <MealThumbnail recipe={{ ...recipe, ...recipe.attributes }} />
            </div>
          ))}
        </div>
        {recipes.length === 0 && !isLoading && (
          <p className={style.no_recipes}>Brak przepisów.</p>
        )}
      </InfiniteScroll>
      {isLoading && <Loader />}
    </>
  );
};

export default RecipesList;
