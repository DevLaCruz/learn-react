import { RouterProvider } from 'react-router'
import {appRouter} from './router/app.router'
import { UserContextProvider } from './context/UserContext'

// Aca vamos a colocar idealmente nuestro contexto

export const ProfessionalApp = () => {
  return (
    <UserContextProvider >
    <div className='bg-gradient flex flex-col'>
        <RouterProvider router={appRouter}/>
    </div>
    </UserContextProvider>
   
  )
}
