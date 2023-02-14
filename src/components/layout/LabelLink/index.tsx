import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import style from './LabelLink.module.scss';

type LabelLinkProps = {
  label?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  labelStyle?: string;
  color?: boolean;
  light?: boolean;
  icon?: string;
  fontSize?: number;
  href?: string;
  targetBlank?: boolean;
};

const LabelLink = (props: LabelLinkProps) => {
  const {
    label,
    to,
    onClick,
    className,
    labelStyle,
    color,
    light,
    icon,
    fontSize,
    href,
    targetBlank,
    ...rest
  } = props;

  const linkProps = targetBlank
    ? {
        target: '_blank',
        rel: 'noreferrer'
      }
    : {};

  const classes = classNames(style.link, className, {
    [style.link__color]: color,
    [style.link__light]: light,
    [style.icon]: icon
  });

  const name = (
    <span className={to ? undefined : classes} onClick={onClick} {...rest}>
      {icon && <img className={style.img} src={icon} alt={'icon'} />}
      <span className={labelStyle} style={{ fontSize }}>
        {label}
      </span>
    </span>
  );

  return to ? (
    <Link to={to} className={classes} {...rest}>
      {name}
    </Link>
  ) : href ? (
    <a href={href} className={classes} {...linkProps} {...rest}>
      {name}
    </a>
  ) : (
    name
  );
};

export default LabelLink;
