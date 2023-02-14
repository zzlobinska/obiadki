import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { isNetworkError, throttledNotifyNetworkError } from './utils';

const client = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en'
  },
  __tokenRequired: true
});

client.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (isNetworkError(error)) {
      throttledNotifyNetworkError();
    }
    return Promise.reject(error);
  }
);

const ApiClient = {
  get(url: string, params?: any, customConfigs?: AxiosRequestConfig) {
    const configs = { params, ...customConfigs };
    return client.get(url, configs);
  },
  post(url: string, data: any, customConfigs?: AxiosRequestConfig) {
    return client.post(url, data, customConfigs);
  },
  put(url: string, data: any, customConfigs?: AxiosRequestConfig) {
    return client.put(url, data, customConfigs);
  },
  patch(url: string, data: any, customConfigs?: AxiosRequestConfig) {
    return client.patch(url, data, customConfigs);
  },
  delete(url: string, customConfigs?: AxiosRequestConfig) {
    return client.delete(url, customConfigs);
  }
};

export default ApiClient;
