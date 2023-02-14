import { configureStore } from '@reduxjs/toolkit';

import { sidebarSlice } from 'components/layout/Sidebar/slice';

import { authSlice } from 'src/features/onboarding/slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sidebar: sidebarSlice.reducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
