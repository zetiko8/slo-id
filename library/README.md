# slo-id

Generate fake slovenian people for testing.

## Getting started

```bash
`npm i slo-id`
```

```typescript
import { getMockPerson } from 'slo-id';

describe('test', () => {
    it('produces a person', () => {
        const person = getMockPerson();

        console.log(person);
        /**
         * {
         *    birthDate: { dateString: '10.01.1935', age: 89, date: 1935-01-10T15:06:07.009Z },
         *    email: 'leopoldina.bevc@gmail.com',
         *    name: { surname: 'Bevc', firstName: 'Leopoldina' },
         *    gender: 'F',
         *    mobileNumber: '031627478',
         *    address: { street: 'Bilje 12', zipCode: '2000', city: 'Maribor' },
         *    vatId: '57495998',
         *    iban: 'SI48847443223722412'
         *    }
         */
    });
})
```

## Api reference
```typescript
import { getMockPerson } from 'slo-id';

const person = getMockPerson({
    // optional options object
    // see types for reference
    {
        birthDate: { minAge: 18 },
        gender: 'M',
        email: 'test@email.com',
        mobileNumber: { withCountryCode: true },
    },
});
```
