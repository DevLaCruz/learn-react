const addTwoNumbers = (a:number, b:number): number =>{
        return a+b
    }

    // Si queremos regresar un string de la funcion de arriba ya sea para no convertirlo mas adelante o ponerlo en otros lugares sería:
    // const addTwoNumbers = (a:number, b:number): string =>{
    //     return `${a+b}`
    // }


export const BasicFunctions = () => {

  return (
    <>
    <h3>Functions</h3>of sum 2+6 = {addTwoNumbers(2,6)}
    <span>The result </span>
    </>
  )
}
