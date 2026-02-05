import {useResponsive} from '@/hooks/useResponsive';
import {ROUTES} from '@/routes/path';
import {useGetAllSessionsPaginationQuery, useUnarchiveSessionMutation} from '@/store/apis/sessionApi';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {setSessionCurrentPage, setSessionPageSize} from '@/store/slices/dashboardPageSlice';
import {formatSessionDateFullMonth} from '@/utils/date';
import {formatEnumLabel, truncateText} from '@/utils/string';
import {LoadingOutlined} from '@ant-design/icons';
import {Modal, Space, Table, Tag, theme, Typography} from 'antd';
import type {TableProps} from 'antd';
import type React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {useWindowSize} from 'usehooks-ts';
const {Text} = Typography;
// const columns: TableProps<DataTypeSessionTable>['columns'] = [
//     {
//       title: 'Session',
//       dataIndex: 'session',
//       key: 'session',
//       render: (value, record) =>
//         isSessionLoading ? (
//           <Space
//             vertical
//             size={0}
//             style={{
//               width: 200,
//             }}
//           >
//             <SkeletonNode
//               active
//               styles={{
//                 root: {
//                   height: 20,
//                   width: '100%',
//                 },
//               }}
//             />
//             {/* tương ứng session */}
//             <SkeletonNode
//               active
//               styles={{
//                 root: {
//                   height: 16,
//                   width: '100%',
//                 },
//               }}
//             />
//             {/* tương ứng topicsToFocus */}
//           </Space>
//         ) : (
//           <Space vertical size={0}>
//             <Text strong>{value}</Text>
//             <Text
//               style={{
//                 fontSize: 12,
//               }}
//             >
//               {record.topicsToFocus}
//             </Text>
//           </Space>
//         ),
//     },
//     {
//       title: 'Total Q&As',
//       dataIndex: 'questions',
//       key: 'questions',
//       render: (value) =>
//         isSessionLoading ? (
//           <SkeletonNode
//             active
//             styles={{
//               root: {
//                 height: 16,
//                 width: 100,
//               },
//             }}
//           />
//         ) : (
//           <Text>
//             {value} {value === 1 ? 'Q&A' : 'Q&As'}
//           </Text>
//         ),
//     },
//     {
//       title: 'Experience (Years)',
//       dataIndex: 'experience',
//       key: 'experience',
//       render: (value) =>
//         isSessionLoading ? (
//           <SkeletonNode
//             active
//             styles={{
//               root: {
//                 height: 16,
//                 width: 100,
//               },
//             }}
//           />
//         ) : (
//           <Text>
//             {value} {value === 1 ? 'Year' : 'Years'}
//           </Text>
//         ),
//     },
//     {
//       title: 'Last Updated',
//       dataIndex: 'updatedAt',
//       key: 'updatedAt',
//       render: (value) =>
//         isSessionLoading ? (
//           <SkeletonNode
//             active
//             styles={{
//               root: {
//                 height: 16,
//                 width: 100,
//               },
//             }}
//           />
//         ) : (
//           <Text>{formatSessionDateFullMonth(value)}</Text>
//         ),
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//       render: (value) =>
//         isSessionLoading ? (
//           <SkeletonNode
//             active
//             styles={{
//               root: {
//                 height: 16,
//                 width: 200,
//               },
//             }}
//           />
//         ) : (
//           <Text>{truncateText(value, 40)}</Text>
//         ),
//     },
//   ];

// const mockSessionTableData: DataTypeSessionTable[] = [
//   {
//     key: '1',
//     session: 'Frontend Development',
//     topicsToFocus: 'React, JavaScript, HTML, CSS',
//     questions: 1,
//     experience: 3,
//     updatedAt: '2024-11-18',
//     description:
//       'React, Ant Design, UI best practices React, Ant Design, UI best practices React, Ant Design, UI best practices React, Ant Design, UI best practices React, Ant Design, UI best practices',
//   },
//   {
//     key: '2',
//     session: 'Backend Development',
//     topicsToFocus: 'React, JavaScript, HTML, CSS',
//     questions: 18,
//     experience: 1,
//     updatedAt: '2024-11-20',
//     description: 'Node.js, NestJS, REST APIs',
//   },
//   {
//     key: '3',
//     session: 'Database Design',
//     questions: 12,
//     topicsToFocus: 'React, JavaScript, HTML, CSS',
//     experience: 4,
//     updatedAt: '2024-11-22',
//     description: 'SQL schema, indexing, optimization',
//   },
//   {
//     key: '4',
//     session: 'DevOps Basics',
//     questions: 9,
//     topicsToFocus: 'React, JavaScript, HTML, CSS',
//     experience: 6,
//     updatedAt: '2024-11-25',
//     description: 'Docker, CI/CD, deployment',
//   },
// ];
interface DataTypeSessionTable {
  key: string;
  session: string;
  lifecycleStatus: 'ACTIVE' | 'ARCHIVED';
  topicsToFocus: string;
  questions: number;
  experience: number;
  updatedAt: string;
  description: string;
}

