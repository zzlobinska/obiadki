import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import {
  Loader,
  useAppDispatch,
  useAppSelector,
  useIsMobile
} from 'components';
import RouteItem, {
  RouteItemData
} from 'components/layout/Sidebar/components/RouteItem';
import {
  closeMobileSidebar,
  closeSidebar,
  toggleSidebar
} from 'components/layout/Sidebar/slice';

import { ReactComponent as MenuIcon } from 'src/assets/icons/sidebar/menu.svg';
import { ReactComponent as StoreIcon } from 'src/assets/icons/sidebar/store.svg';

import style from './Sidebar.module.scss';

const topNavigation = [
  {
    title: 'Landing',
    url: '/',
    icon: <StoreIcon />,
    roles: []
  },
  {
    title: 'Lista komponentów',
    url: '/lib',
    icon: <StoreIcon />,
    roles: []
  }
];

const bottomNavigation = [
  {
    title: 'Wyloguj się',
    url: '/logout',
    icon: <StoreIcon />,
    roles: []
  }
];

const hideSidebarButton = {
  title: 'Zamknij panel',
  url: null,
  icon: <MenuIcon />,
  roles: []
};

const LOGO_LINK_PATHNAME = '/lib';

const Sidebar = () => {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const isMobileSidebarOpen = useAppSelector(
    (state) => state.sidebar.isMobileSidebarOpen
  );
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  const handleToggleSidebar = () => dispatch(toggleSidebar());

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isMobile && isMobileSidebarOpen) {
          dispatch(closeMobileSidebar());
        }
      }}
    >
      <div
        id={'main-sidebar'}
        className={cn(style.sidebar, {
          [style.isClose]: !isOpen && !isMobile,
          [style.mobile]: isMobile,
          [style.isMobileOpen]: isMobileSidebarOpen
        })}
      >
        <div className={style.logoWrapper}>
          <Link className={style.logo} to={LOGO_LINK_PATHNAME}>
            {isOpen ? <h3>Logo full</h3> : <h3>Lo</h3>}
          </Link>
        </div>
        <div className={style.menu}>
          {isLoading ? (
            <div className={style.loader}>
              <Loader />
            </div>
          ) : (
            topNavigation.map((item: RouteItemData, index) => (
              <RouteItem key={index} item={item} />
            ))
          )}
        </div>
        <div className={style.foot}>
          {bottomNavigation.map((item: RouteItemData, index) => (
            <RouteItem key={index} item={item} />
          ))}
          <span className={style.indicator} />
          <RouteItem item={hideSidebarButton} onClick={handleToggleSidebar} />
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Sidebar;
