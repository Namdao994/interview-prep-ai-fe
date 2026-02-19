import {ConfigProvider, theme as antdTheme} from 'antd';
import {useAppSelector} from '@/store/hooks';
import {COLOR_THEME_ACCENT} from '../../constants/colorThemeAccent';

const {darkAlgorithm, defaultAlgorithm} = antdTheme;

const AppConfigProvider = ({children}: {children: React.ReactNode}) => {
  const {mode, accent} = useAppSelector((state) => state.theme);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorLink: COLOR_THEME_ACCENT[accent],
          fontFamily: 'Urbanist, sans-serif',
          colorPrimary: COLOR_THEME_ACCENT[accent],
        },
        algorithm: mode === 'dark' ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AppConfigProvider;
