/**
 * 01-useState-basics.jsx - useState Fundamentos
 * 
 * useState es el hook principal para agregar estado local a componentes funcionales.
 */

import React from 'react';

// ============================================
// 1. USESTATE BÁSICO
// ============================================

function BasicCounter() {
  // Declarar state: [valorActual, funcionParaActualizar]
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={() => setCount(count - 1)}>Decrementar</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// ============================================
// 2. VALOR INICIAL - DIFERENTES TIPOS
// ============================================

function InitialValues() {
  // Primitivos
  const [name, setName] = React.useState('');           // string
  const [age, setAge] = React.useState(0);              // number
  const [isActive, setIsActive] = React.useState(false); // boolean
  
  // Objetos y arrays (¡cuidado con mutaciones!)
  const [user, setUser] = React.useState({ name: '', email: '' });
  const [items, setItems] = React.useState([]);
  
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
      <label>
        <input 
          type="checkbox" 
          checked={isActive} 
          onChange={e => setIsActive(e.target.checked)} 
        />
        Activo
      </label>
    </div>
  );
}

// ============================================
// 3. ACTUALIZACIÓN FUNCIONAL (CRÍTICO)
// ============================================

function FunctionalUpdates() {
  const [count, setCount] = React.useState(0);
  
  // ❌ PROBLEMA: Race condition en updates rápidos
  const handleIncrementBad = () => {
    setCount(count + 1);
    setCount(count + 1); // Ambas usan el MISMO count inicial
    // Resultado: solo incrementa 1, no 2
  };
  
  // ✅ SOLUCIÓN: Functional update
  const handleIncrementGood = () => {
    setCount(c => c + 1);
    setCount(c => c + 1); // Cada uno usa el valor ANTERIOR
    // Resultado: incrementa 2 correctamente
  };
  
  const handleIncrementBy = (amount) => {
    setCount(c => c + amount);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrementBad}>Incrementar x2 (MAL)</button>
      <button onClick={handleIncrementGood}>Incrementar x2 (BIEN)</button>
      <button onClick={() => handleIncrementBy(5)}>+5</button>
      <button onClick={() => handleIncrementBy(-3)}>-3</button>
    </div>
  );
}

// ============================================
// 4. LAZY INITIALIZATION (INICIALIZACIÓN PEREZOSA)
// ============================================

// Función costosa que solo debe ejecutarse UNA VEZ
function expensiveInitialComputation() {
  console.log('Computando valor inicial...');
  // Simular cálculo costoso
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += i;
  }
  return result % 100;
}

function LazyInit() {
  // ❌ MAL: Se ejecuta en CADA render
  // const [value, setValue] = React.useState(expensiveInitialComputation());
  
  // ✅ BIEN: Función como argumento - solo se ejecuta en mount
  const [value, setValue] = React.useState(() => expensiveInitialComputation());
  
  return (
    <div>
      <p>Valor inicial (solo calculado una vez): {value}</p>
      <button onClick={() => setValue(v => v + 1)}>Incrementar</button>
      <button onClick={() => setValue(() => expensiveInitialComputation())}>Recalcular</button>
    </div>
  );
}

// ============================================
// 5. ESTADO CON OBJETOS Y ARRAYS (INMUTABILIDAD)
// ============================================

function ObjectArrayState() {
  const [user, setUser] = React.useState({ name: '', email: '', age: 0 });
  const [tasks, setTasks] = React.useState([]);
  
  // ❌ MAL: Mutación directa
  // const handleNameChange = (e) => {
  //   user.name = e.target.value; // MUTA EL STATE DIRECTAMENTE!
  //   setUser(user); // No triggera re-render porque misma referencia
  // };
  
  // ✅ BIEN: Crear nuevo objeto
  const handleNameChange = (e) => {
    setUser(prev => ({ ...prev, name: e.target.value }));
  };
  
  const handleEmailChange = (e) => {
    setUser(prev => ({ ...prev, email: e.target.value }));
  };
  
  // Arrays: siempre crear nuevo array
  const addTask = (text) => {
    setTasks(prev => [...prev, { id: Date.now(), text, done: false }]);
  };
  
  const removeTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };
  
  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };
  
  return (
    <div>
      <input value={user.name} onChange={handleNameChange} placeholder="Nombre" />
      <input value={user.email} onChange={handleEmailChange} placeholder="Email" />
      
      <button onClick={() => addTask(`Tarea ${tasks.length + 1}`)}>Añadir tarea</button>
      
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <label>
              <input 
                type="checkbox" 
                checked={task.done} 
                onChange={() => toggleTask(task.id)} 
              />
              <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                {task.text}
              </span>
            </label>
            <button onClick={() => removeTask(task.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// 6. MÚLTIPLES USESTATE VS UNO SOLO
// ============================================

// Opción A: Múltiples useState (bueno para estado independiente)
function MultipleStates() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [age, setAge] = React.useState(0);
  // Fácil de leer, updates independientes
  return null;
}

// Opción B: Un solo useState con objeto (bueno para estado relacionado)
function SingleStateObject() {
  const [form, setForm] = React.useState({ name: '', email: '', age: 0 });
  
  // Requiere spread para actualizar un campo
  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
  
  return null;
}

// ============================================
// 7. ESTADO DERIVADO (NO USAR STATE)
// ============================================

function DerivedState() {
  const [price, setPrice] = React.useState(100);
  const [quantity, setQuantity] = React.useState(1);
  const [discount, setDiscount] = React.useState(0);
  
  // ❌ NO necesitas useState para esto:
  // const [total, setTotal] = useState(0);
  // useEffect(() => { setTotal(price * quantity * (1 - discount)) }, [price, quantity, discount]);
  
  // ✅ Calcula durante render (derived state)
  const subtotal = price * quantity;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;
  
  return (
    <div>
      <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
      <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
      <input type="range" min={0} max={0.5} step={0.01} value={discount} onChange={e => setDiscount(Number(e.target.value))} />
      
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Descuento: ${discountAmount.toFixed(2)}</p>
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
    </div>
  );
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function UseStateBasicsDemo() {
  return (
    <section>
      <h1>useState Basics</h1>
      
      <BasicCounter />
      <hr />
      <InitialValues />
      <hr />
      <FunctionalUpdates />
      <hr />
      <LazyInit />
      <hr />
      <ObjectArrayState />
      <hr />
      <DerivedState />
    </section>
  );
}