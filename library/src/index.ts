import {
  BirthDate,
  BirthDateOptions,
  generateBirthDate,
  getAge,
  toDDMMYYYY,
} from './bith-date';

export interface MockPerson {
  birthDate: BirthDate;
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
  email: string;
  spol: 'M' | 'Ž';
}

export const getMockPerson = (
  options: Partial<MockPersonOptions> = {},
): MockPerson => {
  return {
    birthDate: getBirthDate(options.birthDate),
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
