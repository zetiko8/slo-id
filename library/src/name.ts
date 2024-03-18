import { FEMALE_NAMES, MALE_NAMES, SURNAMES } from './data/data';
import { getRandomElementOfArray } from './helpers';
import { GENDER } from './types';

export interface PersonName {
  firstName: string;
  surname: string;
}

export interface NameOptions {
  gender: GENDER;
  numberOfSurnames?: number;
  numberOfNames?: number;
  data?: PersonName;
}

export function generateName(options: NameOptions): PersonName {
  const surname = getNameElement(SURNAMES, options.numberOfSurnames || 1);

  const firstName =
    options.gender === GENDER.F
      ? getNameElement(FEMALE_NAMES, options.numberOfNames || 1)
      : getNameElement(MALE_NAMES, options.numberOfNames || 1);

  return {
    surname,
    firstName,
  };
}

function getNameElement(names: string[], numberOfSubElements: number) {
  let element = '';
  for (let i = 0; i < numberOfSubElements; i++) {
    element += getRandomElementOfArray(names);
  }

  return element;
}
