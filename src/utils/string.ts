export const capitalize = (str = '') => (str ? str[0].toUpperCase() + str.slice(1) : '');
export const formatEnumLabel = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/(^|\s|_)\S/g, (char) => char.toUpperCase())
    .replace(/_/g, ' ');
};
export const truncateText = (text: string, maxLength = 100): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
export const getInitialsName = (text: string): string => {
  if (!text) return '';

  const words = text.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  const firstLetter = words[0][0].toUpperCase();
  const lastLetter = words[words.length - 1][0].toUpperCase();

  return firstLetter + lastLetter;
};
