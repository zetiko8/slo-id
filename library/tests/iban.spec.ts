import * as ibanLib from 'iban';
import { getMockPerson } from '../src';

describe('iban', () => {
  it('smoke', () => {
    const person = getMockPerson();
    expect(person).toHaveProperty('iban');
    expect(typeof person.iban).toBe('string');
  });
  it('makes a valid iban', () => {
    Array.from(Array(1000)).forEach(() => {
      const person = getMockPerson();
      expect(ibanLib.isValid(person.iban)).toBe(true);
    });
  });
  it('force value', () => {
    const person = getMockPerson({ iban: 'force value' });
    expect(person.iban).toBe('force value');
  });
  it('data', () => {
    const person = getMockPerson({ iban: { data: ['force value'] } });
    expect(person.iban).toBe('force value');
  });
});
