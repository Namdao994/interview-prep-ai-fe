import LoadingCard from '@/components/LoadingCard/LoadingCard';
import SessionCard from '@/components/SessionCard/SessionCard';
import {useResponsive} from '@/hooks/useResponsive';
import {useGetAllSessionsInfiniteQuery, useGetAllSessionsPaginationQuery} from '@/store/apis/sessionApi';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {setSessionCurrentPage, setSessionPageSize} from '@/store/slices/dashboardPageSlice';
import {Col, Empty, Flex, Pagination as PaginationAnt, Row, theme, Typography} from 'antd';
import {useEffect} from 'react';
import {useInView} from 'react-intersection-observer';
import {useWindowSize} from 'usehooks-ts';
const {Text} = Typography;
const CARD_GAP = 16;
type SessionsGridViewProps = {
  searchSessionKeyWord: string;
};
const SessionsGridView: React.FC<SessionsGridViewProps> = ({searchSessionKeyWord}) => {
  const {
    token: {marginMD, paddingXL, marginXL},
  } = theme.useToken();
  const {isXs, isSm} = useResponsive();
  const {height: windowHeight} = useWindowSize();
  const dispatch = useAppDispatch();
  const {sessionCurrentPage, sessionPageSize, sessionLoadMode, sessionFilters} = useAppSelector(
    (state) => state.dashboardPage,
  );

  const isInfinite = sessionLoadMode === 'infinite';
  const normalizedSearchSessionKeyword = searchSessionKeyWord.trim() || undefined;
  const infiniteQuery = useGetAllSessionsInfiniteQuery(
    {
      limit: sessionPageSize,
      page: sessionCurrentPage,
      keyword: normalizedSearchSessionKeyword,
      status: sessionFilters.status,
    },
    {
      skip: !isInfinite,
    },
  );
  const paginationQuery = useGetAllSessionsPaginationQuery(
    {
      limit: sessionPageSize,
      page: sessionCurrentPage,
      keyword: normalizedSearchSessionKeyword,
      status: sessionFilters.status,
    },
    {
      skip: isInfinite,
    },
  );
  const sessions = isInfinite ? infiniteQuery.data?.data : paginationQuery.data?.data;
  const pagination = isInfinite ? infiniteQuery.data?.pagination : paginationQuery.data?.pagination;
  const isSessionFetching = isInfinite ? infiniteQuery.isFetching : paginationQuery.isFetching;
  const isSessionLoading = isInfinite ? infiniteQuery.isLoading : paginationQuery.isLoading;
  const hasSessions = sessions && sessions.length > 0;
  const {ref, inView} = useInView({
    threshold: 0,
  });
  const totalPages = pagination && pagination.limit > 0 ? Math.ceil(pagination.total / pagination.limit) : 0;
  const hasMoreSessions = pagination && pagination.page < totalPages;
  useEffect(() => {
    if (!inView || !hasMoreSessions || isSessionFetching) {
      return;
    }

    dispatch(setSessionCurrentPage(sessionCurrentPage + 1));
  }, [inView, hasMoreSessions, isSessionFetching, sessionCurrentPage, dispatch]);

  return (
    <Flex vertical>
      <Row
        gutter={[CARD_GAP, CARD_GAP]}
        style={{
          marginTop: isXs ? 0 : marginMD,
          marginBottom: hasMoreSessions ? CARD_GAP : marginXL,
          minHeight: windowHeight / 1.8,
        }}
      >
        {isSessionLoading
          ? [...Array(3)].map((_, index) => (
              <Col key={index} xs={24} lg={12} md={12} xl={8}>
                <LoadingCard />
              </Col>
            ))
          : sessions?.map((session) => (
              <Col key={session.id} xs={24} lg={12} md={12} xl={8}>
                <SessionCard session={session} />
              </Col>
            ))}
        {!isSessionLoading && !hasSessions && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<Text>No session yet</Text>}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              flex: 1,
            }}
          />
        )}
      </Row>

      {!isSm && hasMoreSessions && (
        <Flex
          vertical
          gap={CARD_GAP}
          ref={ref}
          style={{
            marginBottom: marginXL,
          }}
        >
          {[...Array(3)].map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </Flex>
      )}
      {isSm && (
        <PaginationAnt
          defaultCurrent={1}
          defaultPageSize={5}
          style={{
            paddingBottom: paddingXL,
          }}
          align='end'
          current={sessionCurrentPage}
          pageSize={sessionPageSize}
          total={pagination?.total}
          showSizeChanger={true}
          pageSizeOptions={['5', '10', '15', '20', '25', '30', '50', '75', '100']}
          onChange={(page, pageSize) => {
            dispatch(setSessionCurrentPage(page));
            dispatch(setSessionPageSize(pageSize));
          }}
        />
      )}
    </Flex>
  );
};

export default SessionsGridView;
