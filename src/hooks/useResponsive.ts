import {useMediaQuery} from 'usehooks-ts';
import {BREAKPOINTS} from '@/constants/breakpoints';

export const useResponsive = () => {
  const isXs = useMediaQuery(`(min-width: ${BREAKPOINTS.xs}px)`);
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const isLg = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
  const isXl = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);
  const isXxl = useMediaQuery(`(min-width: ${BREAKPOINTS.xxl}px)`);

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    isXxl,
  };
};
