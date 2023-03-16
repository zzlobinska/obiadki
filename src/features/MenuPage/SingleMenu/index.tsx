import { useEffect, useRef, useState } from 'react';
import { BsArrowUpLeftSquare } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

import { Button } from 'components';

import { MenusApi } from 'src/api';
import { notifyApiError, notifySuccess } from 'src/components/layout/Toasts';

import MenuCard from '../MenuHeader/NewMenuModal/components/MenuCard';
import { changeVersion } from '../slice';

import style from './SingleMenu.module.scss';

const SingleMenu = () => {
  const [menu, setMenu] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const componentRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchMenu = async () => {
    if (id) {
      setIsLoading(true);
      const { data } = await MenusApi.getMenu(id);
      setMenu(data.data);
      setIsLoading(false);
      return data.data;
    } else {
      navigate('/jadlospisy');
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const deleteMenu = async () => {
    if (window.confirm('Czy na pewno chcesz usunąć jadłospis?')) {
      try {
        await MenusApi.deleteMenu(id);
        dispatch(changeVersion());
        notifySuccess(['Jadłospis został usunięty.']);
        navigate(-1);
      } catch (error) {
        notifyApiError(error);
      }
    }
  };

  return (
    <div className={style.main}>
      <div className={style.header}>
        <div className={style.left}>
          <button onClick={() => navigate(-1)} className={style.return}>
            <BsArrowUpLeftSquare size={40} />
          </button>
          <h2 className={style.title}>{menu?.attributes?.name}</h2>
        </div>
        <div className={style.btns}>
          <ReactToPrint
            trigger={() => <Button gray label='DRUKUJ' />}
            content={() => componentRef.current}
            bodyClass={style.print}
            documentTitle={menu?.attributes?.name}
          />

          <Button onClick={deleteMenu} label='USUŃ' />
        </div>
      </div>
      <div className={style.to_print} ref={componentRef}>
        <h2 className={style.printTitle}>Jadłospis {menu?.attributes?.name}</h2>
        {menu?.attributes?.days?.map((day: any) => (
          <MenuCard
            id={day.id}
            ready
            isDisabled={day.isDisabled}
            day={new Date(day.date)}
            key={day.date}
            recipe={day.recipe.data}
          />
        ))}
      </div>
    </div>
  );
};

export default SingleMenu;
