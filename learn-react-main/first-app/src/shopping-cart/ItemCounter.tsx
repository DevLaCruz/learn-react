import React, { useState } from 'react'

import './itemCounter.css'

interface Props { 
  name: string; 
  quantity?: number;
}

export const ItemCounter = ({name, quantity = 0}:Props) => {
    
  const [count, setCount] = useState(quantity)
  
  const handleAdd = ()=>{
    setCount(count + 1)
  }

  const handleSubtrack = ()=>{

    if(count<=1) return
    setCount(count - 1)
  }

  return (
    <section
    // style={{
    //     display: 'flex',
    //     alignItems:'center',
    //     gap:10,
    //     marginTop:10,
    // }}

    // sin css modules
    className='rowsec'
    >
        {name}
        <button
        onClick={handleAdd}>+1</button>
        <span className='item-text'>{count}</span>
        <button onClick={handleSubtrack}>-1</button>
    </section>
  )
}
