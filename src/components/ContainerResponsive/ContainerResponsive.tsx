import {useResponsive} from '@/hooks/useResponsive';
import type React from 'react';

type ContainerResponsiveProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const ContainerResponsive: React.FC<ContainerResponsiveProps> = ({children, style}) => {
  const {isXs, isXl, isLg, isMd, isSm} = useResponsive();

  let padding = '0 16px';
  if (isXs) padding = '0 24px';
  if (isSm) padding = '0 40px';
  if (isMd) padding = '0 72px';
  if (isLg) padding = '0 96px';
  if (isXl) padding = '0 120px';

  return <div style={{padding, ...style}}>{children}</div>;
};

export default ContainerResponsive;
