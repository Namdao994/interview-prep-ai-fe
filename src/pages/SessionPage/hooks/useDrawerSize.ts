import {useResponsive} from '@/hooks/useResponsive';
import {useWindowSize} from 'usehooks-ts';

const useDrawerSize = () => {
  const {isLg} = useResponsive();
  const {height, width} = useWindowSize();
  let sizeDrawer = height * 0.8;
  let drawerLayout: 'mobile' | 'desktop' = 'mobile';
  if (isLg) {
    sizeDrawer = width * 0.5;
    drawerLayout = 'desktop';
  }

  return {sizeDrawer, drawerLayout};
};

export default useDrawerSize;
