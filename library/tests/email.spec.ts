import { getMockPerson } from '../src';
import { ERROR } from '../src/ERROR';
import { isValidEmail } from './test.helpers';

describe('email', () => {
  it('smoke', () => {
    const person = getMockPerson();
    expect(person).toHaveProperty('email');
    expect(typeof person.email).toBe('string');
  });
  it('@', () => {
    const person = getMockPerson();
    expect(person.email).toContain('@');
  });
  it('valid email', () => {
    Array.from(Array(1000)).forEach(() => {
      const person = getMockPerson();
      expect(isValidEmail(person.email)).toBeTruthy();
    });
  });
  describe('force value', () => {
    it('@', () => {
      const person = getMockPerson({
        email: 'forcevalue',
      });
      expect(person.email).toBe('forcevalue');
    });
    it('handles invalid inputs', () => {
      [null, 5.4, new Date(), NaN, Infinity, {}].forEach(invalidInput => {
        expect(() =>
          getMockPerson({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            email: invalidInput,
          }),
        ).toThrowError(ERROR.emailValue);
      });
    });
  });
  describe('baseEmail', () => {
    it('@', () => {
      const person = getMockPerson({
        email: { baseEmail: 'test.email@gmail.com' },
      });
      expect(person.email.startsWith('test.email+')).toBe(true);
      expect(person.email.endsWith('gmail.com')).toBe(true);
    });
    it('handles invalid inputs', () => {
      [null, 5.4, new Date(), NaN, Infinity, {}, 'withoutafna', ''].forEach(
        invalidInput => {
          expect(() =>
            getMockPerson({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              email: { baseEmail: invalidInput },
            }),
          ).toThrowError(ERROR.email.baseEmail);
        },
      );
    });
  });
});