const columns: TableProps<DataTypeSessionTable>['columns'] = [
  {
    title: 'Session',
    dataIndex: 'session',
    key: 'session',
    render: (value, record) => (
      <Space vertical size={0}>
        <Text strong>{value}</Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
          {record.topicsToFocus}
        </Text>
      </Space>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'lifecycleStatus',
    key: 'lifecycleStatus',
    render: (value) => <Tag color={value === 'ACTIVE' ? 'success' : 'error'}>{formatEnumLabel(value)}</Tag>,
  },
  {
    title: 'Total Q&As',
    dataIndex: 'questions',
    key: 'questions',
    render: (value) => (
      <Text>
        {value} {value === 1 ? 'Q&A' : 'Q&As'}
      </Text>
    ),
  },
  {
    title: 'Experience (Years)',
    dataIndex: 'experience',
    key: 'experience',
    render: (value) => (
      <Text>
        {value} {value === 1 ? 'Year' : 'Years'}
      </Text>
    ),
  },
  {
    title: 'Last Updated',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (value) => <Text>{formatSessionDateFullMonth(value)}</Text>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (value) => <Text>{truncateText(value, 40)}</Text>,
  },
];
const HEADER_TABLE_HEIGHT = 64;
type SessionsTableViewProps = {
  searchSessionKeyWord: string;
};
const SessionsTableView: React.FC<SessionsTableViewProps> = ({searchSessionKeyWord}) => {
  const {
    token: {marginMD},
  } = theme.useToken();
  const {isXs} = useResponsive();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {sessionCurrentPage, sessionPageSize, sessionFilters} = useAppSelector((state) => state.dashboardPage);
  const normalizedSearchSessionKeyword = searchSessionKeyWord.trim() || undefined;
  const {data: sessionResponse, isLoading: isSessionLoading} = useGetAllSessionsPaginationQuery({
    page: sessionCurrentPage,
    limit: sessionPageSize,
    keyword: normalizedSearchSessionKeyword,
    status: sessionFilters.status,
  });
  const {height: windowHeight} = useWindowSize();
  const sessionsDataSource: DataTypeSessionTable[] =
    sessionResponse?.data?.map((session) => ({
      key: session.id,
      session: session.targetRole,
      lifecycleStatus: session.lifecycleStatus,
      topicsToFocus: session.topicsToFocus,
      questions: session.questionCount,
      experience: session.experience,
      updatedAt: session.updatedAt,
      description: session.description,
    })) ?? [];
  const [unarchiveSession, {isLoading: isUnarchiveSessionLoading}] = useUnarchiveSessionMutation();
  const [isConfirmUnarchiveSessionModalOpen, setIsConfirmUnarchiveSessionModalOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const handleConfirmUnarchiveSession = async () => {
    if (!selectedSessionId) return;
    await unarchiveSession({id: selectedSessionId}).unwrap();
    setIsConfirmUnarchiveSessionModalOpen(false);
    navigate(ROUTES.SESSION_DETAIL(selectedSessionId));
  };
  const handleNavigateDetailSession = (sessionId: string) => {
    const session = sessionResponse?.data?.find((session) => session.id === sessionId);
    if (!session) return;
    const isArchived = session.lifecycleStatus === 'ARCHIVED';

    if (isArchived) {
      setSelectedSessionId(sessionId);
      setIsConfirmUnarchiveSessionModalOpen(true);

      return;
    }

    navigate(ROUTES.SESSION_DETAIL(sessionId));
  };
  return (
    <>
      <Table<DataTypeSessionTable>
        columns={columns}
        dataSource={sessionsDataSource}
        style={{
          marginTop: isXs ? 0 : marginMD,
        }}
        loading={{
          spinning: isSessionLoading,
          indicator: <LoadingOutlined spin />,
        }}
        scroll={{x: 'max-content', y: windowHeight / 2}}
        rowHoverable={!isSessionLoading}
        onRow={(record) =>
          isSessionLoading
            ? {}
            : {
                onClick: () => handleNavigateDetailSession(record.key),
              }
        }
        styles={{
          header: {
            wrapper: {
              height: HEADER_TABLE_HEIGHT,
            },
          },
          section: {
            height: windowHeight / 2 + HEADER_TABLE_HEIGHT,
          },
          body: {
            row: {
              cursor: 'pointer',
            },
          },
        }}
        pagination={{
          current: sessionCurrentPage,
          pageSize: sessionPageSize,
          total: sessionResponse?.pagination?.total,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15', '20', '25', '30', '50', '75', '100'],
          onChange: (page, pageSize) => {
            console.log('page', page);
            dispatch(setSessionCurrentPage(page));
            dispatch(setSessionPageSize(pageSize));
          },
        }}
      />
      <Modal
        title='Unarchive session'
        open={isConfirmUnarchiveSessionModalOpen}
        onOk={handleConfirmUnarchiveSession}
        onCancel={() => {
          setIsConfirmUnarchiveSessionModalOpen(false);
          setSelectedSessionId(null);
        }}
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

export default SessionsTableView;
