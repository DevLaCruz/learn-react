import { useState } from "react";

export const TrafficLight = () => {

    const colors = {
        red: 'bg-red-500 animate-pulse',
        yellow: 'bg-yellow-500 animate-pulse',
        green: 'bg-green-500 animate-pulse'
    }

    // La idea es que cambiemos acorde al estado actual, para hacerlo osea que cambie fisicamente la pantalla como por ejemplo ahora
    // hacer que se seleccione el rojo, deebemos de definir una pieza de estado, para eso esta el useState

    const [light, setLight] = useState('red') // tenemos light que es la "variable" que podemos usar y la estamos desestructurando,
    // tenemos setLigth que es la funcion disptacher que va cambiar la varialbe ligth y el estado inicial lo definimos en red por ejemplo, despues del igual se definel estado incial


    const handleColorChange = (color: string) =>{
        setLight(color)
    }
  return (

    // Cuando la variable de estado cambia por medio del setLight react vuelve a dibujar todo este componente

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">

        <div className={`w-32 h-32 ${light === 'red' ? colors[light] : 'bg-gray-500'} rounded-full`}></div>
        <div className={`w-32 h-32 ${light === 'yellow' ? colors[light] : 'bg-gray-500'} rounded-full`}></div>
        <div className={`w-32 h-32 ${light === 'green' ? colors[light] : 'bg-gray-500'} rounded-full`}></div>

        {/* Botón para cambiar el estado de la luz */}
        <div className="flex gap-2">
          <button
          onClick={() => setLight('red')}
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer">
            Rojo
          </button>
          <button
          onClick={() => setLight('yellow')}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer">
            Amarillo
          </button>
          <button
          onClick={() => setLight('green')}
            className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer">
            Verde
          </button>
        </div>
      </div>
    </div>
  );
};