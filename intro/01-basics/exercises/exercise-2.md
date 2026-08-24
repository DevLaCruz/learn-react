# Ejercicio 2: Lista de Tareas con Keys

## Objetivo
Crear una lista de tareas interactiva que demuestre el uso correcto de `keys` y manejo de estado.

## Requisitos

1. **Estado inicial:**
   ```js
   const initialTasks = [
     { id: 1, text: 'Aprender React', completed: true },
     { id: 2, text: 'Practicar TypeScript', completed: false },
     { id: 3, text: 'Construir un proyecto', completed: false }
   ];
   ```

2. **Funcionalidades:**
   - ✅ Marcar/desmarcar tarea (toggle completed)
   - ➕ Añadir nueva tarea (input + botón)
   - 🗑️ Eliminar tarea (botón por tarea)
   - 🔄 Reordenar: mover arriba/abajo (botones por tarea)
   - 🔍 Filtrar: Todas / Activas / Completadas

3. **Keys correctas:**
   - Usar `id` único y estable como key
   - NO usar index
   - Demostrar que el estado de inputs se mantiene al reordenar

4. **Componentes:**
   - `TaskList` - Contenedor principal
   - `TaskItem` - Cada tarea individual
   - `TaskForm` - Formulario para añadir
   - `FilterButtons` - Botones de filtro

5. **Estados derivados:**
   - `activeCount`: tareas no completadas
   - `completedCount`: tareas completadas

## Estructura esperada

```jsx
function TaskApp() {
  return (
    <div className="task-app">
      <h1>Mi Lista de Tareas</h1>
      <TaskForm onAdd={handleAdd} />
      <FilterButtons filter={filter} onChange={setFilter} />
      <TaskList 
        tasks={filteredTasks} 
        onToggle={handleToggle}
        onDelete={handleDelete}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
      />
      <div className="stats">
        <span>Activas: {activeCount}</span>
        <span>Completadas: {completedCount}</span>
      </div>
    </div>
  );
}
```

## Tests de verificación

- [ ] Keys usan `id` único (no index)
- [ ] Toggle funciona correctamente
- [ ] Añadir tarea genera ID único (Date.now() o uuid)
- [ ] Eliminar funciona
- [ ] Reordenar mantiene estado de inputs/checkboxes
- [ ] Filtros funcionan
- [ ] Contadores correctos
- [ ] TypeScript: Tipos correctos en todos los componentes

## Puntos extra

- Persistir en localStorage
- Animaciones al añadir/eliminar
- Drag & drop para reordenar (librería @dnd-kit)
- Editar texto de tarea inline