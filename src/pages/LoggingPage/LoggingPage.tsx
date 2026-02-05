import GradientText from '@/components/GradientText/GradientText';
import {useResponsive} from '@/hooks/useResponsive';
import {useGetMeQuery} from '@/store/apis/userApi';
import {useAppDispatch} from '@/store/hooks';
import {setUser} from '@/store/slices/authSlice';
import {LoadingOutlined} from '@ant-design/icons';
import {Card, Divider, Flex, Spin, theme, Typography, Watermark} from 'antd';
import {useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router';
import {useWindowSize} from 'usehooks-ts';
const {Text} = Typography;
const LoggingPage = () => {
  const {data, isLoading, isError} = useGetMeQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    token: {
      colorTextQuaternary,
      colorBgLayout,
      colorBgContainer,
      fontSizeXL,
      fontSizeLG,
      fontSizeHeading3,
      fontWeightStrong,
      colorPrimary,
      colorPrimaryBorder,
    },
  } = theme.useToken();
  const {height: windowHeight} = useWindowSize();
  const {isXs} = useResponsive();
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      navigate('/dashboard', {replace: true});
    }
  }, [data, dispatch, navigate]);

  if (isError) {
    return <Navigate to='/' replace />;
  }
  if (isLoading) {
    return (
      <Watermark content='Interview Prep AI' font={{color: colorTextQuaternary, fontSize: fontSizeXL}}>
        <div
          style={{
            width: '100vw',
            height: '100vh',
            background: colorBgLayout,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: windowHeight / 6,
          }}
        >
          <Card
            style={{
              width: '90vw',
              maxWidth: 500,
              background: colorBgContainer,
              zIndex: 10,
            }}
          >
            <Flex
              vertical
              style={{
                alignItems: 'center',
              }}
              gap={isXs ? 'middle' : 'small'}
            >
              <GradientText
                styleText={{
                  fontWeight: fontWeightStrong,
                  fontSize: fontSizeHeading3,
                }}
                colors={[colorPrimary, colorPrimaryBorder, colorPrimary, colorPrimaryBorder, colorPrimary]}
              >
                Interview Prep AI
              </GradientText>
              <Divider />
              <Spin
                indicator={<LoadingOutlined style={{fontSize: 48}} spin />}
                styles={{
                  indicator: {
                    color: colorPrimary,
                  },
                }}
              />
              <Text
                style={{
                  fontSize: fontSizeLG,
                }}
              >
                Logging in...
              </Text>
            </Flex>
          </Card>
        </div>
      </Watermark>
    );
  }
  return null;
};

export default LoggingPage;
