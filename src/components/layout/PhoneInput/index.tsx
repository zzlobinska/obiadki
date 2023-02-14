import React from 'react';
import Input from 'react-phone-number-input';
import classNames from 'classnames';

import InputWrapper, {
  getWrapperProps,
  InnerWrapperProps
} from 'components/layout/InputWrapper';

import 'react-phone-number-input/style.css';
import style from './PhoneInput.module.scss';

interface PhoneInputProps extends InnerWrapperProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const PhoneInput = (props: PhoneInputProps) => {
  const { value, onChange, disabled, ...rest } = props;
  const wrapperProps = getWrapperProps(props);

  return (
    <InputWrapper {...wrapperProps}>
      <Input
        addInternationalOption={false}
        value={value}
        onChange={onChange}
        defaultCountry={'PL'}
        placeholder={'Numer telefonu'}
        disabled={disabled}
        limitMaxLength
        className={classNames(style.phoneFormatter, {
          [style.error]: wrapperProps.hasError
        })}
        {...rest}
      />
    </InputWrapper>
  );
};

export default PhoneInput;
