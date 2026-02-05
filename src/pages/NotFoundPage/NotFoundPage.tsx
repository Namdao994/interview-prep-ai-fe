import {ROUTES} from '@/routes/path';
import {Button, Flex, theme, Typography, Watermark} from 'antd';
import {useNavigate} from 'react-router';
import {useWindowSize} from 'usehooks-ts';

const NotFoundPage = () => {
  const {
    token: {colorTextQuaternary, colorBgLayout, fontSizeXL, colorPrimary, fontSizeHeading5},
  } = theme.useToken();
  const navigate = useNavigate();
  const {height: windowHeight} = useWindowSize();
  const {Title, Paragraph} = Typography;
  return (
    <Watermark content='Interview Prep AI' font={{color: colorTextQuaternary, fontSize: fontSizeXL}}>
      <Flex
        style={{
          width: '100vw',
          height: '100vh',
          background: colorBgLayout,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: windowHeight / 6,
          flexDirection: 'column',
        }}
      >
        <Title
          style={{
            color: colorPrimary,
            fontSize: 102,
            margin: 0,
          }}
        >
          404
        </Title>
        <Title level={2}>Page Not Found</Title>
        <Paragraph
          style={{
            fontSize: fontSizeHeading5,
            fontWeight: 500,
            width: '90%',
            textAlign: 'center',
          }}
        >
          Opps! The page you are looking for does not exist. It might have been moved or delete
        </Paragraph>
        <Button type='primary' size='large' onClick={() => navigate(ROUTES.DASHBOARD)}>
          Back to home
        </Button>
      </Flex>
    </Watermark>
  );
};

export default NotFoundPage;
