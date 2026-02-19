import {getCookie} from './cookies';

describe('Unit test: getCookie()', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('Should return the cookie value when cookie exists', () => {
    document.cookie = 'token=abc123';
    document.cookie = 'user=nam';

    const result = getCookie('token');

    expect(result).toBe('abc123');
  });

  it('Should return undefined when cookie does not exist', () => {
    document.cookie = 'user=nam';

    const result = getCookie('name');

    expect(result).toBeUndefined();
  });

  it('Should return correct value when multiple cookies exist', () => {
    document.cookie = 'a=1';
    document.cookie = 'b=2';
    document.cookie = 'c=3';

    expect(getCookie('a')).toBe('1');
    expect(getCookie('b')).toBe('2');
    expect(getCookie('c')).toBe('3');
  });
});
