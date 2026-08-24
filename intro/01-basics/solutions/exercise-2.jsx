/**
 * Solución Exercise 2: Task List con Keys
 * JavaScript version
 */

import React from 'react';

// ============================================
// TIPOS DE DATOS
// ============================================

/**
 * @typedef {Object} Task
 * @property {number} id - ID único
 * @property {string} text - Texto de la tarea
 * @property {boolean} completed - Estado completado
 */

// ============================================
// COMPONENTE PRINCIPAL: TaskApp
// ============================================

function TaskApp() {
  // Estado inicial con IDs únicos
  const [tasks, setTasks] = React.useState([
    { id: 1, text: 'Aprender React', completed: true },
    { id: 2, text: 'Practicar TypeScript', completed: false },
    { id: 3, text: 'Construir un proyecto', completed: false }
  ]);
  
  const [filter, setFilter] = React.useState('all'); // 'all' | 'active' | 'completed'
  const [newTaskText, setNewTaskText] = React.useState('');

  // ============================================
  // HANDLERS
  // ============================================

  // Generar ID único
  const generateId = () => Date.now() + Math.random();

  // Añadir tarea
  const handleAdd = (e) => {
    e.preventDefault();
    const text = newTaskText.trim();
    if (!text) return;
    
    setTasks(prev => [
      { id: generateId(), text, completed: false },
      ...prev
    ]);
    setNewTaskText('');
  };

  // Toggle completado
  const handleToggle = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Eliminar tarea
  const handleDelete = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Mover arriba
  const handleMoveUp = (id) => {
    setTasks(prev => {
      const index = prev.findIndex(t => t.id === id);
      if (index <= 0) return prev;
      
      const newTasks = [...prev];
      [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
      return newTasks;
    });
  };

  // Mover abajo
  const handleMoveDown = (id) => {
    setTasks(prev => {
      const index = prev.findIndex(t => t.id === id);
      if (index === -1 || index === prev.length - 1) return prev;
      
      const newTasks = [...prev];
      [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
      return newTasks;
    });
  };

  // ============================================
  // ESTADOS DERIVADOS (useMemo)
  // ============================================

  const filteredTasks = React.useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const activeCount = React.useMemo(
    () => tasks.filter(t => !t.completed).length,
    [tasks]
  );

  const completedCount = React.useMemo(
    () => tasks.filter(t => t.completed).length,
    [tasks]
  );

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="task-app">
      <h1>Mi Lista de Tareas</h1>
      
      {/* Formulario */}
      <form onSubmit={handleAdd} className="task-form">
        <input
          type="text"
          value={newTaskText}
          onChange={e => setNewTaskText(e.target.value)}
          placeholder="Nueva tarea..."
          className="task-input"
        />
        <button type="submit" className="task-add-btn">Añadir</button>
      </form>

      {/* Filtros */}
      <div className="task-filters">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'Todas' : f === 'active' ? 'Activas' : 'Completadas'}
          </button>
        ))}
      </div>

      {/* Lista */}
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
      />

      {/* Stats */}
      <div className="task-stats">
        <span>Activas: {activeCount}</span>
        <span>Completadas: {completedCount}</span>
        <span>Total: {tasks.length}</span>
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE: TaskList
// ============================================

function TaskList({ tasks, onToggle, onDelete, onMoveUp, onMoveDown }) {
  if (tasks.length === 0) {
    return <p className="task-empty">No hay tareas</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        // KEY IMPORTANTE: usar task.id (único y estable)
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
        />
      ))}
    </ul>
  );
}

// ============================================
// COMPONENTE: TaskItem
// ============================================

function TaskItem({ task, onToggle, onDelete, onMoveUp, onMoveDown }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {/* Checkbox - mantiene estado al reordenar gracias a key estable */}
      <label className="task-checkbox-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <span className="task-text">{task.text}</span>
      </label>

      {/* Acciones */}
      <div className="task-actions">
        <button
          onClick={() => onMoveUp(task.id)}
          disabled={false} // Se podría deshabilitar si es el primero
          className="task-move-btn"
          aria-label="Mover arriba"
        >
          ▲
        </button>
        <button
          onClick={() => onMoveDown(task.id)}
          className="task-move-btn"
          aria-label="Mover abajo"
        >
          ▼
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="task-delete-btn"
          aria-label="Eliminar"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

// ============================================
// EXPORT
// ============================================

export default TaskApp;

/*
// CSS sugerido:
.task-app { max-width: 500px; margin: 0 auto; padding: 20px; font-family: system-ui; }
.task-form { display: flex; gap: 8px; margin-bottom: 16px; }
.task-input { flex: 1; padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; }
.task-add-btn { padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; }
.task-filters { display: flex; gap: 8px; margin-bottom: 16px; }
.filter-btn { padding: 6px 12px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer; }
.filter-btn.active { background: #3b82f6; color: white; border-color: #3b82f6; }
.task-list { list-style: none; padding: 0; margin: 0; }
.task-item { display: flex; align-items: center; justify-content: space-between; padding: 12px; border-bottom: 1px solid #eee; gap: 12px; }
.task-item.completed .task-text { text-decoration: line-through; color: #999; }
.task-checkbox-label { display: flex; align-items: center; gap: 8px; flex: 1; cursor: pointer; }
.task-checkbox { width: 18px; height: 18px; cursor: pointer; }
.task-actions { display: flex; gap: 4px; }
.task-move-btn, .task-delete-btn { padding: 4px 8px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer; font-size: 12px; }
.task-move-btn:hover, .task-delete-btn:hover { background: #f3f4f6; }
.task-stats { display: flex; gap: 16px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #eee; color: #666; font-size: 14px; }
.task-empty { text-align: center; color: #999; padding: 40px; }
*/