import {Navigate, Outlet, Route, Routes} from 'react-router';
import LandingPage from './pages/LandingPage/LandingPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import MainLayout from './layouts/MainLayout/MainLayout';
import SessionPage from './pages/SessionPage/SessionPage';
import {useAppSelector} from './store/hooks';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import LoggingPage from './pages/LoggingPage/LoggingPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const ProtectedRoute = () => {
  const {user} = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to='/' replace />;
  }
  return <Outlet />;
};

const App = () => (
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path='/dashboard' element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path='session/:id' element={<SessionPage />} />
        <Route path='profile' element={<ProfilePage />} />
      </Route>
    </Route>
    <Route path='/auth/login' element={<LoggingPage />} />
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);

export default App;
