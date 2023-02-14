import React from 'react';
import classNames from 'classnames';

import loaderGrey from 'assets/img/loaderContent.svg';

import style from './Loader.module.scss';

type LoaderProps = {
  className?: string;
  global?: boolean;
  contentIndicator?: boolean;
  prefix?: string;
  center?: boolean;
};

const Loader = (props: LoaderProps) => {
  const { contentIndicator, global, className, prefix } = props;

  const classes = classNames(style.loader, {
    [style.contentIndicator]: contentIndicator,
    [style.global]: global
  });

  return (
    <div className={classes} data-testid='loader'>
      {!!prefix && prefix}
      <img className={className} src={loaderGrey} alt='loader' />
    </div>
  );
};

export default Loader;
