import React, { useContext, useState } from 'react'
import { useCounter } from '../hooks/useCounter'

export const Counter = () => {

    const {count, increaseBy} = useCounter()

    // Recordar que useState es una función genérica donde se le puede especificar el tipo de dato que va a manejar
  return (
    <>
    <h3 className='text-2xl'>Counter: <small className='font-bold'>{count}</small></h3>

    <div>
        <button
        className="p-2 bg-blue-500 rounded-xl w-10 mx-2 text-white hover:bg-blue-700"
        onClick={()=>increaseBy(+1)}
        >+1</button>

        <button
        className="p-2 bg-blue-500 rounded-xl w-10 mx-2 text-white hover:bg-blue-700"
        onClick={()=>increaseBy(-1)}
        >-1</button>
    </div>

   </>
  )
}
