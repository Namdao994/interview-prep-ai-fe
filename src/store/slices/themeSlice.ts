// src/store/slices/themeSlice.ts
import type {COLOR_THEME_ACCENT} from '@/constants/colorThemeAccent';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

export type ThemeMode = 'light' | 'dark';
export type ThemeAccent = keyof typeof COLOR_THEME_ACCENT;
interface ThemeState {
  mode: ThemeMode;
  accent: ThemeAccent;
}

const initialState: ThemeState = {
  mode: 'light',
  accent: 'primary',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeAccent(state, action: PayloadAction<ThemeAccent>) {
      state.accent = action.payload;
    },
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      const next = action.payload;
      if (state.mode === next) return;
      state.mode = next;
    },
    toggleThemeMode(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const {setThemeAccent, setThemeMode, toggleThemeMode} = themeSlice.actions;
export default themeSlice.reducer;
export const themePersistConfig = {
  key: 'theme',
  storage,
};
