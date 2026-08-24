# Ejercicios - Módulo 2: Estado y Eventos

## Lista de Ejercicios

| # | Ejercicio | Conceptos | Dificultad |
|---|-----------|-----------|------------|
| 1 | [State Machine](./exercise-1.md) | useState, functional updates, state machine | ⭐⭐⭐ |
| 2 | [Custom Hooks](./exercise-2.md) | useFetch, useTimer, useLocalStorage | ⭐⭐⭐⭐ |
| 3 | [Formularios Complejos](./exercise-3.md) | Form state, validation, hybrid controlled/uncontrolled | ⭐⭐⭐⭐ |
| 4 | [Performance Optimization](./exercise-4.md) | useMemo, useCallback, React.memo | ⭐⭐⭐ |

## Cómo resolver

1. Lee el enunciado completo
2. Crea el componente/custom hook en `src/custom/` o directamente en `exercises/`
3. Implementa paso a paso probando en el navegador
4. Compara con las soluciones oficiales
5. Experimenta con variaciones

## Soluciones disponibles

- `solutions/exercise-1.jsx/tsx` - State Machine
- `solutions/exercise-2.jsx/tsx` - Custom Hooks
- `solutions/exercise-3.jsx/tsx` - Formularios Complejos
- `solutions/exercise-4.jsx/tsx` - Performance Optimization

## Consejos

- **useState**: functional updates son críticos para race conditions
- **useEffect**: always incluir cleanup return, AbortController para fetches
- **Custom Hooks**: mantenerlos puros, solo side effects, testsear aislados
- **Forms**: híbrido controlado/uncontrolled es poderoso para performance
- **Performance**: React DevTools Profiler es tu mejor amigo

## Ejecutar soluciones

```bash
# Copiar solución a src y probar
cp solutions/exercise-1.tsx src/StateMachine.tsx
# Luego importar y usar en un test page
```