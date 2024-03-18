import { ERROR } from './ERROR';
import { SURNAMES } from './data/data';
import { getRandomElementOfArray, isValidInteger } from './helpers';
import { GENDER, GenerativeData } from './types';

export interface PersonName {
  firstName: string;
  surname: string;
}

export interface NameValues {
  firstName?: string;
  surname?: string;
}

export interface NameOptions {
  gender: GENDER;
  numberOfSurnames?: number;
  numberOfNames?: number;
  firstName?: string;
  surname?: string;
}

export function generateName(
  options: NameOptions,
  data: GenerativeData,
): PersonName {
  if (
    options.numberOfNames !== undefined &&
    (!isValidInteger(options.numberOfNames) || options.numberOfNames === 0)
  )
    throw Error(ERROR.name.numberOfNames);
  if (
    options.numberOfSurnames !== undefined &&
    (!isValidInteger(options.numberOfSurnames) ||
      options.numberOfSurnames === 0)
  )
    throw Error(ERROR.name.numberOfSurnames);
  if (
    options.firstName !== undefined &&
    (typeof options.firstName !== 'string' || options.firstName === '')
  )
    throw Error(ERROR.name.firstName);
  if (
    options.surname !== undefined &&
    (typeof options.surname !== 'string' || options.surname === '')
  )
    throw Error(ERROR.name.surname);

  const surname =
    options.surname ||
    getNameElement(SURNAMES, options.numberOfSurnames || 1);

  const firstName =
    options.firstName ||
    (options.gender === GENDER.F
      ? getNameElement(data.FEMALE_NAMES, options.numberOfNames || 1)
      : getNameElement(data.MALE_NAMES, options.numberOfNames || 1));

  return {
    surname,
    firstName,
  };
}

function getNameElement(names: string[], numberOfSubElements: number) {
  const elements: string[] = [];
  for (let i = 0; i < numberOfSubElements; i++) {
    elements.push(getRandomElementOfArray(names));
  }

  return elements.join(' ');
}
