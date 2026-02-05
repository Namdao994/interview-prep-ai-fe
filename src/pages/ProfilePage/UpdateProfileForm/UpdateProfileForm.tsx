import AiOutlineUser from '@/assets/icon/AiOutlineUser';
import {useUpdateUserMutation} from '@/store/apis/userApi';
import {useAppDispatch} from '@/store/hooks';
import {changeUsername} from '@/store/slices/authSlice';
import {Button, Card, Divider, Form, Input, theme, type FormProps} from 'antd';
type FieldType = {
  name?: string;
};
const UpdateProfileForm = () => {
  const {
    token: {paddingLG},
  } = theme.useToken();
  const [profileForm] = Form.useForm();
  const [updateUser, {isLoading: isUpdateUserLoading}] = useUpdateUserMutation();
  const dispatch = useAppDispatch();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (!values) return;
    const res = await updateUser({name: values.name!}).unwrap();
    dispatch(changeUsername(res.name));
    profileForm.resetFields();
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
        form={profileForm}
        disabled={isUpdateUserLoading}
      >
        <Form.Item<FieldType>
          label='Username'
          name='name'
          rules={[
            {required: true, message: 'Please input your name!'},
            {type: 'string', min: 3, max: 20, message: 'Username must be 3-20 characters'},
          ]}
          style={{
            paddingLeft: paddingLG,
            paddingRight: paddingLG,
          }}
        >
          <Input prefix={<AiOutlineUser />} />
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
                disabled={!profileForm.isFieldsTouched()}
                loading={isUpdateUserLoading}
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

export default UpdateProfileForm;
