import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { RecipesApi } from 'src/api';
import { Loader } from 'src/components';
import EndMessage from 'src/components/layout/EndMessage';
import MealThumbnail from 'src/components/layout/MealThumbnail';
import MealThumbnailInModal from 'src/components/layout/MealThumbnailInModal';
import { RootState } from 'src/store';

import style from './RecipesList.module.scss';

type RecipesListProps = {
  inModal?: boolean;
  setRecipe?: any;
};

const RecipesList = ({ inModal, setRecipe }: RecipesListProps) => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const version = useSelector((state: RootState) => state.recipesList.version);

  const fetchRecipes = async (resetPage?: number) => {
    setIsLoading(true);
    const query = {
      pagination: {
        page: resetPage || page,
        pageSize: 8
      },
      filters: {
        title: {
          $contains: searchParams.get('search')
        },
        categories: {
          name: {
            $contains: searchParams.get('category')
          }
        }
      }
    };
    const { data } = await RecipesApi.getRecipes(query);
    setRecipes(data.data);
    setIsLoading(false);
    return data.data;
  };

  const getMorePost = async () => {
    setPage(page + 1);
    const recipesFromServer = await fetchRecipes(page + 1);
    setRecipes([...recipes, ...recipesFromServer]);
    if (recipesFromServer.length === 0) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchRecipes(1);
    setHasMore(true);
  }, [version, searchParams]);

  return (
    <>
      <InfiniteScroll
        dataLength={recipes.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<EndMessage />}
      >
        <div
          className={classNames(style.recipes, {
            [style.inModal]: inModal
          })}
        >
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              {inModal ? (
                <MealThumbnailInModal
                  recipe={{ ...recipe, ...recipe.attributes }}
                  setRecipe={setRecipe}
                />
              ) : (
                <MealThumbnail recipe={{ ...recipe, ...recipe.attributes }} />
              )}
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
