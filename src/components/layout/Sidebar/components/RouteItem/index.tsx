import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import classnames from 'classnames';

import { useAppSelector, useAuthUser } from 'components';

import style from './RouteItem.module.scss';

export type RouteItemData = {
  title: string;
  url: string | null;
  roles: string[];
  icon?: null | React.ReactNode;
};

export interface RouteItemProps {
  item: RouteItemData;
  onClick?: () => {};
  className?: string;
}

const RouteItem = (props: RouteItemProps) => {
  const { className, onClick, item } = props;
  const { url, icon, title, roles } = item;

  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);
  const user = useAuthUser();

  if (roles.length > 0 && (!user?.role || !roles?.includes(user.role))) {
    return null;
  }

  if (!url) {
    return (
      <button
        className={classnames(style.link, style.button)}
        onClick={onClick}
        id={'button-' + title}
      >
        {icon}
        {isSidebarOpen && title}
      </button>
    );
  }

  return (
    <NavLink
      className={({ isActive }) =>
        cn(style.link, className, {
          [style.isClose]: !isSidebarOpen,
          [style.active]: isActive
        })
      }
      to={url}
      onClick={onClick}
      id={url.slice(1, url.length)}
    >
      {icon}
      {isSidebarOpen && title}
    </NavLink>
  );
};

export default RouteItem;
