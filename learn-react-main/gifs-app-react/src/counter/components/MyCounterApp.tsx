import { useCounter } from '../hooks/useCounter'

export const MyCounterApp = () => {

    //si yo regreso un objeto es asi entre llaves que se pone, si fuera un arreglo fuera en cochetes y si es un valor solo se pone la referencia al valor 
    const {counter, handleAdd, handleSubstract, handleReset} = useCounter()
  
    return (
    <div style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>

    <h1>counter: {counter}</h1>

    <div style={{display:'flex', gap:'10px'}}>

        <button onClick={handleAdd}>+1</button>
        <button onClick={handleSubstract}>-1</button>
        <button onClick={handleReset}>Reset</button>
    </div>  

    </div>
  )
}
