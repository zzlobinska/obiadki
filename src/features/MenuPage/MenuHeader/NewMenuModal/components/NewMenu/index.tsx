import { useState } from 'react';
import { BsFillReplyFill } from 'react-icons/bs';
import uuid from 'react-uuid';

import MenuCard from '../MenuCard';

import style from '../../NewMenuModal.module.scss';

type NewMenuProps = {
  dateArray: {
    date: Date;
    recipe: number | null;
    id: string;
    isDisabled: boolean;
  }[];
  goBack: () => void;
  onMealSelect?: (data: {
    date: Date;
    recipe: number;
    id: string;
    isDisabled: boolean;
  }) => void;
};

const NewMenu = ({ dateArray, goBack, onMealSelect }: NewMenuProps) => {
  return (
    <>
      <button onClick={goBack} className={style.back}>
        <BsFillReplyFill size={35} />
        <p className={style.back__txt}>Powrót</p>
      </button>
      {dateArray.map(({ date, id, isDisabled }) => (
        <MenuCard
          isDisabled={isDisabled}
          key={id}
          day={date}
          onMealSelect={onMealSelect}
          id={id}
        />
      ))}
    </>
  );
};

export default NewMenu;
