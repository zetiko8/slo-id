import { getMockPerson, GENDER } from '../src';
import { ERROR } from '../src/ERROR';

describe('name', () => {
  it('smoke', () => {
    const person = getMockPerson();
    expect(person).toHaveProperty('name');
    expect(typeof person.name.firstName).toBe('string');
    expect(typeof person.name.surname).toBe('string');
  });
  it('name is ok for gender', () => {
    const data = { FEMALE_NAMES: ['Lucija'], MALE_NAMES: ['Anže'] };
    const person = getMockPerson(
      {
        gender: GENDER.F,
      },
      data,
    );
    expect(person.name.firstName).toBe('Lucija');
    const person1 = getMockPerson(
      {
        gender: GENDER.M,
      },
      data,
    );
    expect(person1.name.firstName).toBe('Anže');
  });
  it('number of names', () => {
    const person = getMockPerson({
      name: { numberOfNames: 3 },
    });
    expect(person.name.firstName.split(' ')).toHaveLength(3);
  });
  it('number of surnames', () => {
    const person = getMockPerson({
      name: { numberOfSurnames: 3 },
    });
    expect(person.name.surname.split(' ')).toHaveLength(3);
  });
  it('fixed name', () => {
    const person = getMockPerson({
      name: { firstName: 'Anže' },
    });
    expect(person.name.firstName).toBe('Anže');
  });
  it('fixed surname', () => {
    const person = getMockPerson({
      name: { surname: 'Kolšek' },
    });
    expect(person.name.surname).toBe('Kolšek');
  });
  it('fixed name and surname', () => {
    const person = getMockPerson({
      name: { firstName: 'Anže', surname: 'Kolšek' },
    });
    expect(person.name.firstName).toBe('Anže');
    expect(person.name.surname).toBe('Kolšek');
  });
  it('handles invalid numberOfNames inputs', () => {
    [
      null,
      5.4,
      new Date(),
      NaN,
      Infinity,
      {},
      'withoutafna',
      '',
      0,
      -1,
    ].forEach(invalidInput => {
      expect(() =>
        getMockPerson({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          name: { numberOfNames: invalidInput },
        }),
      ).toThrowError(ERROR.name.numberOfNames);
    });
  });
  it('handles invalid numberOfSurnames inputs', () => {
    [
      null,
      5.4,
      new Date(),
      NaN,
      Infinity,
      {},
      'withoutafna',
      '',
      0,
      -1,
    ].forEach(invalidInput => {
      expect(() =>
        getMockPerson({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          name: { numberOfSurnames: invalidInput },
        }),
      ).toThrowError(ERROR.name.numberOfSurnames);
    });
  });
  it('handles invalid firstName inputs', () => {
    [
      null,
      5.4,
      new Date(),
      NaN,
      Infinity,
      {},
      '',
      0,
      -1,
    ].forEach(invalidInput => {
      expect(() =>
        getMockPerson({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          name: { firstName: invalidInput },
        }),
      ).toThrowError(ERROR.name.firstName);
    });
  });
  it('handles invalid surname inputs', () => {
    [
      null,
      5.4,
      new Date(),
      NaN,
      Infinity,
      {},
      '',
      0,
      -1,
    ].forEach(invalidInput => {
      expect(() =>
        getMockPerson({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          name: { surname: invalidInput },
        }),
      ).toThrowError(ERROR.name.surname);
    });
  });
});
