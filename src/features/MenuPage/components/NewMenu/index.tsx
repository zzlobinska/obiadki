import { BsFillReplyFill } from 'react-icons/bs';

import { selectedDateType } from 'src/constans/types';

import MenuCard from '../MenuCard';

import style from '../NewMenuModal/NewMenuModal.module.scss';

type NewMenuProps = {
  dateArray: selectedDateType[];
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
