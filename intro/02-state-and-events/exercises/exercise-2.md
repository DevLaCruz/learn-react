# Ejercicio 2: Custom Hooks Avanzados

## Objetivo
Crear 3 custom hooks reutilizables que resuelvan problemas comunes en aplicaciones React.

## Requisitos

1. **useFetch (hook para fetching datos):**
   - Aceptar URL y options de fetch
   - Manejar loading, error y data state
   - Abortar requests anteriores cuando la URL cambia (uso de AbortController)
   - Refetch manual
   - TypeScript: interfaz para el resultado

2. **useTimer (hook para cronómetros):**
   - Start/pause/reset
   - Formato de tiempo (MM:SS o SS.s)
   - Usar setInterval/clearInterval
   - Persistir el tiempo restante si se pausa

3. **useLocalStorage (hook para persistence):**
   - Almacenar y leer de localStorage
   - Lazy initialization desde localStorage
   - Manejar errores si localStorage está lleno/quotas
   - TypeScript: generic type para el valor almacenado

## Ejemplo de uso esperado:

```tsx
function App() {
  const { data, loading, error, refetch } = useFetch('/api/users');
  const [seconds, setSeconds] = useTimer();
  const [name, setName] = useLocalStorage('userName', '');
  
  return (...);
}
```

## Tests de verificación

- [ ] useFetch: data loading error refetch funcionan correctamente
- [ ] useTimer: start/pause/stop funciona, el tiempo cuenta correctamente
- [ ] useLocalStorage: los datos se guardan y cargan de localStorage
- [ ] TypeScript: Types correctos, generic funcionando
- [ ] Sin memory leaks (AbortController cleanup)