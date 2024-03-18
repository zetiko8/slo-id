import { FEMALE_NAMES, MALE_NAMES, SURNAMES } from './data/data';
import { getRandomElementOfArray } from './helpers';
import { GENDER } from './types';

export interface PersonName {
  firstName: string;
  surname: string;
}

export interface NAME_OPTIONS {
  gender: GENDER;
  numberOfSurnames: number;
  numberOfNames: number;
  data: PersonName;
}

export function generateName(options: NAME_OPTIONS): PersonName {
  const surname = getNameElement(SURNAMES, options.numberOfSurnames);

  const firstName =
    options.gender === GENDER.F
      ? getNameElement(FEMALE_NAMES, options.numberOfNames)
      : getNameElement(MALE_NAMES, options.numberOfNames);

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
