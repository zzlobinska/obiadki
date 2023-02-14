import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authPayload {
  access: string;
}

interface User {
  role: string;
}

interface AuthReducerState {
  isAuth: boolean;
  access: string | null;
  isLoading: boolean;
  user: User | null;
}

const initialState: AuthReducerState = {
  isAuth: false,
  access: '',
  isLoading: false,
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<authPayload>) {
      state.isLoading = false;
      state.access = action.payload.access;
      state.isAuth = true;
    },
    loginFailure(state) {
      state.isLoading = false;
    },
    logout(state) {
      state.isAuth = false;
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
