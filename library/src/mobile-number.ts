import { ERROR } from './ERROR';
import { getRandomElementOfArray } from './helpers';

export type MobileNumberOptions = string | { withCountryCode: boolean };

export function generateMobileNumber(
  options: MobileNumberOptions = '',
): string {
  const prefixes = ['040', '041', '070', '051', '031'];
  const prefix = getRandomElementOfArray(prefixes);

  let mobileNumber = prefix.toString() + ' ';
  for (let i = 0; i < 6; i++) {
    if (i == 3) {
      mobileNumber += ' ';
    }
    mobileNumber += Math.floor(Math.random() * 10).toString();
  }

  if (options !== '') {
    if (typeof options === 'string') {
      return options;
    } else if ((options as { withCountryCode: boolean })?.withCountryCode) {
      return '+386' + mobileNumber
        .substring(1, mobileNumber.length)
        .replace(/\s/g, '');
    } else throw Error(ERROR.mobileNumberValue);
  } else {
    return mobileNumber.replace(/\s/g, '');
  }
}
