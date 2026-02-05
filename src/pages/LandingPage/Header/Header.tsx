import {Link} from 'react-router';
import {Button, Layout, theme, Typography, Flex} from 'antd';
import {useAppSelector} from '@/store/hooks';
import ContainerResponsive from '@/components/ContainerResponsive/ContainerResponsive';
import AvatarMenu from '@/components/AvatarMenu/AvatarMenu';

const {Header: HeaderAnt} = Layout;
const {Title} = Typography;
type HeaderProps = {
  showAuthModal: () => void;
};

const Header = ({showAuthModal}: HeaderProps) => {
  const {
    token: {colorBgContainer, fontSizeHeading4, boxShadowTertiary, colorBorderSecondary, colorPrimaryBg, colorBgBlur},
  } = theme.useToken();
  const {user} = useAppSelector((state) => state.auth);
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
        zIndex: 10,
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
        <Link to='/'>
          <Title style={{fontSize: fontSizeHeading4, margin: 0}}>Interview Prep AI</Title>
        </Link>
        <Flex gap='middle'>
          {user ? (
            <Flex
              gap='middle'
              style={{
                alignItems: 'center',
              }}
            >
              <Button size='large' type='primary'>
                <Link to='/dashboard'>Dashboard</Link>
              </Button>
              <AvatarMenu />
            </Flex>
          ) : (
            <Button size='large' type='primary' onClick={showAuthModal}>
              Login/Signup
            </Button>
          )}
        </Flex>
      </ContainerResponsive>
    </HeaderAnt>
  );
};

export default Header;

{
  /* <Flex gap='small'>
                <SelectThemeAccent />
                <Button
                  size='large'
                  type='primary'
                  icon={mode === 'light' ? <AiOutlineSun /> : <AiOutlineMoon />}
                  onClick={() => dispatch(toggleThemeMode())}
                ></Button>
              </Flex> */
}
