import * as moment from 'moment';
import { ERROR } from './ERROR';
import { isValidInteger } from './helpers';

export interface BirthDateTimeSpan {
  from: Date;
  to: Date;
}

export interface BirthDateAge {
  age: number;
}

export interface BirthDateAgeSpan {
  maxAge?: number;
  minAge?: number;
}

export interface BirthDate {
  dateString: string;
  age: number;
  date: Date;
}

export function toDDMMYYYY(date: Date) {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1; // Months start at 0!
  const dd = date.getDate();

  let ddString = String(dd);
  let mmString = String(mm);

  if (dd < 10) ddString = '0' + dd;
  if (mm < 10) mmString = '0' + mm;

  return ddString + '.' + mmString + '.' + yyyy;
}

export function getAge(dateOrIsoStringString: Date | string) {
  const today = new Date();
  const birthDate = new Date(dateOrIsoStringString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function isValidDateObject(dateObject: Date) {
  return dateObject.getTime() === dateObject.getTime();
}

function formatDate(date: unknown) {
  if (
    typeof date !== 'string' &&
    typeof date !== 'number' &&
    !(date instanceof Date)
  )
    throw Error('Invalid date ' + date);

  const dateObject = new Date(date);

  if (!isValidDateObject(dateObject)) throw Error('Invalid date ' + date);

  return dateObject;
}

export type BirthDateOptions =
  | BirthDateTimeSpan
  | BirthDateAge
  | BirthDateAgeSpan;

export function generateBirthDate(options: BirthDateOptions): BirthDate {
  if (
    !isValidInteger((options as BirthDateAge).age)
  )
    throw Error(ERROR.birthDate.age);
  if (
    !isValidInteger((options as BirthDateAgeSpan).maxAge)
  )
    throw Error(ERROR.birthDate.maxAge);
  if (
    !isValidInteger((options as BirthDateAgeSpan).minAge)
  )
    throw Error(ERROR.birthDate.minAge);

  if ((options as BirthDateTimeSpan).from) {
    const birtDateTimeSpan = options as BirthDateTimeSpan;
    const from = formatDate(birtDateTimeSpan.from);
    const to = formatDate(birtDateTimeSpan.to);

    return getBirthDateObject(from, to);
  } else if (
    (options as BirthDateAgeSpan).maxAge !== undefined ||
    (options as BirthDateAgeSpan).minAge !== undefined
  ) {
    const birthDateAgeSpan = options as BirthDateAgeSpan;
    const today = new Date();
    let toDate: Date | null = null;
    let fromDate: Date | null = null;
    if (birthDateAgeSpan.maxAge) {
      const yd = new Date(today);
      yd.setFullYear(today.getFullYear() - birthDateAgeSpan.maxAge);
      toDate = yd;
    } else {
      toDate = new Date(1900, 0, 1);
    }
    if (birthDateAgeSpan.minAge) {
      const yd = new Date(today);
      yd.setFullYear(today.getFullYear() - birthDateAgeSpan.minAge);
      fromDate = yd;
    } else {
      fromDate = today;
    }
    return getBirthDateObject(fromDate, toDate);
  } else if ((options as BirthDateAge).age !== undefined) {
    const birthDateAge = (options as BirthDateAge).age;
    const today = new Date();
    const toDate = moment(today)
      .subtract(birthDateAge, 'year')
      .subtract(1, 'day')
      .toDate();
    const fromDate = moment(today).subtract(birthDateAge, 'year').toDate();
    return getBirthDateObject(fromDate, toDate);
  } else {
    const toDate = new Date();
    const fromDate = new Date(1900, 0, 1);
    return getBirthDateObject(fromDate, toDate);
  }
}

function getBirthDateObject(from: Date, to: Date): BirthDate {
  const toTime = to.getTime();
  const fromTime = from.getTime();
  const date = new Date(fromTime + Math.random() * (toTime - fromTime));
  const age = moment(new Date()).diff(date, 'years');

  return {
    dateString: toDDMMYYYY(date),
    age,
    date,
  };
}

