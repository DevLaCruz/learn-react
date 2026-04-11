import React, { useState } from 'react'

export const useCounter =(initValue: number = 5 )=>{
    
    
    const [counter, setcounter] = useState(initValue)

    const handleAdd = () => {
        setcounter(counter + 1)
    }

    const handleSubstract = () => {
        setcounter(prevState => prevState - 1)
    }

    const handleReset = () => {
        setcounter(5)
    }

return {

    //props or values
    counter,

    //methods or actions
    handleAdd,
    handleSubstract,
    handleReset,

}

}


