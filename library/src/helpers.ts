export function getRandomElementOfArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function isValidInteger(integer: unknown) {
  return !(
    integer === null ||
    (integer !== undefined && typeof integer !== 'number') ||
    (integer !== undefined && !Number.isInteger(integer)) ||
    (integer !== undefined && Number.isNaN(integer)) ||
    (integer !== undefined && !Number.isFinite(integer)) ||
    (integer !== undefined && integer < 0)
  );
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomBit() {
  return getRandomInt(0, 1) as 0 | 1;
}
