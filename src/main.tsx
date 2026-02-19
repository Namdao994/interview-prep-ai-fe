import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter} from 'react-router';
import 'antd/dist/reset.css';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@/store';
import AppConfigProvider from './providers/AppConfigProvider/AppConfigProvider.tsx';
import './index.css';
import NotificationProvider from './providers/NotificationProvider/NotificationProvider.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppConfigProvider>
          <NotificationProvider />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppConfigProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
