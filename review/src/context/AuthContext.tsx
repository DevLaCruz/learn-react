// El contexto es muy importante para pasar valores globales en toda la aplicación como el tema global, usuario, etc

import { createContext, useContext, useState, type PropsWithChildren } from "react"

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

interface AuthState {
    // hello: string
    status: AuthStatus
    token?: string
    user?:User
}

interface User {
    name: string
    email: string
}

// Aca estoy creadno el contexto
export const AuthContext = createContext({} as AuthState)

// aca estoy creando el custom hook para que sea mas facil a mi para exponer todo lo que el AuthContext tiene 
export const useAuthContext = () => useContext(AuthContext)

// Para proveer con contexto de maneraglobal hay que definir un proveedor

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [status, setStatus] = useState()

    useEffect(() => {
      setTimeout(() =>{

      }, 1500)
    }, [third])
    
    
    return (
        <AuthContext.Provider value={{
            status: 'checking' // <-- String plano
        }}>{children}</AuthContext.Provider>
    )
}