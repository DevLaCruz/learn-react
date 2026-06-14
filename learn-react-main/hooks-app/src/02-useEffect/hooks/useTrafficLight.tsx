import { useEffect, useState } from "react"

// colocamos afuera los colors si es algo que no depende del state
const colors = {
        red: 'bg-red-500 animate-pulse',
        yellow: 'bg-yellow-500 animate-pulse',
        green: 'bg-green-500 animate-pulse'
    }
    //Para un objeto literal usamos una interfaz pero para un primitivo específico mejor como type
    // type TrafficLightColor = 'red' | 'yellow' | 'green' -> esta es una primera alternativa pero si queremos agregar mas colores en colors y con el fin de hacerlo mas practico puede ser así:
    type TrafficLightColor = keyof typeof colors


export const useTrafficLight = () => { 

    // La idea es que cambiemos acorde al estado actual, para hacerlo osea que cambie fisicamente la pantalla como por ejemplo ahora
    // hacer que se seleccione el rojo, deebemos de definir una pieza de estado, para eso esta el useState

    // El useState es un generico y por eso vamos a usar el menor y mayor, sintaxis de generico
    const [light, setLight] = useState<TrafficLightColor>('red') // tenemos light que es la "variable" que podemos usar y la estamos desestructurando,
    // tenemos setLigth que es la funcion disptacher que va cambiar la varialbe ligth y el estado inicial lo definimos en red por ejemplo, despues del igual se definel estado incial


    const [countDown, setCountDown] = useState(5)

    // Una vez que creamos el useEffect y no en todos los casos tiene 2 piezas, tiene un arrego que es conocido como la lista de dependecias que son opcionales pero dice cada cuanto vamos a disparar un efecto
    
    
    // Es muy comun ver problemas de rendimiento con los efectos, los efectos deben usarse con mucho cuidado, por ejemplo este:
    // useEffect(() => {

    //   // Este efecto de imprimir en consola se va a disparar cada vez que el light cambie y la primera vez que nuestro componente se monta
    //   console.log({countDown});
      
    //   setInterval(() => {

    //     console.log(' setInterval llamado');
    //     setcountDown(prev => prev -1)

    //   }, 1000);

    //   //Quiero que se dispare cada vez que el countdown cambie
    // }, [countDown])

    // lo que pasa es que tenemos un efecto que vuelve a disparar el mismo efecto que se dispara cada vez que el countdown cambia, entonces tenemos un efecto que dispra otra vez el mismo efecto, que vuelve a
    // definir el setinterval que internamente dentro de 1s cambia el efecto, entonces cada segundo estoy creando 2 y esos 2 crean 4 y esos 4 crean 8 y asi va generando una funga de memoria terrible



    // La solución es los cleanup, por cierto este es solo el effect para el caountdown por eso se comentó el resto
    useEffect(() => {

      // Este efecto de imprimir en consola se va a disparar cada vez que el light cambie y la primera vez que nuestro componente se monta
      // console.log({countDown});

      if(countDown ===0) return

      // if(countDown ===0){
      //   setCountDown(5)
      //   if(light === 'red'){
      //     setLight('green')
      //     return
      //   }
      //   if(light === 'yellow'){
      //     setLight('red')
      //     return
      //   }
      //   if(light === 'green'){
      //     setLight('yellow')
      //     return
      //   }
      // }
      
      // // Para evitar ese problema de memoria que mencionamos esta el cleanup definiendolo con const intervalId 
      const intervalId = setInterval(() => {

        console.log(' setInterval llamado');
        setCountDown(prev => prev -1)

      }, 1000)

      return ()=>{
        console.log('Cleanup effect');
        clearInterval(intervalId)
        // con esto veremos que en consola baja 1 cada segundo pero con if(countDown ===0) return ya no baja de 0
      }

      //Quiero que se dispare cada vez que el countdown cambie

      // Una de las recomendaciones de si estamos usando una variable de state, tenemosque actualizar nuestro arregle de dependecias, en este caso countDown, light
      // Se recomiendan que los efectos tengan una tarea en específico, es decir, sean atómicos
      
    }, [countDown, light, colors])




    // Change light color effect
    useEffect(()=>{

      if(countDown > 0) return
         setCountDown(5)
      
       
        if(light === 'red'){
          setLight('green')
          return
        }
        if(light === 'yellow'){
          setLight('red')
          return
        }
        if(light === 'green'){
          setLight('yellow')
          return
        
      }

    }, [countDown, light, colors])


    return {
    //params
    light,
    colors,
    countDown,

    // computed, son "calculos" o "logica"
    percentage: (countDown / 5) * 100,

    redLight: light === 'red' ? colors.red : 'bg-gray-500',
    yellowLight: light === 'yellow' ? colors.yellow : 'bg-gray-500',
    greenLight: light === 'green' ? colors.green : 'bg-gray-500',
    

    //methods
    setLight,
    setCountDown
  }
    
}
