import { getRandomElementOfArray } from './helpers';

export function generateMobileNumber(options: { withCountryCode: boolean }) {
  const prefixes = ['040', '041', '070', '051', '031'];
  const prefix = getRandomElementOfArray(prefixes);

  let mobileNumber = prefix.toString() + ' ';
  for (let i = 0; i < 6; i++) {
    if (i == 3) {
      mobileNumber += ' ';
    }
    mobileNumber += Math.floor(Math.random() * 10).toString();
  }

  if (options.withCountryCode) {
    return '00386' + mobileNumber.substring(1, mobileNumber.length);
  } else {
    return mobileNumber;
  }
}
