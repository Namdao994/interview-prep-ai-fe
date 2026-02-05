import {Layout, theme} from 'antd';
import {Outlet} from 'react-router';
import Header from './Header/Header';
const {Content} = Layout;
const MainLayout = () => {
  const {
    token: {colorBgContainer},
  } = theme.useToken();
  return (
    <Layout
      style={{
        height: '100dvh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Header />
      <Content
        style={{
          flex: 1,
          background: colorBgContainer,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
