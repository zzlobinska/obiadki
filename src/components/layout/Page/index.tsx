import React from 'react';
import { Outlet } from 'react-router-dom';
import cn from 'classnames';

import { Header, useAppSelector } from 'components';

import style from './Page.module.scss';

const Page = () => {
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);

  const containerClasses = cn(style.container, {
    [style.isSidebarClose]: !isSidebarOpen
  });

  return (
    <>
      <Header/>
      <div className={style.page}>
        <div className={style.inner}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Page;
