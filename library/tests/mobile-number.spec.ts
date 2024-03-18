import { getMockPerson } from '../src';

describe('mobileNumber', () => {
  it('smoke', () => {
    const person = getMockPerson();
    expect(person).toHaveProperty('mobileNumber');
    expect(typeof person.mobileNumber).toBe('string');
  });
  it('force value', () => {
    const person = getMockPerson({ mobileNumber: 'force value' });
    expect(person.mobileNumber).toBe('force value');
  });
  it('with', () => {
    const person = getMockPerson({
      mobileNumber: { withCountryCode: true },
    });
    expect(person.mobileNumber.startsWith('+386')).toBeTruthy();
  });
});
