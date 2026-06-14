// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
// import { BasicTypes } from './typescript/BasicTypes'
// import { ObjectLiteral } from './typescript/ObjectLiteral'
// import { BasicFunctions } from './typescript/BasicFunctions'
// import { Counter } from "./components/Counter";

import { LoginPage } from "./components/LoginPage"
import { AuthProvider } from "./context/AuthContext"

function App() {

  return (
    <AuthProvider>
    <div className="flex flex-col justify-center items-center h-svh">
    <h1 className="text-3xl mb-5">Hello React TS</h1>

    {/* <BasicTypes/> */}
    {/* <ObjectLiteral/> */}
    {/* <BasicFunctions/> */}
    {/* <Counter/> */}
    <LoginPage/>
    </div>
    </AuthProvider>
  )
}

export default App
