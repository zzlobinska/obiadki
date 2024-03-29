export const TestRoutes = {
  GET_BEERS: 'https://api.punkapi.com/v2/beers'
};
export const RecipesRoutes = {
  GET_RECIPES: '/recipes?populate=*&sort[1]=createdAt:desc',
  GET_RECIPE: (id: string) => `/recipes/${id}?populate=deep`,
  POST_RECIPE: '/recipes',
  DELETE_RECIPE: (id: number) => `/recipes/${id}`,
  PUT_RECIPE: (id: number) => `/recipes/${id}`
};
export const CategoriesRoutes = {
  GET_CATEGORIES: '/categories?populate=*'
};
export const MenusRoutes = {
  GET_MENUS: '/menus?populate=*&sort[1]=createdAt:desc',
  GET_MENU: (id: string) => `/menus/${id}?populate=deep`,
  POST_MENU: '/menus',
  DELETE_MENU: (id: string | undefined) => `/menus/${id}`,
};

export const AccountsRoutes = {};
