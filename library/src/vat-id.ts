export function generateVatId() {
  // algorithm on http://www.durs.gov.si/si/storitve/vpis_v_davcni_register_in_davcna_stevilka/vpis_v_davcni_register_in_davcna_stevilka_pojasnila/davcna_stevilka_splosno/
  const firstSeven = Math.floor(1000000 + Math.random() * 8999999)
    .toString()
    .split('');
  let controlNumber = 0;
  for (let i = 0; i < 7; i++) {
    controlNumber += Number(firstSeven[i]) * (8 - i);
  }
  controlNumber = 11 - (controlNumber % 11);
  if (controlNumber == 10) {
    controlNumber = 0;
  }
  if (controlNumber == 11) {
    return generateVatId();
  } // repeat to randomly find a good vatId
  return firstSeven.join('') + controlNumber.toString();
}
