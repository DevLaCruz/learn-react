/**
 * 04-useEffect-advanced.jsx - useEffect Patrones Avanzados
 */

import React from 'react';

// ============================================
// 1. CUSTOM HOOK: USEFETCH
// ============================================

function useFetch(url, options = {}) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  const controllerRef = React.useRef(null);
  
  const execute = React.useCallback(async () => {
    // Cancelar request anterior
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    
    controllerRef.current = new AbortController();
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controllerRef.current.signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url, options]);
  
  React.useEffect(() => {
    execute();
    
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [execute]);
  
  return { data, loading, error, refetch: execute };
}

// Uso del hook
function UserProfile({ userId }) {
  const { data: user, loading, error, refetch } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error} <button onClick={refetch}>Reintentar</button></div>;
  if (!user) return <div>No encontrado</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </div>
  );
}

// ============================================
// 2. CUSTOM HOOK: USETIMER
// ============================================

function useTimer(callback, delay, deps = []) {
  const savedCallback = React.useRef(callback);
  
  // Actualizar ref cuando callback cambia
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  React.useEffect(() => {
    if (delay === null) return;
    
    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);
    
    return () => clearInterval(id);
  }, [delay, ...deps]);
}

// Uso
function TimerDemo() {
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  
  useTimer(() => setSeconds(s => s + 1), isActive ? 1000 : null);
  
  return (
    <div>
      <h2>{seconds}s</h2>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Pausar' : 'Iniciar'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}

// ============================================
// 3. CUSTOM HOOK: USELOCALSTORAGE
// ============================================

function useLocalStorage(key, initialValue) {
  // Leer de localStorage solo una vez (lazy init)
  const [storedValue, setStoredValue] = React.useState(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Actualizar localStorage cuando state cambia
  const setValue = React.useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setValue];
}

// Uso
function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('userName', '');
  const [prefs, setPrefs] = useLocalStorage('preferences', { theme: 'light', lang: 'es' });
  
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" />
      <p>Guardado: {name}</p>
      
      <select value={prefs.theme} onChange={e => setPrefs(p => ({ ...p, theme: e.target.value }))}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <select value={prefs.lang} onChange={e => setPrefs(p => ({ ...p, lang: e.target.value }))}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}

// ============================================
// 4. CUSTOM HOOK: USEMEDIAQUERY
// ============================================

function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);
    
    // setMatches inicial por si cambió entre render y effect
    setMatches(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);
  
  return matches;
}

// Uso
function ResponsiveDemo() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  return (
    <div>
      <p>Mobile: {isMobile ? 'Sí' : 'No'}</p>
      <p>Dark mode: {isDark ? 'Sí' : 'No'}</p>
      <p>Reduced motion: {reducedMotion ? 'Sí' : 'No'}</p>
      {isMobile && <p style={{ color: 'red' }}>Vista móvil activa</p>}
    </div>
  );
}

// ============================================
// 5. CUSTOM HOOK: USEDEBOUNCE
// ============================================

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Uso: Search con debounce
function SearchDemo() {
  const [query, setQuery] = React.useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = React.useState([]);
  
  // Effect que busca cuando debouncedQuery cambia
  React.useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }
    
    // Simular búsqueda
    const timer = setTimeout(() => {
      setResults([
        `Resultado 1 para "${debouncedQuery}"`,
        `Resultado 2 para "${debouncedQuery}"`,
        `Resultado 3 para "${debouncedQuery}"`,
      ]);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [debouncedQuery]);
  
  return (
    <div>
      <input 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
        placeholder="Buscar..."
      />
      <p>Query actual: {query}</p>
      <p>Query debounced: {debouncedQuery}</p>
      <ul>
        {results.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
    </div>
  );
}

// ============================================
// 6. CUSTOM HOOK: USEINTERSECTIONOBSERVER
// ============================================

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const elementRef = React.useRef(null);
  
  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);
  
  return [elementRef, isIntersecting];
}

// Uso: Lazy loading / Infinite scroll
function InfiniteScrollDemo() {
  const [items, setItems] = React.useState(Array.from({ length: 10 }, (_, i) => i + 1));
  const [loadRef, isVisible] = useIntersectionObserver({ rootMargin: '100px' });
  
  React.useEffect(() => {
    if (isVisible && items.length < 50) {
      const next = items.length + 1;
      setItems(prev => [...prev, ...Array.from({ length: 10 }, (_, i) => next + i)]);
    }
  }, [isVisible, items.length]);
  
  return (
    <div>
      {items.map(item => (
        <div key={item} style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
          Item {item}
        </div>
      ))}
      <div ref={loadRef}>
        {isVisible ? 'Cargando más...' : 'Scroll para cargar'}
      </div>
    </div>
  );
}

// ============================================
// 7. EVITAR EFECTOS INNECESARIOS
// ============================================

// ❌ MAL: Effect que solo setea state basado en props
function BadDerivedState({ multiplier }) {
  const [value, setValue] = React.useState(0);
  
  React.useEffect(() => {
    setValue(multiplier * 10);
  }, [multiplier]); // Innecesario!
  
  return <div>{value}</div>;
}

// ✅ BIEN: Derived state durante render
function GoodDerivedState({ multiplier }) {
  const value = multiplier * 10; // Calculado en render
  return <div>{value}</div>;
}

// ❌ MAL: Effect para sincronizar dos states
function BadSyncStates() {
  const [first, setFirst] = React.useState('');
  const [second, setSecond] = React.useState('');
  
  React.useEffect(() => {
    setSecond(first.toUpperCase());
  }, [first]); // Innecesario!
  
  return (
    <div>
      <input value={first} onChange={e => setFirst(e.target.value)} />
      <input value={second} readOnly />
    </div>
  );
}

// ✅ BIEN: Derived state
function GoodSyncStates() {
  const [first, setFirst] = React.useState('');
  const second = first.toUpperCase(); // Derivado
  
  return (
    <div>
      <input value={first} onChange={e => setFirst(e.target.value)} />
      <input value={second} readOnly />
    </div>
  );
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function UseEffectAdvancedDemo() {
  return (
    <section>
      <h1>useEffect Advanced</h1>
      
      <UserProfile userId={1} />
      <hr />
      <TimerDemo />
      <hr />
      <LocalStorageDemo />
      <hr />
      <ResponsiveDemo />
      <hr />
      <SearchDemo />
      <hr />
      <InfiniteScrollDemo />
      <hr />
      <h3>Anti-patterns:</h3>
      <BadDerivedState multiplier={5} />
      <GoodDerivedState multiplier={5} />
      <BadSyncStates />
      <GoodSyncStates />
    </section>
  );
}