import React from 'react'
import { Link } from 'react-router'

export const AboutPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-4x1 font-bold'> About page</h1>

      <hr />

      <div className="flex flex-col gap-2">
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>

        </div>  
    </div>
  )
}
