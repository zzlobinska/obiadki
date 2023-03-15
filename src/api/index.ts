import ApiClient from 'src/api/client.js';
import {
  CategoriesRoutes,
  MenusRoutes,
  RecipesRoutes,
  TestRoutes
} from 'src/api/routes';

export const TestApi = {
  getRandomUsers(params: object) {
    return ApiClient.get(TestRoutes.GET_BEERS, params);
  }
};
export const RecipesApi = {
  getRecipes(params?: object) {
    return ApiClient.get(RecipesRoutes.GET_RECIPES, params);
  },

  postRecipe(data: object) {
    return ApiClient.post(RecipesRoutes.POST_RECIPE, data, {
      __tokenRequired: false
    });
  },
  deleteRecipe(id: number) {
    return ApiClient.delete(RecipesRoutes.DELETE_RECIPE(id));
  },
  putRecipe(id: number, data: object) {
    return ApiClient.put(RecipesRoutes.PUT_RECIPE(id), data);
  }
};

export const CategoriesApi = {
  getCategories(params: object) {
    return ApiClient.get(CategoriesRoutes.GET_CATEGORIES, params);
  }
};

export const MenusApi = {
  getMenus(params: object) {
    return ApiClient.get(MenusRoutes.GET_MENUS, params);
  },
  getMenu(id: string, params?: object) {
    return ApiClient.get(MenusRoutes.GET_MENU(id), params);
  },
  postMenu(data: object) {
    return ApiClient.post(MenusRoutes.POST_MENU, data, {
      __tokenRequired: false
    });
  }
};

export class AccountApi {}
