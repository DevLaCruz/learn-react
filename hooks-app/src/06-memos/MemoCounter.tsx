import { useCounter } from '../03-examples/hooks/useCounter'

const heavyStuff = (interationNumber: number) =>{
    console.time('Heavy stuff started');
    
    for (let index = 0; index < interationNumber; index++){
        console.log('gogoo');
        
    }

    console.timeEnd('Heavy stuff started')
}

export const MemoCounter = () => {

    const {counter, increment} = useCounter(40_000)

  return (
    <div className='bg-gradient flex flex.col gap-4'>
        <h1 className='text-2xl font-bold'>Memo useMemo</h1>

        <hr />
        <h4>
            Counter : { counter }
        </h4>

        <h4>
            Counter : { counter }
        </h4>

        <button className='bg-blue-500 text-white px-4 rounded-b-md py-2 cursor-pointer' onClick={increment}></button>
    </div>
  )
}
