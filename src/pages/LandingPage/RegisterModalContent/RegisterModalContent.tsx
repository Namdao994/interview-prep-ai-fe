import MdOutlineEmail from '@/assets/icon/MdOutlineEmail';
import MdOutlinePassword from '@/assets/icon/MdOutlinePassword';
import {Button, Form, Input, Typography, Upload} from 'antd';
import type {FormProps} from 'antd';
import type {ModalType} from '../types';
import AiOutlineUser from '@/assets/icon/AiOutlineUser';
import FaPlus from '@/assets/icon/FaPlus';
import {useState} from 'react';
import PreviewAvatar from '@/components/PreviewAvatar/PreviewAvatar';
import {useRegisterMutation} from '@/store/apis/authApi';
import type {ApiErrorResponse} from '@/shared/types/api';
import {ErrorCode} from '@/constants/errorCodes';
import {useAppDispatch} from '@/store/hooks';
import {showNotification} from '@/store/slices/notificationSlice';
import {setRegisterEmail} from '@/store/slices/authSlice';
type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const {Paragraph, Link} = Typography;
type RegisterModalContentProps = {
  setCurrentModal: React.Dispatch<React.SetStateAction<ModalType>>;
};

const RegisterModalContent: React.FC<RegisterModalContentProps> = ({setCurrentModal}) => {
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>();
  const [register, {isLoading: isRegisterLoading}] = useRegisterMutation();
  const [form] = Form.useForm<FieldType>();
  const dispatch = useAppDispatch();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (!values) return;
    const {email, name, password} = values;

    try {
      const formData = new FormData();
      formData.append('email', email!);
      formData.append('name', name!);
      formData.append('password', password!);

      if (avatarFile) {
        formData.append('profileImageFile', avatarFile);
      }

      await register(formData).unwrap();
      setCurrentModal('verify');
      dispatch(setRegisterEmail(email!));
    } catch (error) {
      const err = error as ApiErrorResponse;

      if (err.errorCode === ErrorCode.EMAIL_ALREADY_REGISTERED_NOT_VERIFIED) {
        dispatch(setRegisterEmail(email!));
        setCurrentModal('verify');
        dispatch(showNotification({type: 'warning', content: err.message}));
      }
      if (err.errorCode === ErrorCode.EMAIL_ALREADY_VERIFIED) {
        setCurrentModal('login');
        dispatch(showNotification({type: 'warning', content: err.message}));
      }
    } finally {
      setAvatarFile(null);
      form.resetFields();
    }
  };
  const beforeUploadAvatar = (file: File) => {
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewAvatarUrl(reader.result as string);
    };

    reader.readAsDataURL(file);

    return false;
  };
  console.log('previewAvatarUrl', previewAvatarUrl);
  const handleDeletePreviewAvatar = () => {
    setPreviewAvatarUrl('');
  };
  return (
    <Form onFinish={onFinish} autoComplete='off' disabled={isRegisterLoading} form={form}>
      <Form.Item<FieldType>
        layout='vertical'
        label='Avatar'
        valuePropName='filelist'
        getValueFromEvent={(e) => e?.filelist}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: 102,
          }}
        >
          {previewAvatarUrl ? (
            <PreviewAvatar
              previewAvatarUrl={previewAvatarUrl}
              onDeletePreviewAvatar={handleDeletePreviewAvatar}
              isLoadingForm={isRegisterLoading}
            />
          ) : (
            <Upload
              listType='picture-circle'
              accept='image/*'
              showUploadList={false}
              maxCount={1}
              beforeUpload={beforeUploadAvatar}
            >
              <button type='button' style={{border: 0, background: 'none', cursor: 'pointer'}}>
                <FaPlus />
                <div style={{marginTop: 8}}>Upload</div>
              </button>
            </Upload>
          )}
        </div>
      </Form.Item>

      <Form.Item<FieldType>
        layout='vertical'
        label='Username'
        name='name'
        rules={[
          {required: true, message: 'Please input your name!'},
          {type: 'string', min: 3, max: 20, message: 'Username must be 3-20 characters'},
        ]}
      >
        <Input prefix={<AiOutlineUser />} autoComplete='username' />
      </Form.Item>
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
        rules={[
          {required: true, message: 'Please input your password!'},
          {type: 'string', min: 8, message: 'Password must be at least 8 characters'},
        ]}
      >
        <Input.Password prefix={<MdOutlinePassword />} autoComplete='new-password' />
      </Form.Item>

      <Form.Item<FieldType>
        layout='vertical'
        label='Confirm password'
        name='confirmPassword'
        dependencies={['password']}
        rules={[
          {required: true, message: 'Please confirm your password'},
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<MdOutlinePassword />} autoComplete='new-password' />
      </Form.Item>

      <Form.Item label={null}>
        <Button type='primary' htmlType='submit' block>
          Register
        </Button>
        <Paragraph
          style={{
            margin: 0,
            marginTop: 8,
          }}
        >
          Already an account?{' '}
          <Link
            style={{
              textDecoration: 'underline',
            }}
            onClick={() => setCurrentModal('login')}
            disabled={isRegisterLoading}
          >
            Login
          </Link>
        </Paragraph>
      </Form.Item>
    </Form>
  );
};

export default RegisterModalContent;
