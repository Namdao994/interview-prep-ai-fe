import FaListUl from '@/assets/icon/FaListUl';
import FaPlus from '@/assets/icon/FaPlus';
import LuLayoutGrid from '@/assets/icon/LuLayoutGrid';
import ContainerResponsive from '@/components/ContainerResponsive/ContainerResponsive';
import SearchForm from '@/components/SearchForm/SearchForm';
import {useResponsive} from '@/hooks/useResponsive';
import {Button, Flex, Segmented, theme, Typography} from 'antd';
import SessionsTableView from './SessionsTableView/SessionsTableView';
import {useEffect, useState} from 'react';
import CreateSessionModal from './CreateSessionModal/CreateSessionModal';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {
  setSessionCurrentPage,
  setSessionLoadMode,
  setSessionViewMode,
  type SessionViewMode,
} from '@/store/slices/dashboardPageSlice';
import SessionsGridView from './SessionsGridView/SessionsGridView';
import {useGetRecentSessionsSuggestionsQuery} from '@/store/apis/sessionApi';
import FilterSessionsDropdown from './FilterSessionsDropdown/FilterSessionsDropdown';
const {Title} = Typography;

const DashboardPage = () => {
  const {
    token: {fontSizeHeading3},
  } = theme.useToken();
  const {isXs, isSm} = useResponsive();
  const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {sessionViewMode} = useAppSelector((state) => state.dashboardPage);
  const {data: sessionSuggestionsRes} = useGetRecentSessionsSuggestionsQuery();
  const dynamicPlaceholder =
    sessionSuggestionsRes?.data.flatMap((session) => [
      session.targetRole,
      ...session.topicsToFocus
        .split(',')
        .map((topic) => topic.trim())
        .filter(Boolean),
    ]) ?? [];
  useEffect(() => {
    dispatch(setSessionCurrentPage(1));
    dispatch(setSessionLoadMode('pagination'));
    if (!isSm) {
      dispatch(setSessionLoadMode('infinite'));
    }
  }, [isSm, dispatch]);
  const [searchSessionKeyWord, setSearchSessionKeyWord] = useState('');
  const showCreateSessionModal = () => {
    setIsCreateSessionModalOpen(true);
  };
  const handleCancelCreateSessionModal = () => {
    setIsCreateSessionModalOpen(false);
  };
  const handleSearchSession = (keyword: string) => {
    setSearchSessionKeyWord(keyword);
  };
  const sessionViewMap = {
    grid: <SessionsGridView searchSessionKeyWord={searchSessionKeyWord} />,
    table: <SessionsTableView searchSessionKeyWord={searchSessionKeyWord} />,
  };

  return (
    <>
      <ContainerResponsive
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          flex: 1,
          overflow: 'auto',
        }}
      >
        <Title
          level={2}
          style={{
            fontSize: fontSizeHeading3,
            paddingTop: 54,
          }}
        >
          Session
        </Title>
        <Flex
          style={{
            alignItems: 'start',
          }}
          gap={isXs ? 'small' : undefined}
          vertical={!isXs}
        >
          <SearchForm
            onSearch={handleSearchSession}
            style={{
              width: isXs ? 280 : '100%',
            }}
            dynamicPlaceholder={dynamicPlaceholder}
          />

          <Flex
            gap='small'
            style={{
              flex: 1,
            }}
          >
            <FilterSessionsDropdown />
            <Segmented
              style={{
                marginLeft: 'auto',
              }}
              value={sessionViewMode}
              options={[
                {value: 'grid', icon: <LuLayoutGrid />},
                {value: 'table', icon: <FaListUl />},
              ]}
              onChange={(value: SessionViewMode) => {
                dispatch(setSessionViewMode(value));
                dispatch(setSessionCurrentPage(1));
              }}
            />
            <Button type='primary' icon={<FaPlus />} onClick={showCreateSessionModal}>
              Create new
            </Button>
          </Flex>
        </Flex>
        {sessionViewMap[sessionViewMode]}
      </ContainerResponsive>
      <CreateSessionModal
        title='Start a New Interview Journey'
        closable={{'aria-label': 'Custom Close Button'}}
        open={isCreateSessionModalOpen}
        onCancel={handleCancelCreateSessionModal}
        footer={null}
      />
    </>
  );
};

export default DashboardPage;
