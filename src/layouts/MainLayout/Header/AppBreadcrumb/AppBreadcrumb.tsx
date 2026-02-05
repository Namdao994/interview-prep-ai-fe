import FaHome from '@/assets/icon/FaHome';
import {useResponsive} from '@/hooks/useResponsive';
import {ROUTES} from '@/routes/path';
import {Breadcrumb, theme, Typography} from 'antd';
import type {ItemType} from 'antd/es/breadcrumb/Breadcrumb';
import {Link, useLocation} from 'react-router';
const {Title} = Typography;
const breadcrumbNameMap: Record<string, string> = {
  dashboard: 'Interview Prep AI',
  session: 'Sessions',
  profile: 'Profile',
};
const AppBreadcrumb = () => {
  const {
    token: {fontSizeHeading4},
  } = theme.useToken();
  const {isSm} = useResponsive();

  const location = useLocation();
  const {pathname} = location;
  const pathSnippets = pathname.split('/').filter((i) => i);
  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const isId = /^[a-f0-9]{24}$/.test(snippet) || /^\d+$/.test(snippet);
    const isNonLinkPath = snippet === 'session';

    const titleText = breadcrumbNameMap[snippet] || (isId ? 'Detail' : snippet);
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    return {
      key: snippet,
      title: titleText,
      path: isId || isNonLinkPath ? undefined : url,
    };
  });
  const handleItemRenderItemBreadcrumb = (item: ItemType, _params: unknown, routes: ItemType[]) => {
    if (item.path) {
      if (routes.length > 1 && item.path === ROUTES.DASHBOARD && !isSm) {
        return (
          <Link to={item.path}>
            <Title style={{fontSize: fontSizeHeading4, margin: 0}}>
              <FaHome style={{fontSize: fontSizeHeading4}} />
            </Title>
          </Link>
        );
      }
      return (
        <Link to={item.path}>
          <Title style={{fontSize: fontSizeHeading4, margin: 0}}>{item.title}</Title>
        </Link>
      );
    }
    return <Title style={{fontSize: fontSizeHeading4, margin: 0}}>{item.title}</Title>;
  };
  return (
    <Breadcrumb
      items={breadcrumbItems}
      itemRender={handleItemRenderItemBreadcrumb}
      separator={<Title style={{fontSize: fontSizeHeading4, margin: 0}}>/</Title>}
    />
  );
};

export default AppBreadcrumb;
