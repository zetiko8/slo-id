export function getRandomElementOfArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function isValidInteger(integer: unknown) {
  return !(integer === null ||
    (integer !== undefined && typeof integer !== 'number') ||
    (integer !== undefined && !Number.isInteger(integer)) ||
    (integer !== undefined && Number.isNaN(integer)) ||
    (integer !== undefined && !Number.isFinite(integer)));
}
