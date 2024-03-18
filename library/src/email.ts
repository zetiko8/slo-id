import { ERROR } from './ERROR';
import { getRandomElementOfArray } from './helpers';

export type EmailOptions = string | { baseEmail: string };

export function generateEmail(
  ime: string,
  priimek: string,
  options: EmailOptions = '',
): string {
  if (typeof options !== 'string' && options?.baseEmail === undefined)
    throw Error(ERROR.emailValue);

  if (typeof options === 'string' && options !== '') return options;

  if ((options as { baseEmail: string })?.baseEmail !== undefined) {
    const opts = options as { baseEmail: string };
    if (typeof opts.baseEmail !== 'string') throw ERROR.email.baseEmail;
    if (!opts.baseEmail.includes('@')) throw ERROR.email.baseEmail;

    const split = opts.baseEmail.split('@');
    return [ split[0], '+', ime, '.', priimek, split[1] ].join('');
  }
  const emailSuffixes = ['@gmail.com', '@hotmail.com'];
  return `${ime}.${priimek}${getRandomElementOfArray(emailSuffixes)}`;
}
