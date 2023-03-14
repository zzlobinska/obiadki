import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { MenusApi } from 'src/api';

import style from './MenusList.module.scss';

const MenusList = () => {
  const [menus, setMenus] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  // const version = useSelector((state: RootState) => state.recipesList.version);

  const fetchMenus = async (resetPage?: number) => {
    setIsLoading(true);
    const query = {
      pagination: {
        page: resetPage || page,
        pageSize: 8
      }
    };
    const { data } = await MenusApi.getMenus(query);
    setMenus(data.data);
    setIsLoading(false);
    return data.data;
  };

  useEffect(() => {
    setPage(1);
    fetchMenus(1);
  }, []);

  console.log(menus);
  return (
    <div className={style.list}>
      {menus.map((menu) => (
        <Link
          to={`/jadlospisy/${menu.id}`}
          className={style.menu}
          key={menu.id}
        >
          {menu.attributes.name}
          <BsSearch />
        </Link>
      ))}
    </div>
  );
};

export default MenusList;
