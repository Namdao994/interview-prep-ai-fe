import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface NotificationState {
  type: null | 'info' | 'success' | 'warning' | 'error';
  content: string;
}
const initialState: NotificationState = {
  type: null,
  content: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<NotificationState>) => {
      state.type = action.payload.type;
      state.content = action.payload.content;
    },
    hideNotification: (state) => {
      state.type = null;
      state.content = '';
    },
  },
});
export const {showNotification, hideNotification} = notificationSlice.actions;
export default notificationSlice.reducer;
