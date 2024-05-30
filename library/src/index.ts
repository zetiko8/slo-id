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
import { MALE_NAMES, FEMALE_NAMES, ADDRESSES } from './data/data';
import { ERROR } from './ERROR';
import { getRandomBit, getRandomElementOfArray } from './helpers';
import { MobileNumberOptions, generateMobileNumber } from './mobile-number';
import { generateAddress } from './address';
import { generateVatId } from './vat-id';
import { generateIban } from './iban';

export { GENDER, GenerativeData };
export interface MockPerson {
  birthDate: BirthDate;
  email: string;
  name: { firstName: string; surname: string };
  gender: GENDER;
  mobileNumber: string;
  address: {
    street: string;
    zipCode: string;
    city: string;
  };
  vatId: string;
  iban: string;
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
  mobileNumber: MobileNumberOptions;
  address: {
    street?: string;
    zipCode?: string;
    city?: string;
  };
  email: EmailOptions;
  gender: GENDER;
  vatId: string;
  iban: string | { data: string[] };
}

export const getMockPerson = (
  options: Partial<MockPersonOptions> = {},
  data: GenerativeData = {
    MALE_NAMES,
    FEMALE_NAMES,
    ADDRESSES,
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
    mobileNumber: generateMobileNumber(options.mobileNumber),
    address: generateAddress(options.address || {}, data),
    vatId: options.vatId || generateVatId(),
    iban: getIban(options.iban),
  };
};

function getIban(options?: string | { data: string[] }): string {
  if (options === '') throw Error(ERROR.ibanValue);
  if (typeof options === 'string' && options !== '') {
    return options;
  } else if (options !== undefined && options !== '') {
    const opts = options as { data: string[] };
    if (!Array.isArray(opts.data) || !opts.data.length)
      throw Error(ERROR.iban.data);
    return getRandomElementOfArray(opts.data);
  } else return generateIban();
}

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
