export interface MockPerson {
  davcnaStevilka: string;
  datumRojstva: string;
  ime: string;
  priimek: string;
  mobitel: string;
  ulica: string;
  postnaStevilka: string;
  kraj: string;
  email: string;
  spol: 'M' | 'Ž',
}

export interface MockPersonOptions {
  data?: Partial<MockPerson>, 
}

export const getMockPerson = (
  options: MockPersonOptions,
): MockPerson => {
  const spola = ['MoÅ¡ki', 'Å½enski'];
  const spol = Math.floor(Math.random()*2);

  const kraj
    = gen_kraj();
  return {
    davcnaStevilka: gen_davcna().toUpperCase(),
    datumRojstva: gen_datum().toUpperCase(),
    ime: gen_ime(spol).split(' ')[0].toUpperCase(),
    priimek: gen_ime(spol).split(' ')[1].toUpperCase(),
    mobitel: gen_telefonska().toUpperCase(),
    ulica: kraj.split(',')[0].toUpperCase(),
    postnaStevilka: kraj.split(',')[1].split(' ')[1].toUpperCase(),
    kraj: kraj.split(',')[1].split(' ')[2].toUpperCase(),
    email: email.toUpperCase(),
    spol: (spol ? 'Ž' : 'M') as 'M' | 'Ž',
  }
}

function gen_datum(

){
  const danes = new Date(); //danaÅ¡nji datum, objekt
  const datum_do = danes.getTime() - (31536000000 * 18); //najmanjÅ¡a starost je 18 let (567648000000 mikrosekund je 18 let)
  const datum_od = datum_do - (31536000000 * 47); // najstarejÅ¡a starost naj bo 65 let, torej (dotum_do - 47 let)
  const datum = new Date(datum_od + Math.random() * (datum_do - datum_od)); //najkljuÄni datum med datum_od in datum_do
  const starost = danes.getFullYear() - datum.getFullYear(); //izraÄunaj starost iz datuma
  let dan: string;
  let mesec: string;
  if(datum.getDate()<10){
    dan = '0'+(datum.getDate()+1).toString();
  } else{
    dan = (datum.getDate()).toString();
  } // spredi 0
  if(datum.getMonth()<9){
    mesec = '0'+(datum.getMonth()+1).toString();
  }else{
    mesec = (datum.getMonth()+1).toString();
  } // spredi 0
  return dan + '.' + mesec + '.' + datum.getFullYear().toString();
}

function gen_kraj(){
  return naslovi[Math.floor(Math.random()*naslovi.length)].replace(/(\d+)+/, () => String(Math.floor(1 + Math.random() * 32))); //spremeni hiÅ¡no Å¡tevilko
}

const fakeId = (
  options: MockPersonOptions,  
) => {
  const spola = ['MoÅ¡ki', 'Å½enski'];
  const spol = Math.floor(Math.random()*2);

  const kraj
    = gen_kraj();
  return {
    davcnaStevilka: gen_davcna().toUpperCase(),
    datumRojstva: gen_datum().toUpperCase(),
    ime: gen_ime(spol).split(' ')[0].toUpperCase(),
    priimek: gen_ime(spol).split(' ')[1].toUpperCase(),
    mobitel: gen_telefonska().toUpperCase(),
    ulica: kraj.split(',')[0].toUpperCase(),
    postnaStevilka: kraj.split(',')[1].split(' ')[1].toUpperCase(),
    kraj: kraj.split(',')[1].split(' ')[2].toUpperCase(),
    email: email.toUpperCase(),
    spol: (spol ? 'Ž' : 'M') as 'M' | 'Ž',
  }
}