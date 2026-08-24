/**
 * 04-useEffect-advanced.tsx - useEffect Patrones Avanzados con TypeScript
 */

import React from 'react';

// ============================================
// 1. CUSTOM HOOK: USEFETCH TIPADO
// ============================================

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useFetch<T>(url: string, options: RequestInit = {}): UseFetchResult<T> {
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
      const response = await fetch(url, { ...options, signal: controllerRef.current.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [url, options]);
  
  React.useEffect(() => {
    execute();
    return () => controllerRef.current?.abort();
  }, [execute]);
  
  return { data, loading, error, refetch: execute };
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

function UserProfileTyped({ userId }: { userId: number }) {
  const { data: user, loading, error, refetch } = useFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message} <button onClick={refetch}>Reintentar</button></div>;
  
  return user ? (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </div>
  ) : (
    <div>No encontrado</div>
  );
}

// ============================================
// 2. CUSTOM HOOK: USETIMER TIPADO
// ============================================

function useTimer(callback: () => void, delay: number | null, deps: React.DependencyList = []) {
  const savedCallback = React.useRef(callback);
  
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  React.useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay, ...deps]);
}

function TimerDemoTyped() {
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  
  useTimer(() => setSeconds(s => s + 1), isActive ? 1000 : null);
  
  return (
    <div>
      <h2>{seconds}s</h2>
      <button onClick={() => setIsActive(!isActive)}>{isActive ? 'Pausar' : 'Iniciar'}</button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}

// ============================================
// 3. CUSTOM HOOK: USELOCALSTORAGE TIPADO
// ============================================

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  
  const setValue: React.Dispatch<React.SetStateAction<T>> = React.useCallback((value) => {
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

interface Preferences {
  theme: 'light' | 'dark';
  lang: 'es' | 'en';
}

function LocalStorageDemoTyped() {
  const [name, setName] = useLocalStorage<string>('userName', '');
  const [prefs, setPrefs] = useLocalStorage<Preferences>('preferences', { theme: 'light', lang: 'es' });
  
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" />
      <p>Guardado: {name}</p>
      
      <select value={prefs.theme} onChange={e => setPrefs(p => ({ ...p, theme: e.target.value as 'light' | 'dark' }))}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <select value={prefs.lang} onChange={e => setPrefs(p => ({ ...p, lang: e.target.value as 'es' | 'en' }))}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}

// ============================================
// 4. CUSTOM HOOK: USEMEDIAQUERY TIPADO
// ============================================

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);
  
  return matches;
}

function ResponsiveDemoTyped() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  
  return (
    <div>
      <p>Mobile: {isMobile ? 'Sí' : 'No'}</p>
      <p>Dark mode: {isDark ? 'Sí' : 'No'}</p>
    </div>
  );
}

// ============================================
// 5. CUSTOM HOOK: USEDEBOUNCE TIPADO
// ============================================

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

function SearchDemoTyped() {
  const [query, setQuery] = React.useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    if (!debouncedQuery) { setResults([]); return; }
    const timer = setTimeout(() => {
      setResults([`Resultado 1 para "${debouncedQuery}"`, `Resultado 2 para "${debouncedQuery}"`]);
    }, 500);
    return () => clearTimeout(timer);
  }, [debouncedQuery]);
  
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar..." />
      <p>Debounced: {debouncedQuery}</p>
      <ul>{results.map((r, i) => <li key={i}>{r}</li>)}</ul>
    </div>
  );
}

// ============================================
// 6. CUSTOM HOOK: USEINTERSECTIONOBSERVER TIPADO
// ============================================

interface UseIntersectionObserverResult {
  ref: React.RefObject<HTMLDivElement | null>;
  isIntersecting: boolean;
}

function useIntersectionObserver(options: IntersectionObserverInit = {}): UseIntersectionObserverResult {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting), options);
    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);
  
  return { ref, isIntersecting };
}

function InfiniteScrollDemoTyped() {
  const [items, setItems] = React.useState<number[]>(Array.from({ length: 10 }, (_, i) => i + 1));
  const { ref, isVisible } = useIntersectionObserver({ rootMargin: '100px' });
  
  React.useEffect(() => {
    if (isVisible && items.length < 50) {
      setItems(prev => [...prev, ...Array.from({ length: 10 }, (_, i) => prev.length + 1 + i)]);
    }
  }, [isVisible, items.length]);
  
  return (
    <div>
      {items.map(item => <div key={item} style={{ padding: 20, borderBottom: '1px solid #eee' }}>Item {item}</div>)}
      <div ref={ref}>{isVisible ? 'Cargando más...' : 'Scroll para cargar'}</div>
    </div>
  );
}

// ============================================
// 7. EVITAR EFECTOS INNECESARIOS
// ============================================

// ❌ MAL: Effect para derived state
function BadDerivedStateTyped({ multiplier }: { multiplier: number }) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => { setValue(multiplier * 10); }, [multiplier]);
  return <div>{value}</div>;
}

// ✅ BIEN: Derived state
function GoodDerivedStateTyped({ multiplier }: { multiplier: number }) {
  const value = multiplier * 10;
  return <div>{value}</div>;
}

// ❌ MAL: Effect para sincronizar states
function BadSyncStatesTyped() {
  const [first, setFirst] = React.useState('');
  const [second, setSecond] = React.useState('');
  React.useEffect(() => { setSecond(first.toUpperCase()); }, [first]);
  return <input value={first} onChange={e => setFirst(e.target.value)} />;
}

// ✅ BIEN: Derived
function GoodSyncStatesTyped() {
  const [first, setFirst] = React.useState('');
  const second = first.toUpperCase();
  return <input value={first} onChange={e => setFirst(e.target.value)} />;
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function UseEffectAdvancedDemo() {
  return (
    <section>
      <h1>useEffect Advanced TypeScript</h1>
      <UserProfileTyped userId={1} />
      <hr />
      <TimerDemoTyped />
      <hr />
      <LocalStorageDemoTyped />
      <hr />
      <ResponsiveDemoTyped />
      <hr />
      <SearchDemoTyped />
      <hr />
      <InfiniteScrollDemoTyped />
      <hr />
      <BadDerivedStateTyped multiplier={5} />
      <GoodDerivedStateTyped multiplier={5} />
    </section>
  );
}