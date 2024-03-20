import { ERROR } from './ERROR';
import { getRandomElementOfArray } from './helpers';

export type EmailOptions = string | { baseEmail: string };

export function generateEmail(
  firstName: string,
  surname: string,
  options: EmailOptions = '',
): string {
  if (typeof options !== 'string' && options?.baseEmail === undefined)
    throw Error(ERROR.emailValue);

  if (typeof options === 'string' && options !== '') return options;

  const nameForEmail = stringForEmail(firstName);
  const surnameForEmail = stringForEmail(surname);
  if ((options as { baseEmail: string })?.baseEmail !== undefined) {
    const opts = options as { baseEmail: string };
    if (typeof opts.baseEmail !== 'string') throw ERROR.email.baseEmail;
    if (!opts.baseEmail.includes('@')) throw ERROR.email.baseEmail;

    const split = opts.baseEmail.split('@');
    return [split[0], '+', nameForEmail, '.', surnameForEmail, '@', split[1]].join(
      '',
    );
  }
  const emailSuffixes = ['@gmail.com', '@hotmail.com'];
  return `${nameForEmail}.${surnameForEmail}${getRandomElementOfArray(
    emailSuffixes,
  )}`;
}

function stringForEmail(str: string) {
  return str
    .toLowerCase()
    .replace(/č/g, 'c')
    .replace(/š/g, 's')
    .replace(/đ/g, 'd')
    .replace(/ž/g, 'z')
    .replace(/ć/g, 'c')
    .replace(/\s/g, '.');
}
