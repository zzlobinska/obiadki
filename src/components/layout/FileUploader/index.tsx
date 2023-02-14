import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';

import { Button, InputWrapper, Toasts } from 'components';
import {
  getWrapperProps,
  InputWrapperProps
} from 'components/layout/InputWrapper';

import { bytesToSize } from 'src/utils/helpers';

import style from './FileUploader.module.scss';

interface FileUploaderProps extends InputWrapperProps {
  value: File | null;
  setFile: (file: File | null) => void;
  handleUpload: () => void;
  uploadFail?: boolean;
  isLoading?: boolean;
  label?: string;
  id?: string;
  name?: string;
  allowedFiles?: string[];
}

const FileUploader = (props: FileUploaderProps) => {
  const {
    value,
    setFile,
    isLoading,
    allowedFiles = ['application/pdf']
  } = props;
  const input = useRef<HTMLInputElement>(null);
  const handleLoad = () => input.current?.click();

  const wrapperProps = getWrapperProps(props);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    if (!allowedFiles.includes(e.target.files[0].type)) {
      return Toasts.notifyCommon(['Niedozwolony format pliku.']);
    }

    setFile(e.target.files[0]);
  };

  const handleClearFile = () => {
    if (input.current) {
      input.current.value = '';
      setFile(null);
    }
  };

  useEffect(() => {
    if (isLoading) {
      handleClearFile();
    }
  }, [isLoading]);

  return (
    <InputWrapper {...wrapperProps}>
      <div className={style.container}>
        {!value && (
          <Button
            label={'Wybierz plik'}
            onClick={handleLoad}
            isLoading={isLoading}
            className={classnames(style.loadButton, {
              [style.error]: wrapperProps.hasError
            })}
            id={'fileUpload'}
            gray
          />
        )}
        <input
          type='file'
          onChange={handleChange}
          ref={input}
          className={style.input}
        />
        {value && (
          <div className={style.fileInfo}>
            <button className={style.clearButton} onClick={handleClearFile} />
            <p className={style.fileName}>{value.name}</p>
            <p className={style.fileSize}>{bytesToSize(value.size)}</p>
          </div>
        )}
      </div>
    </InputWrapper>
  );
};

export default FileUploader;
