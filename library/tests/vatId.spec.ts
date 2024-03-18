import { getMockPerson } from '../src';

describe('vatId', () => {
  it('smoke', () => {
    const person = getMockPerson();
    expect(person).toHaveProperty('vatId');
    expect(typeof person.vatId).toBe('string');
  });
  it('force value', () => {
    const person = getMockPerson({ vatId: 'force value' });
    expect(person.vatId).toBe('force value');
  });
});
