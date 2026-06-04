// Un functional component es con tsx normalmente y un custom hook es básicamente lo mismo pero podemos colocar un return de valor, arreglo o lo que necesitemos

import { useState } from "react"

export const useCounter = () => {
  
        const [count, setCount] = useState<number>(10)
    
        const increaseBy = (value: number) => {
            //setCount(count + value) //la función dispatcher es la que despacha el nuevo valoro provoca cambio
            //setCount((current)=> current+1 )
            setCount(Math.max(value + count, 0))
        }
  

    return {
        // Properties
    count,

    //Actions
    increaseBy
    }
    
}
