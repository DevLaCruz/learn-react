import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"
import { users, type User } from "../data/user-mock.data"

// esta tambien es una manera de tipar el children:s
// interface UserContextProps {
//     children: React.ReactNode // hay varias formas de tipar esto
// }


type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated'

interface UserContextProps {
  // state
  authStatus: AuthStatus;
  user: User | null;
  isAuthenticated: boolean;

  // Methods
  login: (userId: number) => boolean;
  logout: () => void;
}

//Inicializando contexto
export const UserContext = createContext({} as UserContextProps)


export const UserContextProvider = ({children}: PropsWithChildren) => {
// Recordar que un Children es una prop especial que representa los elementos anidados de un componente

// Un provider es un High older component que puede proveer usualmente algun tipo de estado o funcionalidad a todos sus hijos, y sus hijos pueden
// navegar hacia el de diversas maneras, una de ellas es con un hook como useContext, sin embargo en nuevas versiones lo ideal es usar el "use"


const [authStatus, setAuthStatus] = useState<AuthStatus>('checking')
const [user, setUser] = useState<User|null>(null)

const handleLogin = (userId: number) => {
    // console.log(userId);   
    
    const user = users.find(user => user.id === userId)

    if(!user) {
        console.log('User not found');
        setUser(null)
        setAuthStatus('not-authenticated')
        return false
    }

    setUser(user)
    setAuthStatus('authenticated')
    return true
}

 const handleLogout = () => {
    console.log('logout');
    setAuthStatus('not-authenticated');
    setUser(null);
    localStorage.removeItem('userId');
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      handleLogin(+storedUserId);
      return;
    }

    handleLogout();
  }, []);



// La idea es que en algun Provider proveer información y comportamientos (funciones), entonces ara quelos componentes puedan compartir un 
// estado global debemos colocarlo en un punto alto de todo inclusive mas arriba del router, ese lugar es un Contexto y por eso hemos creado 
// este functional component

// El tipado ayuda a saber que informacion es la que fluye
// por aca podemos retornar una estrcutura html, sin embargo, no se recomienda que en el UserContextProvider se retorna un html
// sería mejor para eso crearse un componente aparte que herede esa estructura html a sus hijos , el provider es mas ara lógica de negocio


// return (
// <div>
//     <h1>Hello</h1>
//     {children}
// </div>
// )

 return (
    <UserContext
      value={{
        authStatus: authStatus,
        isAuthenticated: authStatus === 'authenticated',
        user: user,

        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
