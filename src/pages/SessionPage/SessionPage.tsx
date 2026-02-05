import FaCalendarAlt from '@/assets/icon/FaCalendarAlt';
import FaRegClock from '@/assets/icon/FaRegClock';
import MdOutlineQuestionAnswer from '@/assets/icon/MdOutlineQuestionAnswer';
import ContainerResponsive from '@/components/ContainerResponsive/ContainerResponsive';
import {Button, Flex, Modal, Tag, theme, Typography} from 'antd';
import {useEffect, useState} from 'react';
import QnAList from './QnAList/QnAList';
import QnAExplanationDrawer from './QnAExplanationDrawer/QnAExplanationDrawer';
import {
  generateQuestionsApi,
  sessionApi,
  useArchiveSessionMutation,
  useDeleteSessionMutation,
  useGenerateExplanationMutation,
  useSessionDetailQuery,
  useUpdateSessionMutation,
} from '@/store/apis/sessionApi';
import {Navigate, useNavigate, useParams} from 'react-router';
import LoadingSessionOverview from './LoadingSessionOverview/LoadingSessionOverview';
import {formatSessionDateFullMonth} from '@/utils/date';
import useQuestionSSE from './hooks/useQuestionSSE';
import type {Question} from '@/shared/types/question';
import {useAppDispatch} from '@/store/hooks';
import {
  addDiscussion,
  setCurrentQuestionId,
  setCurrentSessionId,
  setDiscussionQuestion,
  setInitialDiscussion,
  setInitialLoading,
} from '@/store/slices/detailSessionPageSlice';
import FiTrash from '@/assets/icon/FiTrash';
import FaBoxArchive from '@/assets/icon/FaBoxArchive';
const {Text, Title, Paragraph} = Typography;

