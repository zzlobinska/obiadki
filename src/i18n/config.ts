import { InitOptions } from 'i18next';

import { commonEN, commonPL } from './locales';

const resources = {
  pl: {
    common: commonPL,
  },
  en: {
    common: commonEN,
  }
};

export const ns = [
  'common',
];

export const initOptions: InitOptions = {
  resources,
  fallbackLng: 'pl',
  lng: 'pl',
  debug: true,
  load: 'languageOnly',
  ns,
  defaultNS: 'common',
  interpolation: {
    escapeValue: true,
    formatSeparator: ','
  }
};
