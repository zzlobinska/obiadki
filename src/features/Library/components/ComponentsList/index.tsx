import React, { useState } from 'react';

import {
  Button,
  Card,
  Checkbox,
  CloseButton,
  FileUploader,
  Input,
  InputRadio,
  InputSelect,
  LabelLink,
  Loader,
  Modal,
  PhoneInput,
  SwitchButton,
  Textarea
} from 'components';
import AsyncSelect from 'components/layout/AsyncSelect';
import { notifyCommon } from 'components/layout/Toasts';

import { TestApi } from 'src/api';
import ComponentCard from 'features/Library/components/ComponentCard';
import ExampleForm from 'features/Library/components/ExampleForm';
import { dictionary } from 'features/Library/dictionary';

import style from './ComponentsList.module.scss';

type SelectItem = {
  value: string;
  label: string;
};

const ComponentsList = () => {
  const [file, setFile] = useState<File | null>(null);
  const [input, setInput] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [radio, setRadio] = useState<string>('');
  const [textarea, setTextarea] = useState<string>('');
  const [boolean, setBoolean] = useState<boolean>(true);
  const [isButtonOpen, setIsButtonOpen] = useState<boolean>(true);
  const [select, setSelect] = useState<SelectItem | null>(null);
  const [aSelect, setASelect] = useState<SelectItem | null>(null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const selectOptions = [
    { value: 1, label: 'jeden' },
    { value: 2, label: 'dwa' },
    { value: 3, label: 'trzy' }
  ];

  return (
    <div className={style.container}>
      <ComponentCard data={dictionary.button}>
        <Button label={'hello default'} />
        <Button label={'hello gray'} gray />
        <Button label={'hello disabled'} disabled />
        <Button label={'hello loading'} isLoading />
      </ComponentCard>

      <ComponentCard data={dictionary.card}>
        <Card>card content!</Card>
        <Card>
          <Button label={'hello card!'} />
        </Card>
        <Card>
          <h2>h2</h2>
          <h4>h4</h4>
          <p>p</p>
        </Card>
      </ComponentCard>

      <ComponentCard data={dictionary.checkbox}>
        <Checkbox label={'hello!'} id={'check1'} />
        <Checkbox label={'hello! with long label'} id={'check2'} />
        <Checkbox label={'hello! with label reversed'} id={'check3'} reverse />
      </ComponentCard>

      <ComponentCard data={dictionary.closeButton}>
        <CloseButton
          isOpen={isButtonOpen}
          onClick={() => setIsButtonOpen((prev) => !prev)}
        />
      </ComponentCard>

      <ComponentCard data={dictionary.fileUploader}>
        <FileUploader value={file} setFile={setFile} handleUpload={() => {}} />
      </ComponentCard>

      <ComponentCard data={dictionary.input}>
        <Input value={input} onChangeText={setInput} label={'Testowy input'} />
        <Input
          value={input}
          onChangeText={setInput}
          label={'Testowy input, ale pole wymagane'}
          rule={'required'}
        />
      </ComponentCard>

      <ComponentCard data={dictionary.radio}>
        <InputRadio
          name={'test-radio'}
          value={'tak'}
          label={'tak'}
          checked={radio === 'tak'}
          onChange={(e) => setRadio(e.target.value)}
          id={'tak'}
        />
        <InputRadio
          name={'test-radio'}
          value={'nie'}
          label={'nie'}
          checked={radio === 'nie'}
          onChange={(e) => setRadio(e.target.value)}
          id={'nie'}
        />
      </ComponentCard>

      <ComponentCard data={dictionary.labelLink}>
        <LabelLink label={'hello label'} />
        <LabelLink label={'hello label color'} color />
        <LabelLink label={'hello label light'} light />
      </ComponentCard>

      <ComponentCard data={dictionary.modal}>
        <Button
          label={'Kliknij mnie, aby zobaczyć modal'}
          onClick={() => setIsModalVisible(true)}
        />
        <Modal
          closeModal={() => setIsModalVisible(false)}
          isOpen={isModalVisible}
          title={'Tytuł modalu'}
        >
          <h2>Dziecko h2</h2>
          <h1>Dziecko h1</h1>
          <p>Dziecko p</p>
        </Modal>
      </ComponentCard>

      <ComponentCard data={dictionary.loader}>
        <Loader />
      </ComponentCard>

      <ComponentCard data={dictionary.notify}>
        <Button
          label={'Pokaż powiadomienie'}
          onClick={() => notifyCommon(['Testowe powiadomienie!'])}
        />
      </ComponentCard>

      <ComponentCard data={dictionary.phoneInput}>
        <PhoneInput value={phone} onChange={setPhone} />
      </ComponentCard>

      <ComponentCard data={dictionary.textarea}>
        <Textarea id={'textarea'} value={textarea} onChange={setTextarea} />
      </ComponentCard>

      <ComponentCard data={dictionary.select}>
        <InputSelect
          value={select}
          onChange={setSelect}
          wrapperStyle={style.select}
          options={selectOptions}
        />
      </ComponentCard>

      <ComponentCard data={dictionary.asyncSelect}>
        <AsyncSelect
          value={aSelect}
          onChange={setASelect}
          wrapperStyle={style.select}
          valueKey={'name'}
          labelKey={'name'}
          apiCallback={TestApi.getRandomUsers}
          queryParams={{ foo: 'bar' }}
        />
      </ComponentCard>

      <ComponentCard data={dictionary.switchButton}>
        <SwitchButton value={boolean} setValue={setBoolean} />
        <SwitchButton
          value={!boolean}
          setValue={(bool) => setBoolean(!bool)}
          label={'hello label!'}
        />
        <SwitchButton
          value={boolean}
          setValue={setBoolean}
          label={'hello label reverse!'}
          reverse
        />
      </ComponentCard>

      <ComponentCard data={dictionary.form}>
        <ExampleForm />
      </ComponentCard>
    </div>
  );
};

export default ComponentsList;
