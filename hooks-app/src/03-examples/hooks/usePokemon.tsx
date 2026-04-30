import { useEffect, useState } from "react"

interface Pokemon {
    id: number
    name: string
    imageUrl: string
}

interface Props {
    id: number

}

export const usePokemon = ({id}:Props) => {  
// Podemos tener un monton de useState para el pokemon en este caso, pero nada nos impide manejar mejor un objeto,
// asi que cuando lo manejamos como un arreglo, eso es basicamnte un objeto

const [pokemon, setPokemon] = useState<Pokemon | null>(null) // Con el genérico estammos dejando en claro que es del tipo pokemon u otro
const [isLoading, setIsLoading] = useState(true)

// Tener en cuenta que si no necesita reaccionar basado en los cambios de react, podríamos colocar la función fuera del componente o customhook para mejor performance
const getPokemonById = async (id: number) => {
    setIsLoading(true)

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()

    setPokemon({
        id:id,
        name: data.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`       
    })

    setIsLoading(false)
}

// no es posible hacer efectos asincronos en react porque siempre tenemos que regresar una función que es la que nosotros usamos para hacer 
// un cleanup y no es promesa lo que regresamos y async lo tramsforma en promesa, lo que vamos hacer aca es que tan pronto de efecto se dispara
// que sería cuando el componente se monta o cuando el id cambia entonces detonamos el efecto y al hacer eso eso todo el getPokemonById de forma asincrona y es mucho mas limpia
useEffect(()=>{

    //Como en nuestro efecto usamos el id, tenemos que proporcionar
    getPokemonById(id)

    // no se aconseja mandar funciones sin memorizar en los efectos porque entonces en cada render sin importar lo que suceda siempre se va 
    // a detonar porque estas funciones siempre se asignan un espacio de memoria distinto
}, [getPokemonById, id])

    return {

    // properties
    isLoading,
    pokemon,

    //padstart es una función de los strings
    formattedId: id.toString().padStart(3,'0')
  }
}
