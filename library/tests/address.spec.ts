import { getMockPerson } from '../src';

describe('address', () => {
  it('smoke', () => {
    const person = getMockPerson();
    expect(person).toHaveProperty('address');
    expect(typeof person.address.street).toBe('string');
    expect(typeof person.address.zipCode).toBe('string');
    expect(typeof person.address.city).toBe('string');
  });
  it('force street', () => {
    const person = getMockPerson({ address: { street: 'force value' } });
    expect(person.address.street).toBe('force value');
  });
  it('force zipCode', () => {
    const person = getMockPerson({ address: { zipCode: 'force value' } });
    expect(person.address.zipCode).toBe('force value');
  });
  it('force city', () => {
    const person = getMockPerson({ address: { city: 'force value' } });
    expect(person.address.city).toBe('force value');
  });
  it('force all', () => {
    const person = getMockPerson({ address: { zipCode: 'zip code', street: 'street', city: 'city' } });
    expect(person.address.city).toBe('city');
    expect(person.address.zipCode).toBe('zip code');
    expect(person.address.street).toBe('street');
  });
  it('(bugfix) return whole city', () => {
    const person = getMockPerson({}, { ADDRESSES: ['Kolodvorska Cesta 1, 1410 Zagorje Ob Savi'] });
    expect(person.address.city).toBe('Zagorje Ob Savi');
    expect(person.address.zipCode).toBe('1410');
  });
});
