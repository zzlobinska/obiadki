import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CategoriesApi } from 'src/api';
import { InputSelect } from 'src/components';
import { CategoryType } from 'src/features/RecipesPage/RecipeDetailModal';

import style from './FilterByCategory.module.scss';

const getDefaultCategory = (cat?: string | null) => {
  if (cat) {
    return {
      label: cat,
      value: cat
    };
  }
};
const FilterByCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const [searchedValue, setSearchedValue] = useState<any>(
    getDefaultCategory(searchParams.get('category')) || ''
  );
  const [categoriesList, setCategoriesList] = useState<CategoryType[]>([]);

  const filterHandler = (cat: object) => {
    setSearchedValue(cat);
  };

  const getFormattedCategories = (cats: any[]) => {
    const filteredCats = cats.filter(
      (cat: CategoryType) => cat.attributes.parent.data
    );
    return filteredCats.map((cat) => ({
      label: cat.attributes.name,
      value: cat.id,
      ...cat.attributes
    }));
  };

  const fetchCategories = async () => {
    const { data } = await CategoriesApi.getCategories({});
    setCategoriesList(getFormattedCategories(data.data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);


 

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchedValue) {
        searchParams.set('category', searchedValue.label);
        setSearchParams(searchParams);
      } else {
        searchParams.delete('category');
        setSearchParams(searchParams);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchedValue]);

  return (
    <div className={style.categories}>
      <InputSelect
        isClearable
        placeholder='Wybierz...'
        onChange={filterHandler}
        value={searchedValue}
        options={categoriesList}
      />
    </div>
  );
};

export default FilterByCategory;
