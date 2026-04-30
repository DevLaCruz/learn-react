import { useCounter } from "./hooks/useCounter";
import { usePokemon } from "./hooks/usePokemon";

export const PokemonPage = () => {

// El counter se encarga unicamente de cambiar 1 numero y luego tenemos el otro hook que se encarga de la info del pokemon  
// Recordar que como trabaja react es que renderiza el componente de arriba hacia abajo, quiere decir que primero monta el customhook, monta el state
// y devuelve el valor del counter, luego cuando del counter cambia entonces vuelve  a detonar el cambio en useCounter y por eso el efecto se vuelve a detonar, porque nuestra property cambió
const {counter, increment, decrement} = useCounter()
const {pokemon, isLoading, formattedId} = usePokemon({ id:counter})

//Con esto cada vez tendremos el Loading
if(isLoading){
  return(
    <div className="bg-gradient flex flex-col items-center">
      <h1 className="text-2xl font-thin text-white">Pokémon</h1>
      <h3 className="text-xl font-bold text-white">Cargando...

      </h3>
      </div>
  )
}

// Si no existe el pokemon

if(!pokemon){
  return(
    <div className="bg-gradient flex flex-col items-center">
      <h1 className="text-2xl font-thin text-white">Pokémon</h1>
      <h3 className="text-xl font-bold text-white">Not found

      </h3>
      </div>
  )
}

  return (
    <div className="bg-gradient flex flex-col items-center">
      <h1 className="text-2xl font-thin text-white">Pokémon</h1>
      <h3 className="text-xl font-bold text-white">#{formattedId} {pokemon?.name}</h3>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${counter}.png`}
        alt={pokemon.name}
      />

      <div className="flex gap-2">
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={decrement}>
          Anterior
        </button>
        
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={increment}>
          Siguiente
        </button>
       
      </div>
    </div>
  );
};