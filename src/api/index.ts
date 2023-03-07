import ApiClient from 'src/api/client.js';
import { CategoriesRoutes, RecipesRoutes, TestRoutes } from 'src/api/routes';
import { RecipeType } from 'src/features/RecipesPage/RecipeDetailModal';

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
	deleteRecipe(id: number) {
		return ApiClient.delete(RecipesRoutes.DELETE_RECIPE(id));
	},
	putRecipe(id: number, data: object) {
		return ApiClient.put(RecipesRoutes.PUT_RECIPE(id), data);
	},
};

export const CategoriesApi = {
	getCategories(params: object) {
		return ApiClient.get(CategoriesRoutes.GET_CATEGORIES, params);
	},
};

export class AccountApi {}
