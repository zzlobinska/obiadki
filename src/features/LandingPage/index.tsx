import React from 'react';
import { useTranslation } from 'react-i18next';

import style from './Landing.module.scss';

const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <h1>{t('common:helloWorld')}</h1>
    </div>
  );
};

export default Landing;
