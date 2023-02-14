import React from 'react';
import { Store } from 'react-notifications-component';
import { AxiosError } from 'axios';

import { apiErrorHandler } from 'src/api/utils';
import closeNotify from 'src/assets/icons/closeIcon.svg';
import { getNotificationIdFromName } from 'src/utils/helpers';

import 'animate.css';
import style from './Toast.module.scss';

type NotificationContentProps = {
  color: string;
  text: string;
  title?: string;
  handleCloseConfirm: () => void;
  id: string;
};

type NotifyOptions = {
  duration?: number;
  title?: string;
};

const NotificationContent = (props: NotificationContentProps) => {
  const {
    color,
    text,
    title = 'Powiadomienie',
    handleCloseConfirm,
    id
  } = props;

  return (
    <div className={style.container} style={{ backgroundColor: color }} id={id}>
      <div className={style.header}>
        <p className={style.title}>{title}</p>
        <button className={style.icon} onClick={handleCloseConfirm}>
          <img src={closeNotify} alt={'close icon'} />
        </button>
      </div>
      <p className={style.message}>{text}</p>
    </div>
  );
};

const minNotificationDuration = 8000;

const notify = (color: string, elements: string[], options?: NotifyOptions) => {
  const notifyId = getNotificationIdFromName(elements);
  if (document.getElementById(notifyId)) return;

  elements.forEach((element: string) => {
    Store.addNotification({
      content: (id) => (
        <NotificationContent
          color={color}
          text={element}
          id={notifyId}
          title={options?.title}
          handleCloseConfirm={() => Store.removeNotification((id as any).id)}
        />
      ),
      insert: 'bottom',
      container: 'top-right',
      animationIn: ['animate__animated animate__fadeIn animate__faster'],
      animationOut: ['animate__animated animate__fadeOut animate__faster'],
      dismiss: {
        duration:
          options?.duration ||
          Math.max(element.length * 50, minNotificationDuration),
        pauseOnHover: true,
        click: false,
        touch: false,
        waitForAnimation: true
      },
      slidingEnter: {
        duration: 300,
        delay: 0,
        timingFunction: 'ease-out'
      },
      slidingExit: {
        duration: 1,
        timingFunction: 'ease-in',
        delay: 0
      }
    });
  });
};

export const notifyCommon = (items: string[], options?: NotifyOptions) =>
  notify('#313941', items, options);

export const notifySuccess = (items: string[], options?: NotifyOptions) =>
  notify('#A2C143', items, options);

export const notifyDanger = (items: string[], options?: NotifyOptions) =>
  notify('#BC4747', items, options);

export const notifyApiError = (
  error: AxiosError,
  color: 'common' | 'danger' = 'danger'
) => {
  if (error?.response?.status === 503) return;
  const errorMessage = apiErrorHandler(error);
  if (color === 'danger') {
    notifyDanger(errorMessage);
  } else if (color === 'common') {
    notifyCommon(errorMessage);
  }
};

export default {
  notifyCommon,
  notifySuccess,
  notifyDanger,
  notifyApiError
};
