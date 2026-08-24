/**
 * 02-useState-advanced.jsx - useState Patrones Avanzados
 */

import React from 'react';

// ============================================
// 1. STATE MACHINE CON USESTATE
// ============================================

function TrafficLight() {
  const [state, setState] = React.useState('red'); // 'red' | 'yellow' | 'green'
  
  const next = () => {
    setState(current => {
      if (current === 'red') return 'green';
      if (current === 'green') return 'yellow';
      return 'red';
    });
  };
  
  return (
    <div className="traffic-light">
      <div className={`light red ${state === 'red' ? 'on' : ''}`} />
      <div className={`light yellow ${state === 'yellow' ? 'on' : ''}`} />
      <div className={`light green ${state === 'green' ? 'on' : ''}`} />
      <button onClick={next}>Siguiente</button>
      <p>Estado: {state}</p>
    </div>
  );
}

// ============================================
// 2. TOGGLE BOOLEANO - HOOK PERSONALIZADO
// ============================================

function useToggle(initial = false) {
  const [value, setValue] = React.useState(initial);
  const toggle = React.useCallback(() => setValue(v => !v), []);
  return [value, toggle, setValue];
}

function ToggleDemo() {
  const [isOn, toggle, setIsOn] = useToggle(false);
  const [isLoading, setLoading] = React.useState(false);
  
  const handleAsyncToggle = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    toggle();
    setLoading(false);
  };
  
  return (
    <div>
      <label>
        <input 
          type="checkbox" 
          checked={isOn} 
          onChange={toggle}
          disabled={isLoading}
        />
        {isOn ? 'ON' : 'OFF'}
      </label>
      <button onClick={handleAsyncToggle} disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Toggle Async'}
      </button>
    </div>
  );
}

// ============================================
// 3. CONTADOR CON HISTORIAL (UNDO/REDO)
// ============================================

function useCounterWithHistory(initial = 0) {
  const [past, setPast] = React.useState([]);
  const [present, setPresent] = React.useState(initial);
  const [future, setFuture] = React.useState([]);
  
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;
  
  const setValue = React.useCallback((newValue) => {
    const value = typeof newValue === 'function' ? newValue(present) : newValue;
    if (value === present) return;
    
    setPast(p => [...p, present]);
    setPresent(value);
    setFuture([]); // Limpiar future al hacer nuevo cambio
  }, [present]);
  
  const undo = React.useCallback(() => {
    if (!canUndo) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, -1);
    setPast(newPast);
    setFuture(f => [present, ...f]);
    setPresent(previous);
  }, [canUndo, past, present, future]);
  
  const redo = React.useCallback(() => {
    if (!canRedo) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setFuture(newFuture);
    setPast(p => [...p, present]);
    setPresent(next);
  }, [canRedo, future, present]);
  
  const reset = React.useCallback(() => {
    setPast([]);
    setPresent(initial);
    setFuture([]);
  }, [initial]);
  
  return {
    value: present,
    setValue,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
    pastCount: past.length,
    futureCount: future.length
  };
}

function CounterWithHistory() {
  const { value, setValue, undo, redo, reset, canUndo, canRedo } = useCounterWithHistory(0);
  
  return (
    <div>
      <h2>Contador: {value}</h2>
      <div>
        <button onClick={() => setValue(v => v + 1)}>+1</button>
        <button onClick={() => setValue(v => v - 1)}>-1</button>
        <button onClick={() => setValue(v => v + 10)}>+10</button>
      </div>
      <div>
        <button onClick={undo} disabled={!canUndo}>↶ Undo</button>
        <button onClick={redo} disabled={!canRedo}>↷ Redo</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

// ============================================
// 4. ESTADO PARA FORMULARIOS COMPLEJOS
// ============================================

function useFormState(initialValues, validate) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const setValue = React.useCallback((field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
    // Limpiar error al escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);
  
  const setFieldTouched = React.useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    // Validar al blur
    if (validate) {
      const fieldErrors = validate({ ...values, [field]: values[field] });
      setErrors(prev => ({ ...prev, [field]: fieldErrors[field] || '' }));
    }
  }, [values, validate]);
  
  const handleSubmit = React.useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    // Marcar todos como touched
    const allTouched = Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    
    // Validar todo
    const allErrors = validate ? validate(values) : {};
    setErrors(allErrors);
    
    if (Object.keys(allErrors).length === 0) {
      await onSubmit(values);
    }
    setIsSubmitting(false);
  }, [values, validate]);
  
  const reset = React.useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleSubmit,
    reset,
    getFieldProps: (field) => ({
      value: values[field],
      onChange: e => setValue(field, e.target.value),
      onBlur: () => setFieldTouched(field),
      error: touched[field] ? errors[field] : undefined
    })
  };
}

