import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18next from 'i18next';

import './i18n/i18n';

import AppRouter from './app/AppRouter';
import store from './store';

import 'react-notifications-component/dist/theme.css';
import 'src/styles/global.scss';
import 'src/styles/reset.scss';

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
