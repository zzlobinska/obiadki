import 'vite/client';
import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    __tokenRequired?: boolean;
  }
}
