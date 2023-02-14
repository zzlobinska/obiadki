import React, { useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';

import dictionary from 'src/dictionaries/validator.json';
import {
  checkLink,
  checkNip,
  correctBankNumber,
  correctPesel
} from 'src/utils/helpers';

const useValidator = (
  // eslint-disable-next-line unicorn/no-object-as-default-parameter
  options = {
    messages: {},
    validators: {}
  }
) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState(<any | null>{}), []);
  const validator = useRef(
    new SimpleReactValidator({
      ...options,
      messages: {
        email: dictionary.email,
        integer: dictionary.integer,
        max: 'Liczba ta nie może przekroczyć :max:type',
        min: 'Liczba ta nie może być mniejsza niż :min:type',
        numeric: dictionary.numeric,
        accepted: dictionary.accepted,
        required: dictionary.required,
        phone: dictionary.phone,
        url: dictionary.url,
        in: dictionary.repeatPassword,
        ...options.messages
      },
      validators: {
        min_password: {
          message: dictionary.min_password,
          rule: (value: string | any[]) => !!value && value.length >= 8
        },
        register_password: {
          message: '',
          rule: (value: string | any) =>
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!"#$%&'()*+;?@[\]^_`{}~£€-]).{8,}$/.test(
              value
            )
        },
        bank_number: {
          message: dictionary.bank_number,
          rule: correctBankNumber
        },
        pesel: {
          message: dictionary.pesel,
          rule: correctPesel
        },
        broker_number: {
          message: 'Numer rachunku maklerskiego jest za długi.',
          rule: (value: string | any[]) => !!value && value.length <= 60
        },
        acceptOneOfTwo: {
          message: 'You must select one of the following conditions',
          rule: (value: string | null) => !!value
        },
        facebook: {
          message: dictionary.facebook,
          rule: checkLink('facebook')
        },
        linkedin: {
          message: dictionary.linkedin,
          rule: checkLink('linkedin')
        },
        twitter: {
          message: dictionary.twitter,
          rule: checkLink('twitter')
        },
        zip_code: {
          message: dictionary.zipCode,
          rule: (value: string | any[]) =>
            !!(value && value.length >= 4 && value.length <= 20)
        },
        nip: {
          message: dictionary.nip,
          rule: checkNip
        },
        true: {
          message: dictionary.required,
          rule: (value: string) => value === 'true'
        },
        someValueSelected: {
          message: dictionary.someValueSelected,
          rule: (value: string) => !!value
        },
        ...options.validators
      },
      autoForceUpdate: { forceUpdate }
    })
  );

  return validator.current;
};

export default useValidator;
