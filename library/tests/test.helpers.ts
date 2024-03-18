import * as joi from 'joi';

export function isValidEmail(email: string) {
  const result = joi.string().email().validate(email);

  if (result.error) throw Error(`"${email}" is not valid email`);

  return !result.error;
}
