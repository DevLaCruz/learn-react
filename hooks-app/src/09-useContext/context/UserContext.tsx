import { useState } from "react"

interface UserContextProps {
    children: React.ReactNode
}

export const UserContextProvider = ({children}: any) => {

const [name, setName] = useState('Alejandro')


// El tipado ayuda a saber que informacion es la que fluye
// por aca podemos reotrnar una estrcutura html, sin embargo, no se recomienda que en el UserContextProvider se retorna un html
// sería mejor para eso crearse un componente aparte que herede esa estructura html a sus hijos , el provider es mas ara lógica de negocio

return (
<div>
    <h1>Hello</h1>
    {children}
</div>
)
}
