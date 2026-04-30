import React, { useRef } from 'react'

export const FocusScreen = () => {

// Nosotros vamos a encontrarnos en panoramas donde un cambio no queremos que react no haga el rerenderizado cada vez que eso sucede,
// entonces el useRef nos permite tener una variable o "referencia" que no dispara rerenders cuando cambia 

//Para lograr esto inicialmente cuando estamos renderizando el componente primero creamos la variable, todavia no existe ese input, asi que el inputRed lo dejamos en null
// Cuando trabajamos con typescript, osea como buena practica es recomendable tipar esto con HTMLInputElement
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
    console.log(inputRef.current?.value);
    inputRef.current?.select();
    // inputRef.current?.focus();
  };

  return (
    <div className="bg-gradient flex flex-col gap-4">
        <div className="text-2xl font-thin text-white">Focus Screen</div>


        <input 
        ref={inputRef}
        type="text"
        className='bg-white text-black px-4 py-2 rounded-b-md'
        autoFocus
        />


        <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={handleClick}
      >Set focus</button>
    </div>
  )
  
}
