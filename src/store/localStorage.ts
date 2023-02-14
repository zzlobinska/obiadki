import { getLocalStorageItem, getSessionStorageItem } from 'src/utils/storage';
export const checkIfTokensRemembered = () =>
  getLocalStorageItem('rememberMe')
    ? getLocalStorageItem('rememberMe') === 'true'
    : false;

export const getAccessTokenFromStorage = (): string | null => {
  const getFromStorage = checkIfTokensRemembered()
    ? getLocalStorageItem
    : getSessionStorageItem;

  return getFromStorage('access');
};