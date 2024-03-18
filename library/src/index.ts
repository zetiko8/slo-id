import {
  BirthDate,
  BirthDateOptions,
  generateBirthDate,
  getAge,
  toDDMMYYYY,
} from './bith-date';
import { EmailOptions, generateEmail } from './email';
import { generateName } from './name';
import { GENDER, GenerativeData } from './types';
import { MALE_NAMES, FEMALE_NAMES } from './data/data';
import { ERROR } from './ERROR';
import { getRandomBit } from './helpers';

export { GENDER, GenerativeData };

export interface MockPerson {
  birthDate: BirthDate;
  email: string;
  name: { firstName: string; surname: string };
  gender: GENDER;
}

export interface MockPersonOptions {
  davcnaStevilka: string;
  birthDate: BirthDateOptions | Date | BirthDate;
  name: {
    numberOfSurnames?: number;
    numberOfNames?: number;
    firstName?: string;
    surname?: string;
  };
  mobitel: string;
  ulica: string;
  postnaStevilka: string;
  kraj: string;
  email: EmailOptions;
  gender: GENDER;
}

export const getMockPerson = (
  options: Partial<MockPersonOptions> = {},
  data: GenerativeData = {
    MALE_NAMES,
    FEMALE_NAMES,
  },
): MockPerson => {
  const gender = getGender(options.gender);
  const nameObject = generateName(
    {
      gender,
      ...options.name,
    },
    data,
  );
  return {
    birthDate: getBirthDate(options.birthDate),
    email: generateEmail(
      nameObject.firstName,
      nameObject.surname,
      options.email,
    ),
    name: nameObject,
    gender,
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

function getGender(gender?: GENDER): GENDER {
  if (gender !== undefined && gender !== GENDER.M && gender !== GENDER.F)
    throw Error(ERROR.gender);

  if (gender !== undefined) return gender;
  else {
    return getRandomBit() === 1 ? GENDER.M : GENDER.F;
  }
}
