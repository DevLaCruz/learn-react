# Ejercicio 1: Gestor de Estado con State Machine

## Objetivo
Crear un state machine simple con `useState` para gestionar el estado de un tráfico semáforo o un contador con historial.

## Requisitos

1. **State Machine de Semáforo:**
   - Estado inicial: 'red'
   - Estados posibles: 'red' ↔ 'green' ↔ 'yellow' ↔ 'red'
   - Botón "Siguiente" para cambiar de estado
   - Mostrar el color actual con estilos diferentes por cada estado
   - Contador de vueltas (cuántas veces ha dado el ciclo completo)

2. **State Machine de Contador con Historial:**
   - Contador que puede incrementarse y decrementarse
   - Botones: +1, -1, Undo, Redo, Reset
   - Historial de valores pasado (puede usar `useState` para stored el historial)
   - Las operaciones Undo/Redo deben mantener el estado correcto

3. **Requisitos adicionales:**
   - Usar functional updates (`setCount(c => c + 1)`) para evitar race conditions
   - TypeScript: definir tipos para el state, action types y el estado del history
   - Usar `useCallback` para memoizar handlers si es necesario
   - Layout: limpio y organizado

## Entregables

- `src/components/StateMachine.jsx` / `.tsx` con la implementación
- Demo visual del semáforo funcionando
- Demo del contador con undo/redo

## Tests de verificación

- [ ] State machine transita entre estados correctamente
- [ ] Undo/Redo funciona con historial preservado
- [ ] Reset vuelve al estado inicial
- [ ] Functional updates funcionan al hacer clicks rápidos
- [ ] TypeScript: Sin errors de tipos, types definidos para estados y actions
- [ ] Accesibilidad: labels apropiados, contrast adecuado