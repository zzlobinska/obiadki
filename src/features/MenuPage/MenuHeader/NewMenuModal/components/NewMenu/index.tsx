import { BsFillReplyFill } from 'react-icons/bs';
import uuid from 'react-uuid';

import MenuCard from '../MenuCard';

import style from '../../NewMenuModal.module.scss';

type NewMenuProps = {
  dateArray: Date[];
  goBack: () => void;
};

const NewMenu = ({ dateArray, goBack }: NewMenuProps) => {
  return (
    <>
      <button onClick={goBack} className={style.back}>
        <BsFillReplyFill size={35} />
        <p className={style.back__txt}>Powrót</p>
      </button>
      {dateArray.map((date) => (
        <MenuCard key={uuid()} day={date} />
      ))}
    </>
  );
};

export default NewMenu;
