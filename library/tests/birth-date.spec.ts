import * as moment from 'moment';
import { getMockPerson } from '../src';
import { ERROR } from '../src/ERROR';

describe('birthDate', () => {
  it('smoke', () => {
    const person = getMockPerson();
    expect(person.birthDate).toHaveProperty('dateString');
    expect(typeof person.birthDate.dateString).toBe('string');
    expect(person.birthDate).toHaveProperty('age');
    expect(typeof person.birthDate.age).toBe('number');
    expect(person.birthDate).toHaveProperty('date');
    expect(person.birthDate.date).toBeInstanceOf(Date);
  });
  describe('age', () => {
    it('return ages only birth dates of that are 5 years old', () => {
      Array.from(Array(1000)).forEach(() => {
        const person = getMockPerson({
          birthDate: { age: 5 },
        });
        expect(person.birthDate.age).toBe(5);
        expect(moment(new Date()).diff(person.birthDate.date, 'years')).toBe(5);
      });
    });
    it('handles invalid inputs', () => {
      [null, '0', '1', 'a', 5.4, new Date(), NaN, Infinity].forEach(
        invalidInput => {
          expect(() =>
            getMockPerson({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              birthDate: { age: invalidInput },
            }),
          ).toThrowError(ERROR.birthDate.age);
        },
      );
    });
  });
  describe('maxAge', () => {
    it('return ages only birth dates of that are less than 5 years old', () => {
      Array.from(Array(1000)).forEach(() => {
        const person = getMockPerson({
          birthDate: { maxAge: 5 },
        });
        expect(person.birthDate.age).toBeLessThan(6);
      });
    });
    it('handles invalid inputs', () => {
      [null, '0', '1', 'a', 5.4, new Date(), NaN, Infinity].forEach(
        invalidInput => {
          expect(() =>
            getMockPerson({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              birthDate: { maxAge: invalidInput },
            }),
          ).toThrowError(ERROR.birthDate.maxAge);
        },
      );
    });
  });
  describe('minAge', () => {
    it('return ages only birth dates of that are more than 2 years old', () => {
      Array.from(Array(1000)).forEach(() => {
        const person = getMockPerson({
          birthDate: { minAge: 2 },
        });
        expect(person.birthDate.age).toBeGreaterThan(1);
      });
    });
    it('handles invalid inputs', () => {
      [null, '0', '1', 'a', 5.4, new Date(), NaN, Infinity].forEach(
        invalidInput => {
          expect(() =>
            getMockPerson({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              birthDate: { minAge: invalidInput },
            }),
          ).toThrowError(ERROR.birthDate.minAge);
        },
      );
    });
  });
  describe.skip('minAge, maxAge', () => { /** TODO */});
  describe.skip('Date()', () => { /** TODO */});
  describe.skip('from', () => { /** TODO */});
  describe.skip('to', () => { /** TODO */});
  describe.skip('from,to', () => { /** TODO */});
  describe.skip('valid options', () => { /** TODO */});
});
