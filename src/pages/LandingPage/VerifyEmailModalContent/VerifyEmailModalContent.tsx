import {useResponsive} from '@/hooks/useResponsive';
import {Button, Form, Input, theme, Typography} from 'antd';
import type {FormProps} from 'antd';
import React, {useState} from 'react';
import {MdOutlineAttachEmail} from 'react-icons/md';
import type {ModalType} from '../types';
import {useVerifyEmailOtpMutation} from '@/store/apis/authApi';
import {useAppSelector} from '@/store/hooks';

type FieldType = {
  code: string;
};
const {Paragraph} = Typography;
const OTP_LENGTH = 6;
type VerifyEmailModalContentProps = {
  setCurrentModal: React.Dispatch<React.SetStateAction<ModalType>>;
};
const VerifyEmailModalContent: React.FC<VerifyEmailModalContentProps> = ({setCurrentModal}) => {
  const [isValid, setIsValid] = useState(false);
  const [verifyEmailOtp, {isLoading: isVerifyEmailOtpLoading}] = useVerifyEmailOtpMutation();
  const {registerEmail} = useAppSelector((state) => state.auth);
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (!values || !registerEmail) return;
    await verifyEmailOtp({email: registerEmail, code: values.code});
    setCurrentModal('login');
  };
  const {
    token: {sizeXXL, colorTextDisabled, colorPrimary, sizeMS},
  } = theme.useToken();
  const {isXs} = useResponsive();
  return (
    <Form
      onFinish={onFinish}
      autoComplete='off'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: sizeMS,
      }}
    >
      <MdOutlineAttachEmail size={sizeXXL * 2} color={isValid ? colorPrimary : colorTextDisabled} />
      <Paragraph
        style={{
          textAlign: 'center',
        }}
      >
        We've sent a 6-digit verification code to your email.
        <br /> Enter it below to continue.
      </Paragraph>
      <Form.Item<FieldType> layout='vertical' name='code'>
        <Input.OTP
          separator={() => <span>—</span>}
          length={OTP_LENGTH}
          onInput={(value) => {
            setIsValid(value.length === OTP_LENGTH);
          }}
          formatter={(str) => str.toUpperCase()}
          size={isXs ? 'middle' : 'small'}
          disabled={isVerifyEmailOtpLoading}
        />
      </Form.Item>

      <Button
        type='primary'
        style={{
          width: 104,
        }}
        disabled={!isValid}
        htmlType='submit'
        size='large'
        loading={isVerifyEmailOtpLoading}
      >
        Verify
      </Button>
    </Form>
  );
};

export default VerifyEmailModalContent;
