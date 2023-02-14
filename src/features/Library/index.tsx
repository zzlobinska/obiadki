import React from 'react';

import Sidebar from 'components/layout/Sidebar';

import ComponentsList from 'features/Library/components/ComponentsList';

import style from './Library.module.scss';

const Library = () => {
  return (
    <div className={style.page}>
      <Sidebar />
      <div className={style.container}>
        <h1 style={{ marginBottom: '50px' }}>Lista komponentów:</h1>
        <ComponentsList />
      </div>
    </div>
  );
};

export default Library;
