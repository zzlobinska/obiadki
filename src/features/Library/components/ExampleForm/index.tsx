import React, { FormEvent, useState } from 'react';

import { Button, Input, useValidator } from 'components';

type ExampleFormProps = {};

const ExampleForm = (props: ExampleFormProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const validator = useValidator();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validator.allValid()) {
      validator.showMessages();
    }

    // do something with data...
  };

  return (
    <form
      style={{ display: 'flex', gap: '24px', alignItems: 'flex-end ' }}
      onSubmit={handleSubmit}
    >
      <Input
        label={'Imię i nazwisko'}
        value={name}
        onChangeText={setName}
        validator={validator}
        rule={'required'}
      />
      <Input
        label={'E-mail'}
        value={email}
        onChangeText={setEmail}
        validator={validator}
        rule={'required|email'}
      />
      <Button label={'wyślij'} />
    </form>
  );
};

export default ExampleForm;
