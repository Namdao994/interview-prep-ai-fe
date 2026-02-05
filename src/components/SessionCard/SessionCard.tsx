import FaBoxArchive from '@/assets/icon/FaBoxArchive';
import FaBoxOpen from '@/assets/icon/FaBoxOpen';
import FaCalendarAlt from '@/assets/icon/FaCalendarAlt';
import FaChevronRight from '@/assets/icon/FaChevronRight';
import FaRegClock from '@/assets/icon/FaRegClock';
import MdOutlineQuestionAnswer from '@/assets/icon/MdOutlineQuestionAnswer';
import {ROUTES} from '@/routes/path';
import type {Session} from '@/shared/types/session';
import {useUnarchiveSessionMutation} from '@/store/apis/sessionApi';
import {formatSessionDateShortMonth} from '@/utils/date';
import {formatEnumLabel, getInitialsName} from '@/utils/string';
import {Avatar, Card, Flex, Modal, Space, Tag, theme, Typography} from 'antd';
import type React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router';
const {Text, Paragraph} = Typography;
type SessionCardProps = {
  session: Session;
};
const SessionCard: React.FC<SessionCardProps> = ({session}) => {
  const {
    token: {
      fontSizeLG,
      fontSizeSM,
      paddingSM,
      colorPrimaryBg,
      colorBgBlur,
      colorBgContainer,
      colorText,
      fontSizeXL,
      colorPrimary,
      marginXS,
      marginSM,
    },
  } = theme.useToken();
  const navigate = useNavigate();
  const [isConfirmUnarchiveSessionModalOpen, setIsConfirmUnarchiveSessionModalOpen] = useState(false);

  const [unarchiveSession, {isLoading: isUnarchiveSessionLoading}] = useUnarchiveSessionMutation();

  const handleConfirmUnarchiveSession = async () => {
    await unarchiveSession({id: session.id}).unwrap();
    setIsConfirmUnarchiveSessionModalOpen(false);
    navigate(ROUTES.SESSION_DETAIL(session.id));
  };
  const handleNavigateToDetailSession = () => {
    const isArchived = session.lifecycleStatus === 'ARCHIVED';

    if (isArchived) {
      setIsConfirmUnarchiveSessionModalOpen(true);
      return;
    }

    navigate(ROUTES.SESSION_DETAIL(session.id));
  };

  return (
    <>
      <Card
        hoverable
        styles={{
          header: {
            paddingTop: paddingSM,
            paddingBottom: paddingSM,
            background: `${colorBgContainer} linear-gradient(to right, ${colorPrimaryBg}, ${colorBgBlur})`,
          },
        }}
        title={
          <Space
            style={{
              alignItems: 'center',
            }}
          >
            <Avatar
              shape='square'
              style={{
                width: 48,
                height: 48,
                background: colorBgContainer,
                color: colorText,
                fontSize: fontSizeXL,
              }}
            >
              {getInitialsName(session.targetRole)}
            </Avatar>
            <Space vertical size={0}>
              <Text
                strong
                style={{
                  fontSize: fontSizeLG,
                }}
              >
                {session.targetRole}
              </Text>
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: fontSizeSM,
                }}
              >
                {session.topicsToFocus}
              </Text>
            </Space>
          </Space>
        }
        extra={<FaChevronRight />}
        onClick={() => handleNavigateToDetailSession()}
      >
        <Flex gap='small' wrap>
          <Tag icon={<FaRegClock />} color={colorPrimary}>
            Exp: {session.experience} {session.experience > 1 ? 'Years' : 'Year'}
          </Tag>
          <Tag icon={<MdOutlineQuestionAnswer />} color={colorPrimary}>
            {session.questionCount} Q&A
          </Tag>
          <Tag icon={<FaCalendarAlt />} color={colorPrimary}>
            Latest: {formatSessionDateShortMonth(session.updatedAt)}
          </Tag>
        </Flex>
        <Paragraph
          style={{
            marginTop: marginXS,
            marginBottom: 0,
          }}
        >
          {session.description}
        </Paragraph>

        <Flex
          style={{
            marginTop: marginSM,
          }}
        >
          <Tag
            icon={session.lifecycleStatus === 'ACTIVE' ? <FaBoxOpen /> : <FaBoxArchive />}
            color={session.lifecycleStatus === 'ACTIVE' ? 'success' : 'error'}
          >
            {formatEnumLabel(session.lifecycleStatus)}
          </Tag>
        </Flex>
      </Card>
      <Modal
        title='Unarchive session'
        open={isConfirmUnarchiveSessionModalOpen}
        onOk={handleConfirmUnarchiveSession}
        onCancel={() => setIsConfirmUnarchiveSessionModalOpen(false)}
        okText='Unarchive'
        confirmLoading={isUnarchiveSessionLoading}
        okButtonProps={{
          type: 'primary',
        }}
      >
        <p>You must unarchive this session before accessing its details.</p>
      </Modal>
    </>
  );
};

export default SessionCard;
