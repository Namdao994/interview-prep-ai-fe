import AvatarMenu from '@/components/AvatarMenu/AvatarMenu';
import ContainerResponsive from '@/components/ContainerResponsive/ContainerResponsive';
import {Flex, Layout, theme} from 'antd';
import AppBreadcrumb from './AppBreadcrumb/AppBreadcrumb';

const {Header: HeaderAnt} = Layout;

const Header = () => {
  const {
    token: {colorBgContainer, boxShadowTertiary, colorBorderSecondary, colorPrimaryBg, colorBgBlur},
  } = theme.useToken();

  return (
    <HeaderAnt
      style={{
        background: colorBgContainer,
        padding: '0 0',
        boxShadow: boxShadowTertiary,
        borderBottom: `1px solid ${colorBorderSecondary}`,
        position: 'sticky',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <ContainerResponsive
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: `${colorBgContainer} linear-gradient(to right, ${colorPrimaryBg}, ${colorBgBlur})`,
          height: '100%',
        }}
      >
        <AppBreadcrumb />
        <Flex gap='middle'>
          <AvatarMenu />
        </Flex>
      </ContainerResponsive>
    </HeaderAnt>
  );
};

export default Header;
