import { useEffect, useState } from 'react';
import { MeiliSearch } from 'meilisearch';

import { Button, InputSelect, Modal } from 'src/components';
import FilterByCategory from 'src/components/layout/FilterByCategory';
import Searchbar from 'src/components/layout/Searchbar';

import NewRecipeModal from '../NewRecipeModal';

import style from './RecipesHeader.module.scss';

const RecipesHeader = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const closeModal = () => {
    setIsModalActive(false);
  };
  const openModal = () => {
    setIsModalActive(true);
  };

  return (
    <header className={style.header}>
      <FilterByCategory />
      <Searchbar />
      <div className={style.add_recipe}>
        <Button
          onClick={openModal}
          className={style.btn}
          label='dodaj przepis'
        />
      </div>
      <Modal
        title='Nowy Przepis'
        closeModal={closeModal}
        isOpen={isModalActive}
      >
        <NewRecipeModal closeModal={closeModal} isModalActive={isModalActive} />
      </Modal>
    </header>
  );
};

export default RecipesHeader;
