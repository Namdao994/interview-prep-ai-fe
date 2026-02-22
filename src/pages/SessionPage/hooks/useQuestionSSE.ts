import type {Question} from '@/shared/types/question';
import type {Session} from '@/shared/types/session';
import {generateQuestionsApi, sessionApi} from '@/store/apis/sessionApi';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router';
type UseQuestionSSEParams = {
  session?: Session;
  onDone: () => void;
};

const useQuestionSSE = ({session, onDone}: UseQuestionSSEParams) => {
  const {id: sessionId} = useParams<{id: string}>();
  const navigate = useNavigate();
  const eventSourceRef = useRef<EventSource | null>(null);
  const [isSseOpen, setIsSseOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {accessToken} = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!sessionId || !accessToken) {
      navigate('/404');
      return;
    }

    if (!session || session.setupStatus === 'READY') {
      return;
    }

    if (eventSourceRef.current) {
      return;
    }

    const es = generateQuestionsApi(sessionId, accessToken);

    eventSourceRef.current = es;

    es.addEventListener('open', () => {
      setIsSseOpen(true);
    });

    es.addEventListener('DONE', () => {
      setIsSseOpen(false);
      es.close();
      eventSourceRef.current = null;
      onDone();
    });

    es.addEventListener('error', () => {
      setIsSseOpen(false);
      es.close();
      eventSourceRef.current = null;
    });

    es.addEventListener('QNA_CREATED', (event) => {
      const data = JSON.parse(event.data) as Question;
      dispatch(
        sessionApi.util.updateQueryData('sessionDetail', sessionId, (draft) => {
          if (!draft.questions.some((q) => q.id === data.id)) {
            draft.questions.push(data);
          }
        }),
      );
    });

    return () => {
      setIsSseOpen(false);
      es.close();
      eventSourceRef.current = null;
    };
  }, [sessionId, session?.setupStatus, session?.id, navigate]);
  const stopSSE = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      setIsSseOpen(false);
    }
  };
  return {isSseOpen, stopSSE, setIsSseOpen, eventSourceRef};
};

export default useQuestionSSE;
