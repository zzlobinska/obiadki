import { createSlice } from '@reduxjs/toolkit';

interface MenusListReducerState {
  version: number;
}

const initialState: MenusListReducerState = {
  version: 0
};

export const MenusListSlice = createSlice({
  name: 'menusListSlice',
  initialState,
  reducers: {
    changeVersion(state) {
      state.version++;
    }
  }
});

export const { changeVersion } = MenusListSlice.actions;
