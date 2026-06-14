import React from 'react'

export const BasicTypes = () => {

const name: string = 'Alejandro'
const age: number = 24
const isActive: boolean = true

const powers: string[] = ['React', 'React Native', 'Python', 'Java', 'Vue', 'Rust', 'DataBases','DevSecOps'] //Debemos evitar usar el tipo de dato any

  return (
    <>
    <h3>Basic Types</h3>

 {/* Cuando hacemos la interpolación de un html no graica nada, entonces debemos hacer alguna condición como se puede ver */}
    {name} - {age} - {isActive ? 'Active' : 'No Active'}
    <p>{powers.join(', ')}</p>
    </>
  )
}
