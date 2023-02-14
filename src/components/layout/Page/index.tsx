import React from 'react';
import { Outlet } from 'react-router-dom';
import cn from 'classnames';

import { Sidebar, useAppSelector } from 'components';

import style from './Page.module.scss';

const Page = () => {
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);

  const containerClasses = cn(style.container, {
    [style.isSidebarClose]: !isSidebarOpen
  });

  return (
    <div className={containerClasses}>
      <Sidebar />
      <div className={style.page}>
        <div className={style.inner}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Page;
