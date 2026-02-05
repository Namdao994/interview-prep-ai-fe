import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
export type SessionViewMode = 'grid' | 'table';
export type SessionLoadMode = 'pagination' | 'infinite';
export type SessionStatus = 'ACTIVE' | 'ARCHIVED';
export interface SessionFilters {
  status: SessionStatus[];
}

interface DashboardPageState {
  sessionViewMode: SessionViewMode;
  sessionCurrentPage: number;
  sessionPageSize: number;
  sessionLoadMode: SessionLoadMode;
  sessionFilters: SessionFilters;
}
const initialState: DashboardPageState = {
  sessionViewMode: 'grid',
  sessionCurrentPage: 1,
  sessionPageSize: 5,
  sessionLoadMode: 'pagination',
  sessionFilters: {
    status: [],
  },
};

const dashboardPageSlice = createSlice({
  name: 'dashboardPage',
  initialState,
  reducers: {
    setSessionViewMode(state, action: PayloadAction<SessionViewMode>) {
      state.sessionViewMode = action.payload;
    },
    setSessionPageSize(state, action: PayloadAction<number>) {
      state.sessionPageSize = action.payload;
    },
    setSessionCurrentPage(state, action: PayloadAction<number>) {
      state.sessionCurrentPage = action.payload;
    },
    setSessionLoadMode(state, action: PayloadAction<SessionLoadMode>) {
      state.sessionLoadMode = action.payload;
    },
    setSessionStatusFilters(state, action: PayloadAction<SessionStatus[]>) {
      state.sessionFilters.status = action.payload;
    },
  },
});

export const {
  setSessionViewMode,
  setSessionPageSize,
  setSessionCurrentPage,
  setSessionLoadMode,
  setSessionStatusFilters,
} = dashboardPageSlice.actions;
export default dashboardPageSlice.reducer;
export const dashboardPagePersistConfig = {
  key: 'dashboard',
  storage,
  whitelist: ['sessionViewMode', 'sessionFilters'],
};
