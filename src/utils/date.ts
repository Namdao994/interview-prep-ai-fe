import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

/**
 * Chuyển ISO date sang kiểu "6th January 2026"
 * @param isoDate ISO date string
 * @returns formatted string
 */
export const formatSessionDateFullMonth = (isoDate: string): string => {
  if (!isoDate) return '';
  return dayjs(isoDate).format('Do MMMM YYYY');
};

/**
 * Chuyển ISO date sang kiểu "6th Jan 2026"
 * @param isoDate ISO date string
 * @returns formatted string
 */
export const formatSessionDateShortMonth = (isoDate: string): string => {
  if (!isoDate) return '';
  return dayjs(isoDate).format('Do MMM YYYY');
};
