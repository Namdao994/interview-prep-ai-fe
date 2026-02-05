import FaEllipsis from '@/assets/icon/FaEllipsis';
import FiTrash from '@/assets/icon/FiTrash';
import LuSparkles from '@/assets/icon/LuSparkles';
import RiPushpinFill from '@/assets/icon/RiPushpinFill';
import RiUnpinFill from '@/assets/icon/RiUnpinFill';
import {useResponsive} from '@/hooks/useResponsive';
import type {Question} from '@/shared/types/question';
import {useDeleteQuestionMutation, useUpdateQuestionPinMutation} from '@/store/apis/sessionApi';
import {useAppDispatch} from '@/store/hooks';
import {showNotification} from '@/store/slices/notificationSlice';
import {Button, Dropdown, Flex, Modal, Popconfirm, theme} from 'antd';
import type {MenuProps, ModalProps, PopconfirmProps} from 'antd';
import type React from 'react';
import {useState} from 'react';

type QuestionPanelActionsProps = {
  onShowExtraAnswerDrawer: (questionId: string) => void;
  sessionId?: string;
  question: Question;
};
const QuestionPanelActions: React.FC<QuestionPanelActionsProps> = ({onShowExtraAnswerDrawer, sessionId, question}) => {
  const {
    token: {fontSizeSM, cyan5, purple5, red5, marginSM},
  } = theme.useToken();
  const [deleteQuestion, {isLoading: isLoadingDeleteQuestion}] = useDeleteQuestionMutation();
  const [togglePinQuestion] = useUpdateQuestionPinMutation();
  const {isLg} = useResponsive();
  const [openDeleteQuestionModal, setOpenDeleteQuestionModal] = useState(false);
  const dispatch = useAppDispatch();
  const items: MenuProps['items'] = [
    {
      key: 'learn-more',
      label: <span>Learn More</span>,
      icon: <LuSparkles />,
      style: {
        color: cyan5,
        userSelect: 'none',
      },
    },
    {
      key: 'pin',
      label: <span>{question.isPinned ? 'Unpin' : 'Pin'}</span>,
      icon: question.isPinned ? <RiUnpinFill /> : <RiPushpinFill />,
      style: {
        color: purple5,
        userSelect: 'none',
      },
    },
    {
      key: 'delete',
      label: <span>Delete</span>,
      icon: <FiTrash />,
      style: {
        color: red5,
        userSelect: 'none',
      },
    },
  ];
  const handleConfirmDeleteQuestionModal: ModalProps['onOk'] = async (e) => {
    if (!question.id || !sessionId) return;
    e.stopPropagation();
    const res = await deleteQuestion({sessionId, questionId: question.id}).unwrap();
    dispatch(showNotification({type: 'success', content: res.message}));
  };
  const handleCancelDeleteQuestionModal: ModalProps['onCancel'] = (e) => {
    e.stopPropagation();
    setOpenDeleteQuestionModal(false);
  };
  const handleConfirmDeleteQuestion: PopconfirmProps['onConfirm'] = async (e) => {
    if (!question.id || !sessionId) return;
    e?.stopPropagation();
    const res = await deleteQuestion({sessionId, questionId: question.id}).unwrap();
    console.log('res', res);
    dispatch(showNotification({type: 'success', content: res.message}));
  };
  const handleCancelDeleteQuestion: PopconfirmProps['onCancel'] = (e) => {
    e?.stopPropagation();
  };
  const handleTogglePinQuestion = async (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!question.id || !sessionId) return;
    e?.stopPropagation();
    await togglePinQuestion({sessionId, questionId: question.id, isPinned: !question.isPinned});
  };
  const onClick: MenuProps['onClick'] = ({key, domEvent}) => {
    domEvent.stopPropagation();
    if (key === 'learn-more') {
      onShowExtraAnswerDrawer(question.id);
    }
    if (key === 'delete') {
      setOpenDeleteQuestionModal(true);
    }
    if (key === 'pin') {
      handleTogglePinQuestion();
    }
  };

  return (
    <>
      {isLg ? (
        <Flex gap='small'>
          <Popconfirm
            title='Delete the question'
            description='Are you sure to delete this question?'
            okText='Delete'
            cancelText='Cancel'
            onConfirm={handleConfirmDeleteQuestion}
            okButtonProps={{type: 'primary', danger: true, loading: isLoadingDeleteQuestion}}
            onCancel={handleCancelDeleteQuestion}
          >
            <Button
              size='small'
              onClick={(e) => {
                e.stopPropagation();
              }}
              color='danger'
              variant='filled'
              icon={<FiTrash />}
              style={{
                fontSize: fontSizeSM,
                userSelect: 'none',
              }}
            >
              Delete
            </Button>
          </Popconfirm>
          <Button
            size='small'
            onClick={handleTogglePinQuestion}
            color='purple'
            variant='filled'
            icon={question.isPinned ? <RiUnpinFill /> : <RiPushpinFill />}
            style={{
              fontSize: fontSizeSM,
              userSelect: 'none',
            }}
          >
            {question.isPinned ? 'Unpin' : 'Pin'}
          </Button>
          <Button
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              onShowExtraAnswerDrawer(question.id);
            }}
            color='cyan'
            variant='filled'
            icon={<LuSparkles />}
            style={{
              fontSize: fontSizeSM,
              userSelect: 'none',
            }}
          >
            Learn More
          </Button>
        </Flex>
      ) : (
        <>
          <Dropdown menu={{items, onClick}} placement='topRight' trigger={['click']}>
            <Button
              variant='filled'
              size='small'
              icon={<FaEllipsis />}
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{
                marginLeft: marginSM,
              }}
            />
          </Dropdown>
          <Modal
            title='Delete the question'
            open={openDeleteQuestionModal}
            onOk={handleConfirmDeleteQuestionModal}
            confirmLoading={isLoadingDeleteQuestion}
            onCancel={handleCancelDeleteQuestionModal}
            centered
            okText='Delete'
            okButtonProps={{
              type: 'primary',
              danger: true,
            }}
            mask={{blur: false}}
            width={{
              xs: '50%',
              sm: '50%',
              md: '50%',
            }}
          >
            <p>Are you sure to delete this question?</p>
          </Modal>
        </>
      )}
    </>
  );
};

export default QuestionPanelActions;
