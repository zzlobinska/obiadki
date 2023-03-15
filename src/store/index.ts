import { configureStore } from '@reduxjs/toolkit';

import { sidebarSlice } from 'components/layout/Sidebar/slice';

import { MenusListSlice } from 'src/features/MenuPage/slice';
import { authSlice } from 'src/features/onboarding/slice';
import { RecipesListSlice } from 'src/features/RecipesPage/slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sidebar: sidebarSlice.reducer,
    recipesList: RecipesListSlice.reducer,
    menusList: MenusListSlice.reducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
