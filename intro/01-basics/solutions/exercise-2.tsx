/**
 * Solución Exercise 2: Task List con Keys
 * TypeScript version
 */

import React from 'react';

// ============================================
// TIPOS
// ============================================

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

// ============================================
// COMPONENTE PRINCIPAL: TaskApp
// ============================================

function TaskApp() {
  const [tasks, setTasks] = React.useState<Task[]>([
    { id: 1, text: 'Aprender React', completed: true },
    { id: 2, text: 'Practicar TypeScript', completed: false },
    { id: 3, text: 'Construir un proyecto', completed: false }
  ]);
  
  const [filter, setFilter] = React.useState<FilterType>('all');
  const [newTaskText, setNewTaskText] = React.useState('');

  // ============================================
  // HANDLERS TIPADOS
  // ============================================

  const generateId = (): number => Date.now() + Math.random();

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = newTaskText.trim();
    if (!text) return;
    
    setTasks(prev => [
      { id: generateId(), text, completed: false },
      ...prev
    ]);
    setNewTaskText('');
  };

  const handleToggle = (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDelete = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleMoveUp = (id: number) => {
    setTasks(prev => {
      const index = prev.findIndex(t => t.id === id);
      if (index <= 0) return prev;
      
      const newTasks = [...prev];
      [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
      return newTasks;
    });
  };

  const handleMoveDown = (id: number) => {
    setTasks(prev => {
      const index = prev.findIndex(t => t.id === id);
      if (index === -1 || index === prev.length - 1) return prev;
      
      const newTasks = [...prev];
      [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
      return newTasks;
    });
  };

  // ============================================
  // ESTADOS DERIVADOS CON USE MEMO TIPADO
  // ============================================

  const filteredTasks = React.useMemo<Task[]>(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const activeCount = React.useMemo<number>(
    () => tasks.filter(t => !t.completed).length,
    [tasks]
  );

  const completedCount = React.useMemo<number>(
    () => tasks.filter(t => t.completed).length,
    [tasks]
  );

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="task-app">
      <h1>Mi Lista de Tareas</h1>
      
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

      <div className="task-filters">
        {(['all', 'active', 'completed'] as FilterType[]).map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'Todas' : f === 'active' ? 'Activas' : 'Completadas'}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
      />

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

interface TaskListProps {
  tasks: readonly Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onMoveUp: (id: number) => void;
  onMoveDown: (id: number) => void;
}

function TaskList({ tasks, onToggle, onDelete, onMoveUp, onMoveDown }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="task-empty">No hay tareas</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        // KEY: task.id (único y estable) - NUNCA index
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

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onMoveUp: (id: number) => void;
  onMoveDown: (id: number) => void;
}

function TaskItem({ task, onToggle, onDelete, onMoveUp, onMoveDown }: TaskItemProps) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label className="task-checkbox-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <span className="task-text">{task.text}</span>
      </label>

      <div className="task-actions">
        <button
          onClick={() => onMoveUp(task.id)}
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
export type { Task, FilterType, TaskListProps, TaskItemProps };