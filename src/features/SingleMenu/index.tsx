import { useEffect, useState } from 'react';
import { BsArrowUpLeftSquare } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { redirect, useParams } from 'react-router-dom';

import { MenusApi, RecipesApi } from 'src/api';

import MenuCard from '../MenuPage/MenuHeader/NewMenuModal/components/MenuCard';

import style from './SingleMenu.module.scss';

const SingleMenu = () => {
  const [menu, setMenu] = useState<any>();
  const [recipe, setRecipe] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();

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

  console.log(menu?.attributes?.days);

  return (
    <div className={style.main}>
      <div className={style.header}>
        <h2 className={style.title}>{menu?.attributes?.name}</h2>
        <button onClick={() => navigate(-1)} className={style.return}>
          <BsArrowUpLeftSquare size={40} />
        </button>
      </div>
      {menu?.attributes?.days?.map((day: any) => (
        <MenuCard
          ready
          day={new Date(day.date)}
          key={day.date}
          recipe={day.recipe.data}
        />
      ))}
    </div>
  );
};

export default SingleMenu;
