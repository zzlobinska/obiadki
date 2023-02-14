import React from 'react';
import classNames from 'classnames';

import PlusIcon from 'src/assets/icons/closeIcon.svg';

import style from './CloseButton.module.scss';

interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  onClick: () => void;
  darkBackground?: boolean;
  className?: string;
}

const CloseButton = React.forwardRef(
  (props: CloseButtonProps, ref: React.LegacyRef<HTMLButtonElement>) => {
    const { isOpen = false, className, darkBackground = true, ...rest } = props;

    const buttonClasses = classNames(style.btn, className, {
      [style.btn__darkBackground]: isOpen && darkBackground,
      [style.btn__open]: isOpen
    });

    return (
      <button
        ref={ref}
        className={buttonClasses}
        data-testid='close-button'
        {...rest}
      >
        <img src={PlusIcon} alt='Close icon' className={style.icon} />
      </button>
    );
  }
);

export default CloseButton;
