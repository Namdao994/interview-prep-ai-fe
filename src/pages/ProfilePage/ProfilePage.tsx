import {useResponsive} from '@/hooks/useResponsive';
import {Flex, theme, Typography} from 'antd';
import AppearanceSettingsCard from './AppearanceSettingsCard/AppearanceSettingsCard';
import DeleteAccountCard from './DeleteAccountCard/DeleteAccountCard';
import ProfileUserSection from './ProfileUserSection/ProfileUserSection';
import UpdateProfileForm from './UpdateProfileForm/UpdateProfileForm';
import SecuritySettingsSection from './SecuritySettingsSection/SecuritySettingsSection';

const {Title, Paragraph} = Typography;
const ProfilePage = () => {
  const {
    token: {paddingLG, fontSizeHeading3, fontSizeHeading4, marginXS, marginLG},
  } = theme.useToken();
  const {isMd} = useResponsive();

  return (
    <Flex
      justify='center'
      style={{
        paddingBottom: paddingLG,
      }}
    >
      <Flex
        vertical
        style={{
          paddingTop: paddingLG,
          width: isMd ? 640 : '90%',
        }}
      >
        <Title
          level={2}
          style={{
            fontSize: fontSizeHeading3,
            marginBottom: marginXS,
          }}
        >
          Preferences
        </Title>
        <Paragraph>Manage your account profile and dashboard experience.</Paragraph>
        <Title
          level={3}
          style={{
            fontSize: fontSizeHeading4,
          }}
        >
          Profile information
        </Title>
        <ProfileUserSection />
        <UpdateProfileForm />
        <Title level={3} style={{fontSize: fontSizeHeading4, marginTop: marginLG}}>
          Security
        </Title>
        <SecuritySettingsSection />
        <Title
          level={2}
          style={{
            fontSize: fontSizeHeading3,
            marginBottom: marginXS,
            marginTop: marginLG,
          }}
        >
          Appearance
        </Title>
        <Paragraph>Choose how Interview Prep AI looks and behaves in the dashboard.</Paragraph>
        <AppearanceSettingsCard />
        <Title
          level={2}
          style={{
            fontSize: fontSizeHeading3,
            marginBottom: marginXS,
            marginTop: marginLG,
          }}
          type='danger'
        >
          Danger zone
        </Title>
        <Paragraph>Permanently delete your Interview Prep AI account and data.</Paragraph>
        <DeleteAccountCard />
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
