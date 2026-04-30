import { useTrafficLight } from "./hooks/useTrafficLight";


export const TrafficLightWithHook = () => {
     const {light, colors, countDown, percentage, redLight, yellowLight, greenLight, setCountDown} = useTrafficLight()
    
  return (

    // Cuando la variable de estado cambia por medio del setLight react vuelve a dibujar todo este componente

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">

        <h1 className="text-white tesxt-3xl font-thin">Semaforo con useEffect</h1>
        <h2 className="text-white tesxt-xl">Countdown {countDown}</h2>

        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear" style = {{ width: `${percentage}`}}>
          </div>
        </div>

        {/* <div className={`w-32 h-32 ${light === 'red' ? colors[light] : 'bg-gray-500'} rounded-full`}></div> */}
        <div className={`w-32 h-32 ${redLight}'} rounded-full`}></div>

        {/* <div className={`w-32 h-32 ${light === 'yellow' ? colors[light] : 'bg-gray-500'} rounded-full`}></div> */}
        <div className={`w-32 h-32 ${yellowLight} rounded-full`}></div>

        {/* <div className={`w-32 h-32 ${light === 'green' ? colors[light] : 'bg-gray-500'} rounded-full`}></div> */}
        <div className={`w-32 h-32 ${greenLight} rounded-full`}></div>

     
      </div>
    </div>
  );
};