import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import spinner from 'src/assets/img/loaderContent.svg';

import style from './Button.module.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  to?: string;
  isLoading?: boolean;
  disabled?: boolean;
  empty?: boolean;
  gray?: boolean;
  white?: boolean;
  className?: string;
  icon?: string;
  id?: string;
  height?: string;
  width?: string;
  reverse?: boolean;
};

const ButtonWrapper: React.FC<ButtonProps> = (props) => {
  const {
    children,
    to,
    onClick,
    className,
    height,
    width,
    type,
    isLoading = false,
    disabled = false,
    gray = false,
    white = false,
    empty = false,
    form,
    id,
    title
  } = props;
  const buttonClasses = classNames(style.button, className, {
    [style.disabled]: disabled,
    [style.isLoading]: isLoading,
    [style.empty]: empty,
    [style.gray]: gray,
    [style.white]: white
  });

  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (!onClick) {
      return;
    } else if (!disabled || isLoading) {
      onClick(e);
    }
  };

  return to ? (
    <Link
      className={buttonClasses}
      style={{ height, width }}
      onClick={handleOnClick}
      to={to}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={handleOnClick}
      className={buttonClasses}
      style={{ height, width }}
      type={type}
      disabled={disabled}
      id={id}
      form={form}
      title={title}
    >
      {children}
    </button>
  );
};

const Button = (props: ButtonProps) => {
  const { label, isLoading = false, icon, reverse = false } = props;

  const content = (
    <div
      className={classNames(style.wrapper, {
        [style.hidden]: isLoading,
        [style.reverse]: reverse
      })}
    >
      <span>{label}</span>
      {icon && <img src={icon} alt={'button icon'} className={style.icon} />}
    </div>
  );

  return (
    <ButtonWrapper {...props}>
      <div className={style.inner}>
        {isLoading && (
          <img className={style.loader} src={spinner} alt='loading' />
        )}
        {content}
      </div>
    </ButtonWrapper>
  );
};

export default Button;
