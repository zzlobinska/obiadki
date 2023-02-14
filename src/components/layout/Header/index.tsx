import React from 'react';

import style from './Header.module.scss';

type HeaderProps = {}

const Header = (props: HeaderProps) => {
  return (
    <div className={style.container}>
      Header
    </div>
  );
};

export default Header;