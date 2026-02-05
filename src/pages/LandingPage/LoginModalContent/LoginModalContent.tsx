import {Button, Divider, Flex, Form, Input, Typography} from 'antd';
import type {FormProps} from 'antd';
import ProviderButton from '@/components/ProviderButton/ProviderButton';
import MdOutlineEmail from '@/assets/icon/MdOutlineEmail';
import MdOutlinePassword from '@/assets/icon/MdOutlinePassword';
import type React from 'react';
import type {ModalType} from '../types';
import {useLoginMutation} from '@/store/apis/authApi';
import {useAppDispatch} from '@/store/hooks';
import {setRegisterEmail, setUser} from '@/store/slices/authSlice';
import {useNavigate} from 'react-router';
import {showNotification} from '@/store/slices/notificationSlice';
import env from '@/configs/env';
import type {ApiErrorResponse} from '@/shared/types/api';
import {ErrorCode} from '@/constants/errorCodes';

type FieldType = {
  email: string;
  password: string;
};
const {Paragraph, Link} = Typography;
type LoginModalContentProps = {
  setCurrentModal: React.Dispatch<React.SetStateAction<ModalType>>;
};
const LoginModalContent: React.FC<LoginModalContentProps> = ({setCurrentModal}) => {
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const {email, password} = values;
    try {
      const res = await login({
        email,
        password,
      }).unwrap();
      if (res.data) {
        dispatch(setUser(res.data));
        dispatch(showNotification({type: 'success', content: res.message}));
        navigate('/dashboard');
      }
    } catch (error) {
      const err = error as ApiErrorResponse;

      if (err.errorCode === ErrorCode.EMAIL_ALREADY_REGISTERED_NOT_VERIFIED) {
        setCurrentModal('verify');
        dispatch(setRegisterEmail(email!));
        dispatch(showNotification({type: 'warning', content: err.message}));
      }
    }
  };
  const handleLoginWithGoogle = () => {
    window.location.href = `${env.API_BASE_URL}/auth/login/google`;
  };
  const handleLoginWithGithub = () => {
    window.location.href = `${env.API_BASE_URL}/auth/login/github`;
  };
  const handleLoginWithDiscord = () => {
    window.location.href = `${env.API_BASE_URL}/auth/login/discord`;
  };

  return (
    <Flex vertical gap='small'>
      <Form onFinish={onFinish} autoComplete='off' disabled={isLoading}>
        <Form.Item<FieldType>
          layout='vertical'
          label='Email'
          name='email'
          rules={[
            {required: true, message: 'Please input your email!'},
            {type: 'email', message: 'Invalid email!'},
          ]}
        >
          <Input prefix={<MdOutlineEmail />} autoComplete='username' />
        </Form.Item>

        <Form.Item<FieldType>
          layout='vertical'
          label='Password'
          name='password'
          rules={[{required: true, message: 'Please input your password!'}]}
        >
          <Input.Password prefix={<MdOutlinePassword />} autoComplete='current-password' />
        </Form.Item>

        <Form.Item label={null}>
          <Button type='primary' htmlType='submit' block>
            Login
          </Button>
          <Paragraph
            style={{
              margin: 0,
              marginTop: 8,
            }}
          >
            Don't have an account ?{' '}
            <Link
              style={{
                textDecoration: 'underline',
              }}
              onClick={() => setCurrentModal('register')}
              disabled={isLoading}
            >
              Register
            </Link>
          </Paragraph>
        </Form.Item>
      </Form>
      <Divider style={{margin: 0}}>OR</Divider>
      <Flex vertical gap='middle'>
        <ProviderButton provider='google' disabled={isLoading} onClick={handleLoginWithGoogle}>
          Continue with Google
        </ProviderButton>
        <ProviderButton provider='github' disabled={isLoading} onClick={handleLoginWithGithub}>
          Continue with GitHub
        </ProviderButton>
        <ProviderButton provider='discord' disabled={isLoading} onClick={handleLoginWithDiscord}>
          Continue with Discord
        </ProviderButton>
      </Flex>
    </Flex>
  );
};

export default LoginModalContent;
