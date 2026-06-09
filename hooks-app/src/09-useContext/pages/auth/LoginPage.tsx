import React from 'react'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { Link } from 'react-router'

export const LoginPage = () => {
  return (
    <div className='flex flex-col items-center min-h-screen'>
      <h1 className="text-4xl font-bold">Login</h1>

      <hr />

      <form action="">
        <Input
        type='number'
        placeholder='User ID'
        />

        <Button type='submit'>
          Login
        </Button>

        <Link to='/'>
        <Button variant='ghost'>Return to page</Button>
        </Link>
      </form>
    </div>
  )
}
