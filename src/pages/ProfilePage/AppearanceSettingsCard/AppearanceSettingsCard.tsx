import {Card, Divider, Flex, Switch, theme, Typography, type SwitchProps} from 'antd';
import SelectThemeAccent from '../SelectThemeAccent/SelectThemeAccent';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {setThemeMode} from '@/store/slices/themeSlice';
const {Title, Paragraph} = Typography;

const AppearanceSettingsCard = () => {
  const {
    token: {paddingLG},
  } = theme.useToken();
  const dispatch = useAppDispatch();
  const {mode} = useAppSelector((state) => state.theme);
  const handleChangeThemeMode: SwitchProps['onChange'] = (checked) => {
    dispatch(setThemeMode(checked ? 'dark' : 'light'));
  };
  return (
    <Card
      styles={{
        body: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }}
    >
      <Flex
        style={{
          paddingLeft: paddingLG,
          paddingRight: paddingLG,
        }}
        justify='space-between'
        align='center'
        gap='middle'
      >
        <Flex
          vertical
          style={{
            width: '70%',
          }}
        >
          <Title level={5}>Theme mode</Title>
          <Paragraph>Choose how Interview Prep AI looks to you. Select a single theme</Paragraph>
        </Flex>
        <SelectThemeAccent />
      </Flex>
      <Divider />
      <Flex
        style={{
          paddingLeft: paddingLG,
          paddingRight: paddingLG,
        }}
        justify='space-between'
      >
        <Title level={5}>Dark mode</Title>
        <Switch defaultChecked={mode === 'dark'} onChange={handleChangeThemeMode} />
      </Flex>
    </Card>
  );
};

export default AppearanceSettingsCard;
