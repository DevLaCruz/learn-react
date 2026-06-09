import { use } from 'react'
import { Button } from '../../../components/ui/button'
import { UserContext } from '../../context/UserContext'
import { LoginPage } from '../auth/LoginPage'



export const ProfilePage = () => {
  const { user, logout } = use(UserContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl">Perfil del usuario</h1>
      <hr />

      <pre className="my-4 w-[80%] overflow-x-auto">
        {JSON.stringify(user, null, 2)}
      </pre>

      <Button variant="destructive" onClick={logout}>
        Salir
      </Button>
    </div>
  );
};