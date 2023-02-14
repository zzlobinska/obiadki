import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';

import store from '../store';

const rootReducer = combineReducers({});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default rootReducer;
