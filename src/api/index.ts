import ApiClient from 'src/api/client.js';
import { TestRoutes } from 'src/api/routes';

export const TestApi = {
  getRandomUsers(params: object) {
    return ApiClient.get(TestRoutes.GET_BEERS, params);
  }
};

export class AccountApi {}