// Validator function
function validateForm(values) {
  const errors = {};
  if (!values.email) errors.email = 'Email requerido';
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Email inválido';
  if (!values.password) errors.password = 'Password requerido';
  else if (values.password.length < 8) errors.password = 'Mínimo 8 caracteres';
  if (values.password !== values.confirmPassword) errors.confirmPassword = 'No coinciden';
  return errors;
}

function ComplexForm() {
  const form = useFormState(
    { email: '', password: '', confirmPassword: '' },
    validateForm
  );
  
  const onSubmit = async (data) => {
    console.log('Submit:', data);
    alert('Formulario válido!');
  };
  
  return (
    <form onSubmit={e => { e.preventDefault(); form.handleSubmit(onSubmit); }}>
      <div>
        <label>Email</label>
        <input {...form.getFieldProps('email')} type="email" />
        {form.errors.email && <span className="error">{form.errors.email}</span>}
      </div>
      <div>
        <label>Password</label>
        <input {...form.getFieldProps('password')} type="password" />
        {form.errors.password && <span className="error">{form.errors.password}</span>}
      </div>
      <div>
        <label>Confirm Password</label>
        <input {...form.getFieldProps('confirmPassword')} type="password" />
        {form.errors.confirmPassword && <span className="error">{form.errors.confirmPassword}</span>}
      </div>
      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Enviando...' : 'Registrar'}
      </button>
      <button type="button" onClick={form.reset}>Reset</button>
    </form>
  );
}

// ============================================
// 5. ESTADO ASÍNCRONO CON ABORT
// ============================================

function useAsyncState(asyncFn, deps = []) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    
    const execute = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await asyncFn(controller.signal);
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    
    execute();
    
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, deps);
  
  return { data, loading, error, refetch: () => setData(null) };
}

// Demo: Fetch usuarios
function UserList() {
  const { data: users, loading, error, refetch } = useAsyncState(
    async (signal) => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', { signal });
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    []
  );
  
  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error.message} <button onClick={refetch}>Reintentar</button></div>;
  
  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  );
}

// ============================================
// 6. BATCHING AUTOMÁTICO (REACT 18+)
// ============================================

function BatchingDemo() {
  const [count, setCount] = React.useState(0);
  const [flag, setFlag] = React.useState(false);
  
  // React 18: ambos updates se agrupan en UN solo re-render
  const handleClick = () => {
    setCount(c => c + 1);
    setFlag(f => !f);
    // Solo 1 render, no 2
    console.log('Click handler finished');
  };
  
  // En callbacks asíncronos (promises, timeouts) TAMBIÉN se batch (React 18+)
  const handleAsyncClick = async () => {
    setCount(c => c + 1);
    setFlag(f => !f);
    await Promise.resolve(); // Await no rompe batching en React 18+
    setCount(c => c + 1); // Este SÍ causa otro render (después del await)
  };
  
  return (
    <div>
      <p>Count: {count}, Flag: {String(flag)}</p>
      <button onClick={handleClick}>Batched Sync</button>
      <button onClick={handleAsyncClick}>Batched Async</button>
    </div>
  );
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function UseStateAdvancedDemo() {
  return (
    <section>
      <h1>useState Advanced</h1>
      
      <TrafficLight />
      <hr />
      <ToggleDemo />
      <hr />
      <CounterWithHistory />
      <hr />
      <ComplexForm />
      <hr />
      <UserList />
      <hr />
      <BatchingDemo />
    </section>
  );
}