import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BasicTypes } from './typescript/BasicTypes'
import { ObjectLiteral } from './typescript/ObjectLiteral'
import { BasicFunctions } from './typescript/BasicFunctions'

function App() {
  
  return (
    <>
    <h1>Hello React TS</h1>

    {/* <BasicTypes/> */}
    {/* <ObjectLiteral/> */}
    <BasicFunctions/>

    </>
  )
}

export default App
