import { getRandomElementOfArray } from './helpers';

export function generateEmail(ime: string, priimek: string) {
  const emailSuffixes = ['@gmail.com', '@hotmail.com'];
  return `${ime}.${priimek}${getRandomElementOfArray(emailSuffixes)}`;
}
