import AiOutlineUser from '@/assets/icon/AiOutlineUser';
import GoDotFill from '@/assets/icon/GoDotFill';
import MdOutlineLogout from '@/assets/icon/MdOutlineLogout';
import {ROUTES} from '@/routes/path';
import {useLogoutMutation} from '@/store/apis/authApi';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {logout as logoutAction} from '@/store/slices/authSlice';
import {showNotification} from '@/store/slices/notificationSlice';
import {setThemeMode} from '@/store/slices/themeSlice';
import {Avatar, Dropdown, Space, theme, Typography, type MenuProps} from 'antd';
import {useNavigate} from 'react-router';
const {Text} = Typography;
const AvatarMenu = () => {
  const {
    token: {fontSizeHeading5},
  } = theme.useToken();
  const {mode} = useAppSelector((state) => state.theme);
  const {user} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const userMenuItems: MenuProps['items'] = [
    {
      type: 'group',
      label: (
        <Space vertical>
          <Text
            strong
            style={{
              fontSize: fontSizeHeading5,
            }}
          >
            {user?.name}
          </Text>
          <Text>{user?.email}</Text>
        </Space>
      ),
    },
    {type: 'divider'},
    {
      key: 'profile',
      label: 'Profile',
      icon: <AiOutlineUser />,
    },
    {
      key: 'theme',
      type: 'group',
      label: 'Theme',
      children: [
        {
          key: 'theme-light',
          label: 'Light',
          icon: (
            <GoDotFill
              style={{
                color: mode === 'light' ? undefined : 'transparent',
              }}
            />
          ),
        },
        {
          key: 'theme-dark',
          label: 'Dark',
          icon: (
            <GoDotFill
              style={{
                color: mode === 'dark' ? undefined : 'transparent',
              }}
            />
          ),
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <MdOutlineLogout />,
      danger: true,
    },
  ];
  const handleUserMenuClick: MenuProps['onClick'] = async ({key}) => {
    switch (key) {
      case 'profile': {
        navigate(ROUTES.PROFILE);
        break;
      }
      case 'theme-light': {
        dispatch(setThemeMode('light'));
        break;
      }
      case 'theme-dark': {
        dispatch(setThemeMode('dark'));
        break;
      }
      case 'logout': {
        const res = await logout().unwrap();
        if (res) {
          dispatch(logoutAction());
          dispatch(showNotification({type: 'success', content: res.message}));
        }
        break;
      }
    }
  };
  return (
    <Dropdown
      menu={{items: userMenuItems, onClick: handleUserMenuClick, style: {width: 300}}}
      trigger={['click']}
      placement='bottomRight'
      arrow={{pointAtCenter: true}}
    >
      <Avatar size={40} style={{cursor: 'pointer'}} src={user?.profileImageUrl}>
        {!user?.profileImageUrl && user?.name.slice(0, 1).toUpperCase()}
      </Avatar>
    </Dropdown>
  );
};

export default AvatarMenu;
