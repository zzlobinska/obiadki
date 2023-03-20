import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';

import { Input } from 'src/components';

import style from './Searchbar.module.scss';

const Searchbar = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const [searchedValue, setSearchedValue] = useState<string>(
    searchParams.get('search') || ''
  );

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchedValue) {
        searchParams.set('search', searchedValue);
        setSearchParams(searchParams);
      } else {
        searchParams.delete('search');
        setSearchParams(searchParams);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchedValue]);

  return (
    <div className={style.searchbar}>
      <Input
        wrapperStyle={style.select}
        placeholder='Szukaj...'
        onChange={searchHandler}
        value={searchedValue}
      />
      <BsSearch className={style.searchbar_icon} />
    </div>
  );
};

export default Searchbar;
