import MdOutlinePassword from '@/assets/icon/MdOutlinePassword';
import {useChangePasswordMutation} from '@/store/apis/authApi';
import {Button, Card, Divider, Form, Input, theme, type FormProps} from 'antd';
type FieldType = {
  oldPassword?: string;
  newPassword?: string;
};
const SecuritySettingsSection = () => {
  const [securityForm] = Form.useForm();
  const {
    token: {paddingLG},
  } = theme.useToken();
  const [changePassword, {isLoading: isChangePasswordLoading}] = useChangePasswordMutation();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (!values) return;
    changePassword({password: values.oldPassword!, newPassword: values.newPassword!})
      .unwrap()
      .then(() => {
        securityForm.resetFields();
      });
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
      <Form
        onFinish={onFinish}
        autoComplete='off'
        labelCol={{span: 8}}
        wrapperCol={{span: 18}}
        labelAlign='left'
        form={securityForm}
        disabled={isChangePasswordLoading}
      >
        <Form.Item<FieldType>
          label='Password'
          name='oldPassword'
          rules={[
            {required: true, message: 'Please input your password!'},
            {type: 'string', min: 8, message: 'Password must be at least 8 characters'},
          ]}
          style={{
            paddingLeft: paddingLG,
            paddingRight: paddingLG,
          }}
        >
          <Input.Password prefix={<MdOutlinePassword />} autoComplete='new-password' />
        </Form.Item>
        <Divider />
        <Form.Item<FieldType>
          label='New password'
          name='newPassword'
          rules={[
            {required: true, message: 'Please input your new password!'},
            {type: 'string', min: 8, message: 'Password must be at least 8 characters'},
          ]}
          style={{
            paddingLeft: paddingLG,
            paddingRight: paddingLG,
          }}
        >
          <Input.Password prefix={<MdOutlinePassword />} autoComplete='new-password' />
        </Form.Item>
        <Divider />

        <Form.Item shouldUpdate noStyle>
          {() => (
            <div
              style={{
                paddingLeft: paddingLG,
                paddingRight: paddingLG,
                textAlign: 'right',
              }}
            >
              <Button
                type='primary'
                htmlType='submit'
                disabled={!securityForm.isFieldsTouched()}
                loading={isChangePasswordLoading}
              >
                Save
              </Button>
            </div>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SecuritySettingsSection;
