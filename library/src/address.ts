import { ADDRESSES } from './data/data';
import { getRandomElementOfArray } from './helpers';

export function generateAddress(options: {
  street?: string;
  zipCode?: string;
  city?: string;
}): {
  street: string;
  zipCode: string;
  city: string;
} {
  const full = getRandomElementOfArray(ADDRESSES).replace(/(\d+)+/, () =>
    String(Math.floor(1 + Math.random() * 32)),
  );

  let street = full.split(',')[0];
  let zipCode = full.split(',')[1].split(' ')[1];
  let city = full.split(',')[1].split(' ')[2];

  if (
    options.street &&
    options.street !== '' &&
    typeof options.street === 'string'
  ) {
    street = options.street;
  }
  if (
    options.zipCode &&
    options.zipCode !== '' &&
    typeof options.zipCode === 'string'
  ) {
    zipCode = options.zipCode;
  }
  if (options.city && options.city !== '' && typeof options.city === 'string') {
    city = options.city;
  }
  return {
    street,
    zipCode,
    city,
  };
}
