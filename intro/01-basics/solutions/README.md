# Soluciones - Módulo 1: Fundamentos

## Archivos

| Ejercicio | JavaScript | TypeScript |
|-----------|------------|------------|
| 1. ProfileCard | `exercise-1.jsx` | `exercise-1.tsx` |
| 2. Task List | `exercise-2.jsx` | `exercise-2.tsx` |
| 3. Button | - | `exercise-3.tsx` |
| 4. Card Composable | - | `exercise-4.tsx` |

## Patrones demostrados

### Exercise 1: ProfileCard
- Props requeridas vs opcionales con defaults
- `children` para contenido flexible
- `React.memo` con comparación personalizada
- `forwardRef` + `useImperativeHandle` para API imperativa
- TypeScript: interfaces, union types, generic refs

### Exercise 2: Task List
- `useState` para estado de array
- Keys correctas (`id` único, no `index`)
- `useMemo` para estados derivados (filtrado, contadores)
- Handlers inmutables (spread operator)
- Reordenamiento manteniendo estado interno

### Exercise 3: Button
- Variant/size pattern con mapeo de clases
- `loading` state con spinner
- `forwardRef` para focus/click programático
- Compound components (`Button.Group`, `Button.Link`)
- Accesibilidad: `aria-disabled`, `aria-busy`, `aria-label`

### Exercise 4: Card Composable
- Compound components pattern (`Card.Header`, `Card.Body`, etc.)
- Detección automática de sub-componentes vs children simple
- Slots pattern con fallback
- TypeScript: discriminated unions, component types

## Ejecutar soluciones

```bash
# En un proyecto Vite + React + TS
cp solutions/exercise-1.tsx src/components/ProfileCard.tsx
# Importar y usar en App.tsx
```