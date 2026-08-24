/**
 * 01-useState-basics.tsx - useState Fundamentos con TypeScript
 */

import React from 'react';

// ============================================
// 1. TIPADO BÁSICO DE USESTATE
// ============================================

function BasicCounter() {
  // TypeScript infiere number desde el valor inicial
  const [count, setCount] = React.useState(0);
  
  // Tipado explícito (opcional, útil para union types)
  const [countExplicit, setCountExplicit] = React.useState<number>(0);
  
  // Union type para estado que puede ser null
  const [nullableCount, setNullableCount] = React.useState<number | null>(null);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={() => setCount(c => c - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// ============================================
// 2. TIPOS COMPLEJOS
// ============================================

interface User {
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function ComplexTypes() {
  // Objeto
  const [user, setUser] = React.useState<User>({
    name: '',
    email: '',
    age: 0,
    isActive: false
  });
  
  // Array
  const [tasks, setTasks] = React.useState<Task[]>([]);
  
  // Partial para formularios
  const [formData, setFormData] = React.useState<Partial<User>>({});
  
  // Actualización inmutable tipada
  const updateUser = <K extends keyof User>(field: K, value: User[K]) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };
  
  const addTask = (text: string) => {
    setTasks(prev => [...prev, { id: Date.now(), text, completed: false }]);
  };
  
  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };
  
  return (
    <div>
      <input value={user.name} onChange={e => updateUser('name', e.target.value)} placeholder="Name" />
      <input value={user.email} onChange={e => updateUser('email', e.target.value)} placeholder="Email" />
      <input type="number" value={user.age} onChange={e => updateUser('age', Number(e.target.value))} />
      <label>
        <input type="checkbox" checked={user.isActive} onChange={e => updateUser('isActive', e.target.checked)} />
        Active
      </label>
      
      <button onClick={() => addTask('New task')}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <label>
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
              {task.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// 3. LAZY INITIALIZATION TIPADA
// ============================================

function expensiveComputation(): number {
  console.log('Computing...');
  let result = 0;
  for (let i = 0; i < 1000000; i++) result += i;
  return result % 100;
}

function LazyInitTyped() {
  // Función como argumento para lazy init
  const [value, setValue] = React.useState<number>(() => expensiveComputation());
  
  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => setValue(v => v + 1)}>Increment</button>
      <button onClick={() => setValue(() => expensiveComputation())}>Recompute</button>
    </div>
  );
}

// ============================================
// 4. FUNCTIONAL UPDATES TIPADOS
// ============================================

function FunctionalUpdatesTyped() {
  const [count, setCount] = React.useState(0);
  
  // TypeScript infiere el tipo del parámetro
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const incrementBy = (amount: number) => setCount(prev => prev + amount);
  
  // Con tipos complejos
  const [user, setUser] = React.useState<User>({ name: '', email: '', age: 0, isActive: false });
  
  const updateName = (name: string) => setUser(prev => ({ ...prev, name }));
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={() => incrementBy(5)}>+5</button>
    </div>
  );
}

// ============================================
// 5. ESTADO DERIVADO (NO USAR STATE)
// ============================================

function DerivedStateTyped() {
  const [price, setPrice] = React.useState<number>(100);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [discount, setDiscount] = React.useState<number>(0);
  
  // Derivado durante render - no useState
  const subtotal: number = price * quantity;
  const discountAmount: number = subtotal * discount;
  const total: number = subtotal - discountAmount;
  
  return (
    <div>
      <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
      <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
      <input type="range" min={0} max={0.5} step={0.01} value={discount} onChange={e => setDiscount(Number(e.target.value))} />
      
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Discount: ${discountAmount.toFixed(2)}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}

// ============================================
// 6. USESTATE CON GENERICS PERSONALIZADOS
// ============================================

// Hook personalizado tipado
function useStateWithValidation<T>(
  initialValue: T,
  validator: (value: T) => string | null
) {
  const [value, setValue] = React.useState<T>(initialValue);
  const [error, setError] = React.useState<string | null>(null);
  
  const setValidatedValue = React.useCallback((newValue: T | ((prev: T) => T)) => {
    const resolvedValue = newValue instanceof Function ? newValue(value) : newValue;
    const validationError = validator(resolvedValue);
    setError(validationError);
    setValue(resolvedValue);
  }, [value, validator]);
  
  return [value, setValidatedValue, error] as const;
}

// Uso
function ValidatedStateDemo() {
  const [email, setEmail, emailError] = useStateWithValidation('', (v) => 
    v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Email inválido' : null
  );
  
  const [age, setAge, ageError] = useStateWithValidation(0, (v) => 
    v < 18 ? 'Debe ser mayor de 18' : null
  );
  
  return (
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
      
      <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
      {ageError && <span style={{ color: 'red' }}>{ageError}</span>}
    </div>
  );
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function UseStateBasicsDemo() {
  return (
    <section>
      <h1>useState Basics TypeScript</h1>
      
      <BasicCounter />
      <hr />
      <ComplexTypes />
      <hr />
      <LazyInitTyped />
      <hr />
      <FunctionalUpdatesTyped />
      <hr />
      <DerivedStateTyped />
      <hr />
      <ValidatedStateDemo />
    </section>
  );
}