const SessionPage = () => {
  const [openExtraAnswerDrawer, setOpenExtraAnswerDrawer] = useState(false);
  const {
    token: {
      colorPrimary,
      fontSizeHeading3,
      fontSizeHeading4,
      fontSizeSM,
      marginSM,
      marginXXL,
      colorBgContainer,
      colorPrimaryBg,
      colorBgBlur,
      paddingMD,
    },
  } = theme.useToken();
  const navigate = useNavigate();
  const [isConfirmDeleteSessionModalOpen, setIsConfirmDeleteSessionModalOpen] = useState(false);
  const [isConfirmArchiveSessionModalOpen, setIsConfirmArchiveSessionModalOpen] = useState(false);
  const [deleteSession, {isLoading: isDeleteSessionLoading, isSuccess: isDeleteSessionSuccess}] =
    useDeleteSessionMutation();
  const [archiveSession, {isLoading: isArchiveSessionLoading, isSuccess: isArchiveSessionSuccess}] =
    useArchiveSessionMutation();
  useEffect(() => {
    if (isDeleteSessionSuccess || isArchiveSessionSuccess) {
      navigate('/dashboard', {replace: true});
    }
  }, [isDeleteSessionSuccess, isArchiveSessionSuccess, navigate]);
  const dispatch = useAppDispatch();
  const {id} = useParams<{id: string}>();
  const shouldSkipDetail = !id || isDeleteSessionSuccess || isArchiveSessionSuccess;
  const {
    data: session,
    error,
    isLoading: isLoadingFetchDetailSession,
  } = useSessionDetailQuery(id!, {
    skip: shouldSkipDetail,
  });
  const [updateSession] = useUpdateSessionMutation();
  const [generateExplanation] = useGenerateExplanationMutation();

  const onDone = () => {
    if (!session) return;
    updateSession({id: session.id, updateDto: {setupStatus: 'READY'}});
  };
  const {isSseOpen, stopSSE, setIsSseOpen, eventSourceRef} = useQuestionSSE({
    session,
    onDone,
  });
  if (!id) {
    return <Navigate to='/404' replace />;
  }
  if (error) {
    return <Navigate to='/404' replace />;
  }
  // console.log('data', data);
  const handleShowExtraAnswerDrawer = async (questionId: string) => {
    setOpenExtraAnswerDrawer(true);
    if (!session) return;
    const question = session.questions.find((q) => q.id === questionId);
    dispatch(setInitialDiscussion(question?.discussion ?? []));
    dispatch(setDiscussionQuestion(question?.question ?? ''));
    dispatch(setCurrentSessionId(session.id));
    dispatch(setCurrentQuestionId(question?.id as string));
    const hasAssistantAnswer = question?.discussion?.some((d) => d.role === 'assistant');
    if (hasAssistantAnswer) return;

    dispatch(setInitialLoading(true));
    const res = await generateExplanation({
      sessionId: session.id,
      questionId,
    }).unwrap();
    // 3. Push message mới vào discussion
    dispatch(setInitialLoading(false));
    dispatch(addDiscussion(res.data));
  };

  const handleCloseExtraAnswerDrawer = () => {
    setOpenExtraAnswerDrawer(false);
  };

  const handleLoadMoreQuestion = () => {
    if (!session) return;
    const es = generateQuestionsApi(session.id);
    eventSourceRef.current = es;
    es.addEventListener('open', () => {
      setIsSseOpen(true);
    });

    es.addEventListener('DONE', () => {
      setIsSseOpen(false);
      eventSourceRef.current = null;
      es.close();
      onDone();
    });

    es.addEventListener('error', () => {
      eventSourceRef.current = null;
      setIsSseOpen(false);
    });
    es.addEventListener('QNA_CREATED', (event) => {
      if (!session) return;
      const data = JSON.parse(event.data) as Question;
      dispatch(
        sessionApi.util.updateQueryData('sessionDetail', session?.id, (draft) => {
          if (!draft.questions.some((q) => q.id === data.id)) {
            draft.questions.push(data);
          }
        }),
      );
    });
  };

  const handleConfirmDeleteSession = async () => {
    if (!session) return;
    await deleteSession({id: session.id}).unwrap();
    setIsConfirmDeleteSessionModalOpen(false);
  };

  const handleConfirmArchiveSession = async () => {
    if (!session) return;
    await archiveSession({id: session.id}).unwrap();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        flex: 1,
        overflow: 'auto',
      }}
    >
      <Flex
        vertical
        style={{
          background: `${colorBgContainer} linear-gradient(to right, ${colorPrimaryBg}, ${colorBgBlur})`,
          justifyContent: 'center',
          paddingTop: paddingMD,
          paddingBottom: paddingMD,
        }}
      >
        <ContainerResponsive>
          {isLoadingFetchDetailSession ? (
            <LoadingSessionOverview />
          ) : (
            <Flex justify='space-between' wrap gap='middle'>
              <Flex vertical>
                <Title
                  level={2}
                  style={{
                    margin: 0,
                    fontSize: fontSizeHeading3,
                  }}
                >
                  {session?.targetRole}
                </Title>
                <Text
                  style={{
                    fontSize: fontSizeSM,
                  }}
                >
                  {session?.topicsToFocus}
                </Text>
                <Flex
                  gap='middle'
                  style={{
                    marginTop: marginSM,
                  }}
                >
                  <Tag icon={<FaRegClock />} color={colorPrimary} variant='outlined'>
                    Exp: {session?.experience} {Number(session?.experience) > 1 ? 'Years' : 'Year'}
                  </Tag>
                  <Tag icon={<MdOutlineQuestionAnswer />} color={colorPrimary} variant='outlined'>
                    {session?.questions.length} Q&A{Number(session?.questions.length) > 1 ? 's' : ''}
                  </Tag>
                  <Tag icon={<FaCalendarAlt />} color={colorPrimary} variant='outlined'>
                    Latest: {formatSessionDateFullMonth(session?.updatedAt ?? '')}
                  </Tag>
                </Flex>
                <Paragraph
                  style={{
                    marginTop: marginSM,
                    marginBottom: 0,
                    width: '75%',
                  }}
                >
                  {session?.description}
                </Paragraph>
              </Flex>
              <Flex gap='small'>
                <Button
                  icon={<FaBoxArchive />}
                  color='primary'
                  variant='outlined'
                  onClick={() => setIsConfirmArchiveSessionModalOpen(true)}
                  disabled={isSseOpen}
                >
                  Archive
                </Button>
                <Button
                  icon={<FiTrash />}
                  color='danger'
                  variant='solid'
                  onClick={() => setIsConfirmDeleteSessionModalOpen(true)}
                  disabled={isSseOpen}
                >
                  Delete
                </Button>
              </Flex>
            </Flex>
          )}
        </ContainerResponsive>
      </Flex>
      <ContainerResponsive>
        <Title
          level={3}
          style={{
            margin: 0,
            fontSize: fontSizeHeading4,
            marginTop: marginXXL,
          }}
        >
          Interview Q & A
        </Title>

        <QnAList
          onShowExtraAnswerDrawer={handleShowExtraAnswerDrawer}
          openExtraAnswerDrawer={openExtraAnswerDrawer}
          questions={session?.questions}
          sessionId={session?.id}
          isSseOpen={isSseOpen}
          stopSSE={stopSSE}
          onDone={onDone}
          onLoadMoreQuestion={handleLoadMoreQuestion}
          isLoadingFetchDetailSession={isLoadingFetchDetailSession}
        />
      </ContainerResponsive>
      <QnAExplanationDrawer
        handleCloseExtraAnswerDrawer={handleCloseExtraAnswerDrawer}
        openExtraAnswerDrawer={openExtraAnswerDrawer}
      />
      <Modal
        title='Are you sure delete this sessions?'
        open={isConfirmDeleteSessionModalOpen}
        onOk={handleConfirmDeleteSession}
        confirmLoading={isDeleteSessionLoading}
        onCancel={() => setIsConfirmDeleteSessionModalOpen(false)}
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
      />
      <Modal
        title='Are you sure archive this sessions?'
        open={isConfirmArchiveSessionModalOpen}
        onOk={handleConfirmArchiveSession}
        confirmLoading={isArchiveSessionLoading}
        onCancel={() => setIsConfirmArchiveSessionModalOpen(false)}
        centered
        okText='Archive'
        okButtonProps={{
          type: 'primary',
        }}
        mask={{blur: false}}
        width={{
          xs: '50%',
          sm: '50%',
          md: '50%',
        }}
      />
    </div>
  );
};

export default SessionPage;
