import ApiClient from 'src/api/client.js';
import { RecipesRoutes, TestRoutes } from 'src/api/routes';

export const TestApi = {
	getRandomUsers(params: object) {
		return ApiClient.get(TestRoutes.GET_BEERS, params);
	},
};
export const RecipesApi = {
	getRecipes(params: object) {
		return ApiClient.get(RecipesRoutes.GET_RECIPES, params);
	},
	postRecipe(data: object) {
		return ApiClient.post(RecipesRoutes.POST_RECIPE, data, {
			__tokenRequired: false,
		});
	},
};

export class AccountApi {}
