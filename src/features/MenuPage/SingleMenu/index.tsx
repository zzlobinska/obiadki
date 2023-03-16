import { useEffect, useState } from 'react';
import { BsArrowUpLeftSquare } from 'react-icons/bs';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { redirect, useParams } from 'react-router-dom';

import { Button } from 'components';

import { MenusApi, RecipesApi } from 'src/api';
import { notifyApiError, notifySuccess } from 'src/components/layout/Toasts';

import MenuCard from '../MenuHeader/NewMenuModal/components/MenuCard';
import { changeVersion } from '../slice';

import style from './SingleMenu.module.scss';

const SingleMenu = () => {
  const [menu, setMenu] = useState<any>();
  const [recipe, setRecipe] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        <Button onClick={deleteMenu} label='USUŃ' />
      </div>
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
  );
};

export default SingleMenu;
