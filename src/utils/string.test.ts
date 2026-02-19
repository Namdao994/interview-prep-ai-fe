import {capitalize, formatEnumLabel, truncateText, getInitialsName} from './string';

describe('capitalize', () => {
  it('should capitalize first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should return empty string for empty input', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle undefined', () => {
    expect(capitalize()).toBe('');
  });
});

describe('formatEnumLabel', () => {
  it('should format enum with underscores', () => {
    expect(formatEnumLabel('IN_PROGRESS')).toBe('In Progress');
  });

  it('should format lowercase value', () => {
    expect(formatEnumLabel('completed_task')).toBe('Completed Task');
  });

  it('should handle single word', () => {
    expect(formatEnumLabel('ACTIVE')).toBe('Active');
  });
});

describe('truncateText', () => {
  it('should return original text if shorter than maxLength', () => {
    expect(truncateText('hello', 10)).toBe('hello');
  });

  it('should truncate text and add ellipsis', () => {
    expect(truncateText('hello world', 5)).toBe('hello...');
  });

  it('should return empty string if text is empty', () => {
    expect(truncateText('', 5)).toBe('');
  });
});

describe('getInitialsName', () => {
  it('should return first letter for single word', () => {
    expect(getInitialsName('nam')).toBe('N');
  });

  it('should return initials for full name', () => {
    expect(getInitialsName('dao nam')).toBe('DN');
  });

  it('should handle extra spaces', () => {
    expect(getInitialsName('  dao   nam  ')).toBe('DN');
  });

  it('should return empty string for empty input', () => {
    expect(getInitialsName('')).toBe('');
  });
});
