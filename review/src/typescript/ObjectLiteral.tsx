interface Person {
    age: number,
    firstName: string,
    lastName: string,
    address: Address
}

interface Address {
    country: string,
    house?: string
}

export const ObjectLiteral = () => {

    const person: Person = {
        age:24,
        firstName: 'Alejandro',
        lastName: 'De La Cruz',
        address: {
            country: 'Peru',
            house: '800'
        }
    }

  return (
  
  <>
    <h3>ObjectLiteral</h3>

    <pre>
        {JSON.stringify(person, null, 2)}
    </pre>
    </>
  )
}
