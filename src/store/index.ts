import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import themeReducer, {themePersistConfig} from './slices/themeSlice';
import dashboardPageReducer, {dashboardPagePersistConfig} from './slices/dashboardPageSlice';
import detailSessionPageReducer from './slices/detailSessionPageSlice';
import authReducer, {authPersistConfig} from './slices/authSlice';
import notificationReducer from './slices/notificationSlice';
import {authApi} from './apis/authApi';
import {userApi} from './apis/userApi';
import {sessionApi} from './apis/sessionApi';

const rootReducer = combineReducers({
  theme: persistReducer(themePersistConfig, themeReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  dashboardPage: persistReducer(dashboardPagePersistConfig, dashboardPageReducer),
  detailSessionPage: detailSessionPageReducer,
  notification: notificationReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [sessionApi.reducerPath]: sessionApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, userApi.middleware, sessionApi.middleware),
});

export const persistor = persistStore(store);
