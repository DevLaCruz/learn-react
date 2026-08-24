/**
 * 02-useState-advanced.tsx - useState Patrones Avanzados con TypeScript
 */

import React from 'react';

// ============================================
// 1. STATE MACHINE TIPADA
// ============================================

type TrafficLightState = 'red' | 'yellow' | 'green';

function TrafficLightTyped() {
  const [state, setState] = React.useState<TrafficLightState>('red');
  
  const next = React.useCallback(() => {
    setState(current => {
      if (current === 'red') return 'green';
      if (current === 'green') return 'yellow';
      return 'red';
    });
  }, []);
  
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
// 2. USE TOGGLE TIPADO
// ============================================

function useToggle(initial = false): [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>] {
  const [value, setValue] = React.useState<boolean>(initial);
  const toggle = React.useCallback(() => setValue(v => !v), []);
  return [value, toggle, setValue];
}

function ToggleDemoTyped() {
  const [isOn, toggle, setIsOn] = useToggle(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  
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
// 3. CONTADOR CON HISTORIAL TIPADO
// ============================================

interface CounterHistory {
  value: number;
  setValue: (value: number | ((prev: number) => number)) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

function useCounterWithHistory(initial = 0): CounterHistory {
  const [past, setPast] = React.useState<number[]>([]);
  const [present, setPresent] = React.useState<number>(initial);
  const [future, setFuture] = React.useState<number[]>([]);
  
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;
  
  const setValue = React.useCallback((newValue: number | ((prev: number) => number)) => {
    const value = typeof newValue === 'function' ? newValue(present) : newValue;
    if (value === present) return;
    
    setPast(p => [...p, present]);
    setPresent(value);
    setFuture([]);
  }, [present]);
  
  const undo = React.useCallback(() => {
    if (!canUndo) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, -1);
    setPast(newPast);
    setFuture(f => [present, ...f]);
    setPresent(previous);
  }, [canUndo, past, present]);
  
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
    canRedo
  };
}

function CounterWithHistoryTyped() {
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
// 4. FORM STATE TIPADO
// ============================================

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setFieldTouched: <K extends keyof T>(field: K) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => (e: React.FormEvent) => Promise<void>;
  reset: () => void;
  getFieldProps: <K extends keyof T>(field: K) => {
    value: T[K];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    error: string | undefined;
  };
}

function useFormState<T extends Record<string, any>>(
  initialValues: T,
  validate?: (values: T) => Partial<Record<keyof T, string>>
): FormState<T> {
  const [values, setValues] = React.useState<T>(initialValues);
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const setValue = React.useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);
  
  const setFieldTouched = React.useCallback(<K extends keyof T>(field: K) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (validate) {
      const fieldErrors = validate({ ...values, [field]: values[field] });
      setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
    }
  }, [values, validate]);
  
  const handleSubmit = React.useCallback(async (onSubmit: (values: T) => Promise<void>) => {
    return async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      const allTouched = Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {}) as Record<keyof T, boolean>;
      setTouched(allTouched);
      
      const allErrors = validate ? validate(values) : {};
      setErrors(allErrors);
      
      if (Object.keys(allErrors).length === 0) {
        await onSubmit(values);
      }
      setIsSubmitting(false);
    };
  }, [values, validate]);
  
  const reset = React.useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);
  
  const getFieldProps = React.useCallback(<K extends keyof T>(field: K) => ({
    value: values[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(field, e.target.value as T[K]),
    onBlur: () => setFieldTouched(field),
    error: touched[field] ? errors[field] : undefined
  }), [values, errors, touched, setValue, setFieldTouched]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    handleSubmit,
    reset,
    getFieldProps
  };
}

// Validator tipado
interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

function validateRegister(values: RegisterForm): Partial<Record<keyof RegisterForm, string>> {
  const errors: Partial<Record<keyof RegisterForm, string>> = {};
  if (!values.email) errors.email = 'Email requerido';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Email inválido';
  if (!values.password) errors.password = 'Password requerido';
  else if (values.password.length < 8) errors.password = 'Mínimo 8 caracteres';
  if (values.password !== values.confirmPassword) errors.confirmPassword = 'No coinciden';
  return errors;
}

function ComplexFormTyped() {
  const form = useFormState<RegisterForm>(
    { email: '', password: '', confirmPassword: '' },
    validateRegister
  );
  
  const onSubmit = async (data: RegisterForm) => {
    console.log('Submit:', data);
    alert('Formulario válido!');
  };
  
  return (
    <form onSubmit={e => { e.preventDefault(); form.handleSubmit(onSubmit)(e); }}>
      <div>
        <label>Email</label>
        <input {...form.getFieldProps('email')} type="email" />
        {form.errors.email && <span style={{ color: 'red' }}>{form.errors.email}</span>}
      </div>
      <div>
        <label>Password</label>
        <input {...form.getFieldProps('password')} type="password" />
        {form.errors.password && <span style={{ color: 'red' }}>{form.errors.password}</span>}
      </div>
      <div>
        <label>Confirm Password</label>
        <input {...form.getFieldProps('confirmPassword')} type="password" />
        {form.errors.confirmPassword && <span style={{ color: 'red' }}>{form.errors.confirmPassword}</span>}
      </div>
      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Enviando...' : 'Registrar'}
      </button>
      <button type="button" onClick={form.reset}>Reset</button>
    </form>
  );
}

// ============================================
// 5. USESTATE ASÍNCRONO TIPADO
// ============================================

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useAsyncState<T>(
  asyncFn: (signal: AbortSignal) => Promise<T>,
  deps: React.DependencyList = []
): AsyncState<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  
  const controllerRef = React.useRef<AbortController | null>(null);
  
  const execute = React.useCallback(async () => {
    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFn(controllerRef.current.signal);
      setData(result);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [asyncFn]);
  
  React.useEffect(() => {
    execute();
    return () => controllerRef.current?.abort();
  }, [execute, ...deps]);
  
  return { data, loading, error, refetch: execute };
}

function UserListTyped() {
  interface User {
    id: number;
    name: string;
    email: string;
  }
  
  const { data: users, loading, error, refetch } = useAsyncState<User[]>(
    async (signal) => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', { signal });
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    []
  );
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message} <button onClick={refetch}>Retry</button></div>;
  
  return (
    <ul>
      {users?.map(user => <li key={user.id}>{user.name} - {user.email}</li>)}
    </ul>
  );
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function UseStateAdvancedDemo() {
  return (
    <section>
      <h1>useState Advanced TypeScript</h1>
      
      <TrafficLightTyped />
      <hr />
      <ToggleDemoTyped />
      <hr />
      <CounterWithHistoryTyped />
      <hr />
      <ComplexFormTyped />
      <hr />
      <UserListTyped />
    </section>
  );
}