import React from 'react';
import classnames from 'classnames';

import style from './SwitchButton.module.scss';

interface SwitchButtonProps {
  value: boolean;
  setValue: (value: boolean) => void;
  onClick?: (value?: boolean) => void;
  reverse?: boolean;
  wrapperStyle?: string;
  label?: string;
}

const SwitchButton = (props: SwitchButtonProps) => {
  const {
    value = true,
    setValue,
    onClick,
    reverse,
    wrapperStyle,
    label,
    ...rest
  } = props;

  const handleChange = () => {
    setValue(!value);

    if (onClick) {
      onClick(value);
    }
  };

  const wrapperClasses = classnames(wrapperStyle, {
    [style.withLabel]: !!label,
    [style.reverse]: reverse
  });

  return (
    <div className={wrapperClasses}>
      {!!label && <label>{label}</label>}
      <button
        onClick={handleChange}
        className={classnames(style.container, {
          [style.off]: !value
        })}
        {...rest}
      >
        <span className={classnames(style.switch, { [style.off]: !value })} />
      </button>
    </div>
  );
};

export default SwitchButton;
