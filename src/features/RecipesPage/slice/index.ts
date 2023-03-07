import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 

interface RecipesListReducerState {
	version: number;
}

const initialState: RecipesListReducerState = {
	version: 0,
};

export const RecipesListSlice = createSlice({
	name: 'recipesListSlice',
	initialState,
	reducers: {
		changeVersion(state) {
			state.version++;
		},
	},
});

export const { changeVersion } = RecipesListSlice.actions;
