import {formatSessionDateFullMonth, formatSessionDateShortMonth} from './date';

describe('Unit test: formatSessionDateFullMonth()', () => {
  it('Should format ISO date to full month format', () => {
    const isoDate = '2026-01-06';

    const result = formatSessionDateFullMonth(isoDate);

    expect(result).toBe('6th January 2026');
  });

  it('Should return empty string when isoDate is empty', () => {
    expect(formatSessionDateFullMonth('')).toBe('');
  });
});

describe('Unit test: formatSessionDateShortMonth()', () => {
  it('Should format ISO date to short month format', () => {
    const isoDate = '2026-01-06';

    const result = formatSessionDateShortMonth(isoDate);

    expect(result).toBe('6th Jan 2026');
  });

  it('Should return empty string when isoDate is empty', () => {
    expect(formatSessionDateShortMonth('')).toBe('');
  });
});
