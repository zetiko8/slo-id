import {
  BirthDate,
  BirthDateOptions,
  generateBirthDate,
  getAge,
  toDDMMYYYY,
} from './bith-date';
import { EmailOptions, generateEmail } from './email';
import { generateName } from './name';
import { GENDER } from './types';

export interface MockPerson {
  birthDate: BirthDate;
  email: string;
}

export interface MockPersonOptions {
  davcnaStevilka: string;
  birthDate: BirthDateOptions | Date | BirthDate;
  ime: string;
  priimek: string;
  mobitel: string;
  ulica: string;
  postnaStevilka: string;
  kraj: string;
  email: EmailOptions;
  spol: 'M' | 'Ž';
}

export const getMockPerson = (
  options: Partial<MockPersonOptions> = {},
): MockPerson => {
  const gender = GENDER.M;
  const nameObject = generateName({
    gender,
  });
  return {
    birthDate: getBirthDate(options.birthDate),
    email: generateEmail(
      nameObject.firstName,
      nameObject.surname,
      options.email,
    ),
  };
};

function getBirthDate(
  options?: BirthDateOptions | Date | BirthDate,
): BirthDate {
  if ((options as BirthDate)?.date) return options as BirthDate;
  else if (options instanceof Date) {
    return {
      age: getAge(options),
      date: options,
      dateString: toDDMMYYYY(options),
    };
  } else {
    return generateBirthDate(options || {});
  }
}
