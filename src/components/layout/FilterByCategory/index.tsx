import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CategoriesApi } from 'src/api';
import { InputSelect } from 'src/components';
import { FormattedCategoryType, ServerCategoryType } from 'src/constans/types';
import { getDefaultCategory } from 'src/utils/helpers';

import style from './FilterByCategory.module.scss';

type SingleCatType = { label: string; value: string };

const FilterByCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const [searchedValue, setSearchedValue] = useState<SingleCatType | null>(
    getDefaultCategory(searchParams.get('category')) || null
  );
  const [categoriesList, setCategoriesList] = useState<
    ServerCategoryType[] | FormattedCategoryType[]
  >([]);

  const filterHandler = (cat: SingleCatType) => {
    setSearchedValue(cat);
  };

  const getFormattedCategories = (cats: ServerCategoryType[]) => {
    const filteredCats = cats.filter(
      (cat: ServerCategoryType) => cat.attributes.parent.data
    );
    return filteredCats.map((cat) => ({
      label: cat.attributes.name,
      value: cat.id,
      ...cat.attributes
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await CategoriesApi.getCategories({});
      setCategoriesList(getFormattedCategories(data.data));
    };
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
  }, [searchedValue, searchParams, setSearchParams]);

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
