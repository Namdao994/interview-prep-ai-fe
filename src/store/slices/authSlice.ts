import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
export interface User {
  name: string;
  email: string;
  profileImageUrl: string | null;
}

interface AuthState {
  user: User | null;
  registerEmail: string | null;
}

const initialState: AuthState = {
  user: null,
  registerEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setRegisterEmail(state, action: PayloadAction<string>) {
      state.registerEmail = action.payload;
    },
    clearRegisterEmail(state) {
      state.registerEmail = null;
    },
    deleteProfileImageUrl(state) {
      if (!state.user) return;
      state.user.profileImageUrl = null;
    },
    changeProfileImageUrl(state, action: PayloadAction<string>) {
      if (!state.user) return;
      state.user.profileImageUrl = action.payload;
    },
    changeUsername(state, action: PayloadAction<string>) {
      if (!state.user) return;
      state.user.name = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const {
  setUser,
  logout,
  deleteProfileImageUrl,
  changeProfileImageUrl,
  changeUsername,
  setRegisterEmail,
  clearRegisterEmail,
} = authSlice.actions;
export default authSlice.reducer;
export const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
};
