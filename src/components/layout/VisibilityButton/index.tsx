import React from 'react';

// import visibility from 'src/assets/icons/visibility.svg';
// import visibilityOff from 'src/assets/icons/visibility-off.svg';
import style from './VisabilityBUtton.module.scss';

type VisibilityButtonProps = {
  isVisible: boolean;
  onChange: (visibility: boolean) => void;
};

const VisibilityButton = (props: VisibilityButtonProps) => {
  const { isVisible, onChange } = props;
  return (
    <button
      type='button'
      onClick={(e: React.FormEvent) => {
        e.preventDefault();
        onChange(!isVisible);
      }}
      className={style.visibilityButton}
    >
      {/* {isVisible ? (
        <img src={visibility} alt='hide password' />
      ) : (
        <img src={visibilityOff} alt='show password' />
      )} */}
    </button>
  );
};

export default VisibilityButton;
