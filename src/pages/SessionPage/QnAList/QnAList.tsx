import {Button, Card, Collapse, Flex, Skeleton, theme, Typography} from 'antd';
import type {CollapseProps} from 'antd';
import './QnAList.css';
import QuestionPanelActions from './QuestionPanelActions/QuestionPanelActions';
import {useResponsive} from '@/hooks/useResponsive';
import useDrawerSize from '../hooks/useDrawerSize';
import {CONTAINER_PADDING_RIGHT_OFFSET} from '../constants';
import type {Question} from '@/shared/types/question';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {oneLight, oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import FaStopCircle from '@/assets/icon/FaStopCircle';
import {useEffect, useMemo, useRef} from 'react';
import {useInView} from 'react-intersection-observer';

type QnAListProps = {
  onShowExtraAnswerDrawer: (questionId: string) => void;
  openExtraAnswerDrawer: boolean;
  questions?: Question[];
  sessionId?: string;
  isSseOpen: boolean;
  isLoadingFetchDetailSession: boolean;
  stopSSE: () => void;
  onDone: () => void;
  onLoadMoreQuestion: () => void;
};
const {Title, Text} = Typography;
const QnAList: React.FC<QnAListProps> = ({
  openExtraAnswerDrawer,
  onShowExtraAnswerDrawer,
  questions,
  isSseOpen,
  stopSSE,
  onDone,
  onLoadMoreQuestion,
  sessionId,
  isLoadingFetchDetailSession,
}) => {
  const {
    token: {marginSM, paddingLG, colorBgContainer, colorFillAlter, borderRadiusLG, colorBgBase, fontSizeSM, marginXS},
  } = theme.useToken();
  const isDark = colorBgBase === '#000';
  const {sizeDrawer} = useDrawerSize();
  const {isLg} = useResponsive();
  console.log('questions', questions);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const {ref: inViewRef, inView} = useInView({
    threshold: 1,
  });
  useEffect(() => {
    if (!inView) return;
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [questions?.length, inView]);
  const hasExtraOptions = !isSseOpen;
  const items: CollapseProps['items'] = useMemo(() => {
    if (!questions) return [];
    return questions.map((question, index) => ({
      key: question.id,
      label: (
        <Title level={5}>
          {index + 1}. {question.question}
        </Title>
      ),
      children: (
        <div
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            padding: paddingLG,
          }}
        >
          {question.answer.blocks.map((block, blockIndex) => {
            if (block.type === 'code') {
              return (
                <Card
                  key={blockIndex}
                  title={<Text style={{fontSize: fontSizeSM}}>{block.language}</Text>}
                  size='small'
                  extra={<Text copyable={{text: block.content}} />}
                  styles={{
                    root: {marginBottom: marginXS},
                    body: {padding: 0},
                  }}
                >
                  <SyntaxHighlighter
                    language={block.language}
                    style={isDark ? oneDark : oneLight}
                    showLineNumbers
                    customStyle={{margin: 0}}
                  >
                    {block.content}
                  </SyntaxHighlighter>
                </Card>
              );
            }

            return (
              <p key={blockIndex} style={{marginBottom: marginXS}}>
                {block.content}
              </p>
            );
          })}
        </div>
      ),
      style: {
        border: 'none',
        marginBottom: 24,
        background: colorFillAlter,
        borderRadius: borderRadiusLG,
      },
      extra: hasExtraOptions && (
        <QuestionPanelActions
          onShowExtraAnswerDrawer={onShowExtraAnswerDrawer}
          sessionId={sessionId}
          question={question}
        />
      ),
    }));
  }, [
    questions,
    colorBgContainer,
    borderRadiusLG,
    paddingLG,
    marginXS,
    isDark,
    colorFillAlter,
    onShowExtraAnswerDrawer,
    fontSizeSM,
    sessionId,
    hasExtraOptions,
  ]);
  let widthCollapse = '100%';
  if (isLg) widthCollapse = '70%';
  if (isLg && openExtraAnswerDrawer)
    widthCollapse = `calc(100% - ${sizeDrawer}px + ${CONTAINER_PADDING_RIGHT_OFFSET}px)`;

  return (
    <>
      {isLoadingFetchDetailSession ? (
        <>
          {[...Array(2)].map((_, index) => (
            <Skeleton
              key={index}
              active
              style={{
                width: widthCollapse,
                marginTop: marginSM,
              }}
            />
          ))}
        </>
      ) : (
        <Collapse
          items={items}
          expandIconPlacement='end'
          bordered={false}
          style={{
            width: widthCollapse,
            marginTop: marginSM,
            background: colorBgContainer,
          }}
          styles={{
            header: {
              gap: isLg ? marginSM : 0,
            },
          }}
          className={isLg ? 'faq-list-lg' : undefined}
        />
      )}
      <div
        ref={(el) => {
          bottomRef.current = el;
          inViewRef(el);
        }}
        style={{
          paddingBottom: paddingLG,
          width: widthCollapse,
        }}
      >
        {isSseOpen ? (
          <>
            <Skeleton active />
            <Flex
              style={{
                justifyContent: 'center',
              }}
            >
              <Button
                type='primary'
                icon={<FaStopCircle />}
                onClick={() => {
                  stopSSE();
                  onDone();
                }}
              >
                Stop
              </Button>
            </Flex>
          </>
        ) : (
          <Flex
            style={{
              justifyContent: 'center',
            }}
          >
            <Button type='primary' onClick={onLoadMoreQuestion} disabled={isLoadingFetchDetailSession}>
              More Questions
            </Button>
          </Flex>
        )}
      </div>
    </>
  );
};

export default QnAList;
