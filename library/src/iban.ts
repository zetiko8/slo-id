import { Chance } from 'chance';

const chance = Chance();

const letter_map = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  G: 16,
  H: 17,
  I: 18,
  J: 19,
  K: 20,
  L: 21,
  M: 22,
  N: 23,
  O: 24,
  P: 25,
  Q: 26,
  R: 27,
  S: 28,
  T: 29,
  U: 30,
  V: 31,
  W: 32,
  X: 33,
  Y: 34,
  Z: 35,
};

function num_gen3(span: number) {
  const num2 = chance.string({ length: span, pool: '123456789' });
  return num2;
}

function char_gen(span: number) {
  const char2 = chance.string({
    length: span,
    pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  });
  return char2;
}

function bankAccountKey(string: string) {
  let deb: string;
  while (((deb = string.substr(0, 12)), (string = string.substr(12)))) {
    string = (Number(deb) % 97).toString() + string;
  }
  const rst = 98 - (Number(deb) % 97);
  return rst < 10 ? '0' + rst : '' + rst;
};

function replaceChars(conv_string: string) {
  for (let i = 0; i < conv_string.length; i++) {
    const conv_char = conv_string[i];
    if (conv_char in letter_map) {
      const IBAN_conv = (letter_map as any)[conv_char];
      conv_string = conv_string.replace(conv_char, IBAN_conv.toString());
    }
  }
  return conv_string;
}

function calcChecksum(countryCode: string, randomPart: string) {
  let checkString = randomPart + countryCode + '00';
  checkString = replaceChars(checkString);
  const checksum = bankAccountKey(checkString);
  let checkCheck = randomPart + countryCode + checksum;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkCheck = replaceChars(checkCheck);
  return countryCode + checksum.toString() + randomPart;
}

export function generateIban() {
  const ISO = 'SI';
  const IBAN_length = 19;
  const middle_characters = 0;
  const numeric_suffix = Number(IBAN_length - 4 - middle_characters);
  const numeric_part = num_gen3(numeric_suffix);
  const BIC = char_gen(middle_characters);
  const randomPart = BIC + numeric_part + '';
  const interIBAN = calcChecksum(ISO, randomPart);
  return interIBAN;
}
