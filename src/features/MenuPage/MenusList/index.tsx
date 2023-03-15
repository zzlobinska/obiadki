import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

import { MenusApi } from 'src/api';
import { Loader, useAppSelector } from 'src/components';
import EndMessage from 'src/components/layout/EndMessage';

import style from './MenusList.module.scss';

const MenusList = () => {
  const [menus, setMenus] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const version = useAppSelector((state) => state.menusList.version);

  const fetchMenus = async (resetPage?: number) => {
    setIsLoading(true);
    const query = {
      pagination: {
        page: resetPage || page,
        pageSize: 10
      }
    };
    const { data } = await MenusApi.getMenus(query);
    setMenus(data.data);
    setIsLoading(false);
    return data.data;
  };

  const getMoreMenus = async () => {
    setPage(page + 1);
    const menusFromServer = await fetchMenus(page + 1);
    setMenus([...menus, ...menusFromServer]);
    if (menusFromServer.length === 0) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchMenus(1);
    setHasMore(true);
  }, [version]);



  return (
    <>
      <InfiniteScroll
        dataLength={menus.length}
        next={getMoreMenus}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<EndMessage />}
      >
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
        {menus.length === 0 && !isLoading && (
          <p className={style.no_menus}>Brak jadłospisów :(</p>
        )}
      </InfiniteScroll>
    </>
  );
};

export default MenusList;
