import {Button, Card, Drawer, Flex, Form, Input, Skeleton, theme, Typography, type FormProps} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {useResponsive} from '@/hooks/useResponsive';
import useDrawerSize from '../hooks/useDrawerSize';
import {useWindowSize} from 'usehooks-ts';
import {clamp} from '@/utils/math';
import {DRAWER_MAX_RATIO, DRAWER_MIN_RATIO} from '../constants';
import IoSend from '@/assets/icon/IoSend';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {oneLight, oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {addDiscussion} from '@/store/slices/detailSessionPageSlice';
import type {Discussion} from '@/shared/types/question';
import {useAnswerFollowUpMutation} from '@/store/apis/sessionApi';
type ChatFormValues = {
  content: string;
};
type QnAExplanationDrawerProps = {
  openExtraAnswerDrawer: boolean;
  handleCloseExtraAnswerDrawer: () => void;
};
const {TextArea} = Input;
const {Text, Paragraph} = Typography;
const QnAExplanationDrawer: React.FC<QnAExplanationDrawerProps> = ({
  handleCloseExtraAnswerDrawer,
  openExtraAnswerDrawer,
}) => {
  const {
    token: {fontSizeSM, marginXS, colorBgBase, marginSM, colorPrimary},
  } = theme.useToken();
  const isDark = colorBgBase === '#000';
  const {sizeDrawer: initialSizeDrawer, drawerLayout} = useDrawerSize();
  const [sizeDrawer, setSizeDrawer] = useState(initialSizeDrawer);
  const {height, width} = useWindowSize();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setSizeDrawer(initialSizeDrawer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerLayout]);
  const {isLg} = useResponsive();
  const handleResize = (size: number) => {
    const isDesktop = drawerLayout === 'desktop';

    const min = (isDesktop ? width : height) * DRAWER_MIN_RATIO;
    const max = (isDesktop ? width : height) * DRAWER_MAX_RATIO;

    setSizeDrawer(clamp(size, min, max));
  };
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [answerFollowUpQuestion, {isLoading: isAnswerFollowUpQuestionLoading}] = useAnswerFollowUpMutation();
  const [form] = Form.useForm<ChatFormValues>();
  const {discussion, discussionQuestion, initialLoading, currentQuestionId, currentSessionId} = useAppSelector(
    (state) => state.detailSessionPage,
  );
  useEffect(() => {
    const el = chatContainerRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth',
    });
  }, [discussion]);
  const onFinish: FormProps<ChatFormValues>['onFinish'] = async (values) => {
    console.log('Success:', values);
    const userDiscussion: Discussion = {
      role: 'user',
      blocks: [
        {
          type: 'text',
          content: values.content,
        },
      ],
      createdAt: new Date().toISOString(),
    };
    dispatch(addDiscussion(userDiscussion));
    form.resetFields();
    const res = await answerFollowUpQuestion({
      sessionId: currentSessionId,
      questionId: currentQuestionId,
      userDiscussion,
    }).unwrap();
    dispatch(addDiscussion(res.data));
  };
  console.log('discussion', discussion);
  return (
    <Drawer
      title={discussionQuestion}
      closable={{'aria-label': 'Close Button', placement: 'end'}}
      placement={isLg ? 'right' : 'bottom'}
      onClose={handleCloseExtraAnswerDrawer}
      open={openExtraAnswerDrawer}
      getContainer={false}
      mask={{blur: false}}
      size={sizeDrawer}
      resizable={{
        onResize: handleResize,
      }}
      loading={initialLoading}
      styles={{
        root: {
          position: 'fixed',
        },
      }}
    >
      <Flex
        style={{
          height: '100%',
        }}
        vertical
      >
        <Flex
          ref={chatContainerRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            scrollbarWidth: 'none',
          }}
          vertical
        >
          {discussion.map((disc, discIndex) => {
            // ===== USER =====
            if (disc.role === 'user') {
              return (
                <Flex key={discIndex} justify='flex-end' style={{marginBottom: marginSM}}>
                  <Paragraph
                    style={{
                      maxWidth: '70%',
                      marginBottom: 0,
                      padding: '8px 12px',
                      borderRadius: 8,
                      background: colorPrimary,
                      color: '#fff',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {disc.blocks.map((b) => b.content).join('\n')}
                  </Paragraph>
                </Flex>
              );
            }

            // ===== ASSISTANT (giữ nguyên UI hiện tại) =====
            return (
              <Flex key={discIndex} justify='flex-start' style={{marginBottom: marginSM}} vertical>
                {disc.blocks.map((block, blockIndex) => {
                  const key = `${discIndex}-${blockIndex}`;

                  if (block.type === 'code') {
                    return (
                      <Card
                        key={key}
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
                    <Paragraph key={key} style={{marginBottom: marginXS}}>
                      {block.content}
                    </Paragraph>
                  );
                })}
              </Flex>
            );
          })}
          {isAnswerFollowUpQuestionLoading && <Skeleton active />}
        </Flex>
        <Form
          onFinish={onFinish}
          form={form}
          style={{
            marginTop: 'auto',
          }}
        >
          <Flex align='flex-end' gap={8}>
            <Form.Item<ChatFormValues> name='content' noStyle>
              <TextArea
                autoSize={{minRows: 1, maxRows: 15}}
                placeholder='Type your question...'
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    if (isAnswerFollowUpQuestionLoading) return;
                    form.submit();
                  }
                }}
              />
            </Form.Item>

            <Form.Item shouldUpdate noStyle>
              {({getFieldValue}) => (
                <Button
                  type='primary'
                  disabled={!getFieldValue('content') || isAnswerFollowUpQuestionLoading}
                  icon={<IoSend />}
                  htmlType='submit'
                />
              )}
            </Form.Item>
          </Flex>
        </Form>
      </Flex>
    </Drawer>
  );
};

export default QnAExplanationDrawer;
