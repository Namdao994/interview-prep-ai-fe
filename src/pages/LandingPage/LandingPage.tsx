import {Flex, Layout, theme, Tag, Typography, Button, Row, Col, Modal} from 'antd';
import Header from './Header/Header';
import ContainerResponsive from '@/components/ContainerResponsive/ContainerResponsive';
import LuSparkles from '@/assets/icon/LuSparkles';
import GradientText from '@/components/GradientText/GradientText';
import {useResponsive} from '@/hooks/useResponsive';
import heroImg from '@/assets/imgs/hero-img.jpg';
import FeatureCard from './FeatureCard/FeatureCard';
import {APP_FEATURES} from '@/utils/data';
import {useState} from 'react';
import LoginModalContent from './LoginModalContent/LoginModalContent';
import RegisterModalContent from './RegisterModalContent/RegisterModalContent';
import type {ModalType} from './types';
import {Link} from 'react-router';
import {useAppSelector} from '@/store/hooks';
import VerifyEmailModalContent from './VerifyEmailModalContent/VerifyEmailModalContent';
const {Content, Footer} = Layout;
const {Paragraph, Title} = Typography;

const LandingPage = () => {
  const {
    token: {
      colorBgContainer,
      colorPrimary,
      colorPrimaryBorder,
      fontWeightStrong,
      fontSizeLG,
      colorPrimaryBg,
      borderRadius,
      colorBgBlur,
    },
  } = theme.useToken();

  const {isSm} = useResponsive();
  const {user} = useAppSelector((state) => state.auth);
  // Modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<ModalType>('login');
  const MODAL_MAP = {
    login: {
      title: 'Welcome back',
      content: <LoginModalContent setCurrentModal={setCurrentModal} />,
    },
    register: {
      title: 'Create new account',
      content: <RegisterModalContent setCurrentModal={setCurrentModal} />,
    },
    verify: {
      title: 'Verify your email',
      content: <VerifyEmailModalContent setCurrentModal={setCurrentModal} />,
    },
  } as const;

  const {title: titleModal, content: contentModal} = MODAL_MAP[currentModal];
  const showAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCancel = () => {
    setIsAuthModalOpen(false);
    setCurrentModal('login');
  };
  return (
    <>
      <Layout>
        <Header showAuthModal={showAuthModal} />
        <Content>
          {/* Hero */}
          <ContainerResponsive
            style={{
              background: `${colorBgContainer} linear-gradient(to right, ${colorPrimaryBg}, ${colorBgBlur})`,
            }}
          >
            <Flex
              style={{
                alignItems: 'center',
                gap: isSm ? 40 : 20,
                flexDirection: isSm ? 'row' : 'column',
                paddingTop: 24,
                paddingBottom: isSm ? 184 : 104,
              }}
            >
              <Flex
                vertical
                style={{
                  width: isSm ? '50%' : '100%',
                }}
              >
                <Tag
                  icon={<LuSparkles />}
                  color={colorPrimary}
                  variant='outlined'
                  style={{
                    height: 32,
                    borderRadius: 14,
                    width: 104,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                    fontWeight: 700,
                  }}
                >
                  AI Powered
                </Tag>

                <Title
                  style={{
                    margin: 0,
                    paddingTop: 24,
                  }}
                >
                  Ace Interviews with
                  <br />{' '}
                  <GradientText
                    styleText={{fontWeight: fontWeightStrong}}
                    colors={[colorPrimary, colorPrimaryBorder, colorPrimary, colorPrimaryBorder, colorPrimary]}
                  >
                    AI-Powered
                  </GradientText>{' '}
                  Learning
                </Title>
              </Flex>

              <Flex
                vertical
                style={{
                  width: isSm ? '50%' : '100%',
                }}
              >
                <Paragraph
                  style={{
                    fontSize: fontSizeLG,
                  }}
                >
                  Get role-specific questions, expand answers when you need them, dive deeper into concepts, and
                  organize everything your way. From preparation to mastery — your ultimate interview toolkit is here.
                </Paragraph>
                {user ? (
                  <Button
                    type='primary'
                    style={{
                      width: 104,
                    }}
                  >
                    <Link to='/dashboard'>Dashboard</Link>
                  </Button>
                ) : (
                  <Button
                    type='primary'
                    style={{
                      width: 104,
                    }}
                    onClick={showAuthModal}
                  >
                    Get Started
                  </Button>
                )}
              </Flex>
            </Flex>
          </ContainerResponsive>
          {/*  */}
          <ContainerResponsive
            style={{
              display: 'flex',
              justifyContent: 'center',
              background: colorBgContainer,
              marginBottom: isSm ? -60 : -40,
            }}
          >
            <div
              style={{
                width: '80vw',
                justifyContent: 'center',
                borderRadius: borderRadius,
                overflow: 'hidden',
                position: 'relative',
                top: isSm ? -104 : -72,
              }}
            >
              <img
                src={heroImg}
                style={{
                  width: '100%',
                }}
              />
            </div>
          </ContainerResponsive>
          {/* Feature App */}
          <ContainerResponsive
            style={{
              background: `${colorBgContainer} linear-gradient(to right, ${colorPrimaryBg}, ${colorBgBlur})`,
            }}
          >
            <Flex
              vertical
              style={{
                padding: isSm ? '48px 0' : '32px 0',
              }}
            >
              <Title
                level={2}
                style={{
                  textAlign: 'center',
                }}
              >
                <GradientText
                  styleText={{fontWeight: fontWeightStrong}}
                  colors={[colorPrimary, colorPrimaryBorder, colorPrimary, colorPrimaryBorder, colorPrimary]}
                >
                  Features that make you shine
                </GradientText>

                <Row gutter={[{md: 24, lg: 32}, 24]} style={{marginTop: 24}}>
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <Col xs={24} md={8} key={feature.id}>
                      <FeatureCard feature={feature} />
                    </Col>
                  ))}
                </Row>
                <Row gutter={[{md: 24, lg: 32}, 24]} style={{marginTop: 24}}>
                  {APP_FEATURES.slice(3, APP_FEATURES.length).map((feature) => (
                    <Col xs={24} md={12} key={feature.id}>
                      <FeatureCard feature={feature} />
                    </Col>
                  ))}
                </Row>
              </Title>
            </Flex>
          </ContainerResponsive>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          © {new Date().getFullYear()} Interview Prep AI. All rights reserved.
        </Footer>
      </Layout>
      <Modal
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
        title={titleModal}
        open={isAuthModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {contentModal}
      </Modal>
    </>
  );
};

export default LandingPage;
