import React, { Dispatch, SetStateAction } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';
import SimpleReactValidator from 'simple-react-validator';

import InputWrapper, {
  getWrapperProps,
  InnerWrapperProps
} from 'src/components/layout/InputWrapper';

import style from './Textarea.module.scss';

interface TextareaProps extends InnerWrapperProps {
  id?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  onChange?: Dispatch<SetStateAction<string>>;
  isCounting?: boolean;
  validator?: SimpleReactValidator;
  rule?: string;
  label?: string;
  hideLabel?: boolean;
  wrapperStyle?: string;
}

const Textarea = (props: TextareaProps) => {
  const wrapperProps = getWrapperProps(props);
  const {
    className,
    maxLength = 1000,
    placeholder,
    value,
    onChange,
    isCounting = false,
    validator,
    rule,
    label,
    hideLabel,
    wrapperStyle,
    id,
    ...rest
  } = props;

  const onChangeProxy = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const classes = classNames(style.textarea, className, {
    [style.error]: wrapperProps.hasError
  });

  return (
    <InputWrapper
      validator={validator}
      rule={rule}
      errorMessage={wrapperProps.errorMessage}
      label={label}
      id={id}
      hideLabel={hideLabel}
      wrapperStyle={wrapperStyle}
    >
      <div className={style.wrapperArea}>
        <TextareaAutosize
          className={classes}
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          onChange={onChangeProxy}
          {...rest}
        />
        {isCounting && (
          <p className={style.counter}>
            {value?.length} / {maxLength}
          </p>
        )}
      </div>
    </InputWrapper>
  );
};

export default Textarea;
