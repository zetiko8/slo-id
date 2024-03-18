import { getMockPerson, GENDER } from '../src';
import { ERROR } from '../src/ERROR';

describe('gender', () => {
  it('smoke', () => {
    const person = getMockPerson();
    expect(person).toHaveProperty('gender');
    expect(person.gender === GENDER.F || person.gender === GENDER.M);
  });
  it('fixed gender M', () => {
    const person = getMockPerson({
      gender: GENDER.M,
    });
    expect(person.gender).toBe(GENDER.M);
  });
  it('fixed gender F', () => {
    const person = getMockPerson({
      gender: GENDER.F,
    });
    expect(person.gender).toBe(GENDER.F);
  });
  it('handles invalid inputs', () => {
    [null, 5.4, new Date(), NaN, Infinity, {}, '', 0, -1, 'string'].forEach(
      invalidInput => {
        expect(() =>
          getMockPerson({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            gender: invalidInput,
          }),
        ).toThrowError(ERROR.gender);
      },
    );
  });
});
