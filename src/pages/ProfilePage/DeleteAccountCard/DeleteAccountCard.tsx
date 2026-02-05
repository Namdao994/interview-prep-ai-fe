import {useDeleteMyAccountMutation} from '@/store/apis/userApi';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {logout} from '@/store/slices/authSlice';
import {Button, Card, Flex, Form, Input, Modal, theme, Typography} from 'antd';
import {useState} from 'react';

const {Title, Paragraph, Text} = Typography;
type FiledType = {
  confirmationText: string;
};
const DeleteAccountCard = () => {
  const {
    token: {paddingLG, colorBgContainer, colorErrorBg, colorError, colorBgBlur},
  } = theme.useToken();

  const [isConfirmDeleteAccountModalOpen, setIsConfirmDeleteAccountModalOpen] = useState(false);
  const [deleteMyAccount, {isLoading: isDeleteMyAccountLoading}] = useDeleteMyAccountMutation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<FiledType>();
  const {user} = useAppSelector((state) => state.auth);
  const confirmValue = Form.useWatch('confirmationText', form);

  const handleDeleteAccount = async () => {
    await deleteMyAccount({confirmationText: form.getFieldValue('confirmationText')});
    setIsConfirmDeleteAccountModalOpen(false);
    dispatch(logout());
  };

  const CONFIRM_TEXT = `${user?.name}/${user?.email}`;
  return (
    <Card
      styles={{
        body: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }}
      style={{
        borderColor: colorError,
        background: `${colorBgContainer} linear-gradient(to right, ${colorErrorBg}, ${colorBgBlur})`,
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
        <Flex vertical>
          <Title level={5} type='danger'>
            Delete account
          </Title>
          <Paragraph>Permanently delete your account and all associated data. This action cannot be undone.</Paragraph>
        </Flex>

        <Button danger type='primary' onClick={() => setIsConfirmDeleteAccountModalOpen(true)}>
          Delete account
        </Button>
      </Flex>

      <Modal
        title='Delete account'
        open={isConfirmDeleteAccountModalOpen}
        onCancel={() => {
          setIsConfirmDeleteAccountModalOpen(false);
          form.resetFields();
        }}
        confirmLoading={isDeleteMyAccountLoading}
        onOk={handleDeleteAccount}
        okText='Delete'
        okButtonProps={{
          danger: true,
          type: 'primary',
          disabled: confirmValue !== CONFIRM_TEXT,
        }}
      >
        <Form form={form} layout='vertical'>
          <Paragraph>
            To confirm deletion, type{' '}
            <Text strong type='danger'>
              {CONFIRM_TEXT}
            </Text>{' '}
            below.
          </Paragraph>

          <Form.Item
            name='confirmationText'
            rules={[
              {
                validator: (_, value) =>
                  value === CONFIRM_TEXT
                    ? Promise.resolve()
                    : Promise.reject(new Error(`Type "${CONFIRM_TEXT}" to confirm`)),
              },
            ]}
          >
            <Input placeholder={`Type ${CONFIRM_TEXT} to confirm`} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default DeleteAccountCard;
