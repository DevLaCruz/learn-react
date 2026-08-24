# Ejercicio 4: Optimización y Performance en Estados

## Objetivo
Crear técnicas de optimización para evitar re-renders innecesarios y mejorar performance.

## Requisitos

1. **useMemo para computed values:**
   - Calcular valores costosos solo cuando dependencias cambian
   - Ejemplo: filtrar/ordenar una lista grande
   - Comparación de objetos vs arrays

2. **useRef para evitar callbacks infinitos:**
   - Usar ref para almacenar valores que cambian pero no triggeran render
   - Ejemplo: timer IDs, flags, prevProps

3. **useCallback para stabilizar callbacks:**
   - Pass functions hijo sin que se re-creen en cada render
   - Dependency array correcta

3. **Prevención de re-renders con React.memo:**
   - Crear componente memoizado
   - Comparación personalizada (arePropsEqual)
   - Cuando usarMemo vs useCallback vs memo

## Entregables

- Componente `OptimizedList` que reciba 1000+ items y solo renderice los visibles
- Demo de `useCallback` vs functions inline
- Demo de `useMemo` vs cálculo en render

## Tests de verificación

- [ ] useMemo: valores recalculados solo cuando cambian las deps
- [ ] useRef: valores mutable sin causar re-renders
- [ ] useCallback: callbacks estables entre renders
- [ ] React.memo: hijo no re-renderiza si props no cambian
- [ ] TypeScript: types correctos
- [ ] Performance: medir renders con React DevTools Profiler