# Ejercicios - Módulo 1: Fundamentos

## Lista de Ejercicios

| # | Ejercicio | Conceptos | Dificultad |
|---|-----------|-----------|------------|
| 1 | [ProfileCard](./exercise-1.md) | Props, children, forwardRef, memo | ⭐⭐ |
| 2 | [Task List](./exercise-2.md) | Lists, keys, useState, derived state | ⭐⭐⭐ |
| 3 | [Button](./exercise-3.md) | Variants, forwardRef, compound components | ⭐⭐⭐ |
| 4 | [Card Composable](./exercise-4.md) | Compound components, slots, composition | ⭐⭐⭐⭐ |

## Cómo resolver

1. Lee el enunciado completo
2. Crea el archivo en `solutions/` (ej: `exercise-1.jsx` o `exercise-1.tsx`)
3. Implementa paso a paso
4. Prueba en tu entorno (Vite, CodeSandbox, etc.)
5. Compara con la solución oficial

## Soluciones disponibles

- `solutions/exercise-1.jsx` / `.tsx` - ProfileCard
- `solutions/exercise-2.jsx` / `.tsx` - Task List
- `solutions/exercise-3.tsx` - Button
- `solutions/exercise-4.tsx` - Card Composable

## Consejos

- **Empieza simple**: Haz que funcione, luego optimiza
- **TypeScript**: Usa los tipos del enunciado como guía
- **Keys**: Siempre usa IDs únicos y estables
- **Composition**: Prefiere children/slots sobre props complejas
- **Testing**: Prueba edge cases (empty states, loading, errors)