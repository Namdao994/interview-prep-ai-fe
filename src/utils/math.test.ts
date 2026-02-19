import {clamp} from './math';

describe('Unit test: clamp()', () => {
  it('Should return value when it is within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('Should return min when value is smaller than min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('Should return max when value is larger than max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('Should return min/max correctly when value equals boundary', () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it('Should work with negative ranges', () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-20, -10, -1)).toBe(-10);
  });
});
