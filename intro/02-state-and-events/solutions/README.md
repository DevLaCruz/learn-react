# Soluciones - Módulo 2: Estado y Eventos

## Archivos

| Ejercicio | JavaScript | TypeScript |
|-----------|------------|------------|
| 1. State Machine | `exercise-1.jsx` | `exercise-1.tsx` |
| 2. Custom Hooks | - | `exercise-2.tsx` |
| 3. Formularios Complejos | - | `exercise-3.tsx` |
| 4. Performance Optimization | - | `exercise-4.tsx` |

## Resumen de Soluciones

### Exercise 1: State Machine
- TrafficLight state machine con transitions definidas
- Counter with history usando past/future arrays
- Functional updates patterns
- TypeScript: StateMachineState type, trafficLightReducer pattern

### Exercise 2: Custom Hooks
- **useFetch**: abortController pattern, loading/error/ data state
- **useTimer**: interval management, start/pause/reset, ref counting
- **useLocalStorage**: lazy init, error handling quotas, generic type
- Best practices: keep hooks focused, test in isolation

### Exercise 3: Formularios Complejos
- Form state management con useState anidado
- Validation in real-time vs on submit
- Hybrid controlled/uncontrolled pattern
- localStorage persistence con error handling

### Exercise 4: Performance Optimization
- useMemo: computed values, filtered/sorted lists
- useCallback: stable fn references, hijo memoization
- React.memo: pure components, arePropsEqual custom
- Patrón: container vs presentacional, render props vs HOC