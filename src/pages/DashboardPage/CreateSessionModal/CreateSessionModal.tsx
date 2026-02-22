import type {FieldTypeSessionCreateForm} from '@/shared/types/session';
import {useCreateSessionMutation} from '@/store/apis/sessionApi';
import {Button, Form, Input, InputNumber, Modal, type FormProps, type ModalProps} from 'antd';
import {useNavigate} from 'react-router';

type CreateSessionModalProps = ModalProps;

const CreateSessionModal = ({...props}: CreateSessionModalProps) => {
  const navigate = useNavigate();
  const [createSession] = useCreateSessionMutation();
  const onFinish: FormProps<FieldTypeSessionCreateForm>['onFinish'] = async (values) => {
    try {
      const createSessionResult = await createSession(values).unwrap();
      console.log('createSessionResult', createSessionResult);
      const sessionId = createSessionResult?.data.id;
      navigate(`/dashboard/session/${sessionId}`);
    } catch {
      /* empty */
    }
  };
  return (
    <Modal {...props}>
      <Form
        layout='vertical'
        onFinish={onFinish}
        autoComplete='off'
        initialValues={{
          targetRole: 'Frontend Developer',
          experience: 1,
          topicsToFocus: 'React, javascript, html, tailwindcss',
          description: 'Goal',
        }}
      >
        <Form.Item<FieldTypeSessionCreateForm>
          label='Target role'
          name='targetRole'
          rules={[{required: true, message: 'Please input your role!'}]}
        >
          <Input placeholder='(e.g., Frontend Developer, UI/UX Designer, etc.)' />
        </Form.Item>
        <Form.Item<FieldTypeSessionCreateForm>
          label='Experience'
          name='experience'
          rules={[{required: true, message: 'Please input your experience!'}]}
        >
          <InputNumber
            min={1}
            max={10}
            placeholder='(e.g., 1 year, 3 years, 5+ years)'
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item<FieldTypeSessionCreateForm>
          label='Topics to focus'
          name='topicsToFocus'
          rules={[
            {required: true, message: 'Please input your topic!'},
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();

                const isValid = value
                  .split(',')
                  .map((item: string) => item.trim())
                  .every((item: string) => item.length > 0);

                return isValid
                  ? Promise.resolve()
                  : Promise.reject(new Error('Topics must be comma-separated values (e.g., React, Node.js, MongoDB)'));
              },
            },
          ]}
        >
          <Input placeholder='(Comma-separated, e.g., React, Node.js, MongoDB)' />
        </Form.Item>
        <Form.Item<FieldTypeSessionCreateForm>
          label='Description'
          name='description'
          rules={[{required: true, message: 'Please input your description!'}]}
        >
          <Input placeholder='(Any specific goals or notes for this session)' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateSessionModal;
