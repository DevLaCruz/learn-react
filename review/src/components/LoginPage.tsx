// import React from 'react'
import { useAuthContext } from '../context/AuthContext'

export const LoginPage = () => {
  
    const {hello} = useAuthContext()
  
    return (
    <>
    
    <h3>Login</h3>
    
    <span>{hello}</span>
    </>
  )
}
