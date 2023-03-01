import ApiClient from 'src/api/client.js';
import { RecipesRoutes, TestRoutes } from 'src/api/routes';

export const TestApi = {
  getRandomUsers(params: object) {
    return ApiClient.get(TestRoutes.GET_BEERS, params);
  }
};
export const RecipesApi = {
  getRecipes(params: object) {
    return ApiClient.get(RecipesRoutes.GET_RECIPES, params);
  }
};

export class AccountApi {}
