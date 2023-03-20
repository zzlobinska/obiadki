import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'src/components';

import style from './Landing.module.scss';

import arrow from '../../assets/img/arrow.png';

const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.cta}>
          <p className={style.text}>Ugotujmy coś!</p>
          <Link to='/przepisy'>
            <Button className={style.btn} label='start' />
          </Link>
        </div>
        <img className={style.arrow} alt='an arrow' src={arrow} />
      </div>
    </div>
  );
};

export default Landing;
