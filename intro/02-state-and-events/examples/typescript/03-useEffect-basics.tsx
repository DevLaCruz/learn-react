/**
 * 03-useEffect-basics.tsx - useEffect Fundamentos con TypeScript
 */

import React from 'react';

// ============================================
// 1. TIPOS DE EVENTOS SINTÉTICOS
// ============================================

function SyntheticEventTypes() {
  const [count, setCount] = React.useState(0);
  
  // MouseEvent<HTMLButtonElement>
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Click:', e.clientX, e.clientY);
    setCount(c => c + 1);
  };
  
  // ChangeEvent<HTMLInputElement>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Change:', e.target.value);
  };
  
  // FormEvent<HTMLFormElement>
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submit');
  };
  
  // FocusEvent<HTMLInputElement>
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('Focus:', e.target.value);
  };
  
  // KeyboardEvent<HTMLInputElement>
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') console.log('Enter');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={handleClick}>Click me</button>
      <input onChange={handleChange} onFocus={handleFocus} onKeyDown={handleKeyDown} />
      <button type="submit">Submit</button>
      <p>Clicks: {count}</p>
    </form>
  );
}

// ============================================
// 2. USEEFFECT SIN DEPENDENCIAS
// ============================================

function EffectEveryRenderTyped() {
  const [count, setCount] = React.useState(0);
  
  // Se ejecuta cada render - useEffect<EffectCallback, DependencyList>
  React.useEffect(() => {
    console.log('Effect ejecutado, count:', count);
    document.title = `Count: ${count}`;
  }); // Sin dependency array = cada render
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Incrementar</button>
    </div>
  );
}

// ============================================
// 3. USEEFFECT SOLO MOUNT (ARRAY VACÍO)
// ============================================

function EffectOnlyMountTyped() {
  interface Post {
    id: number;
    title: string;
    body: string;
  }
  
  const [data, setData] = React.useState<Post | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  
  React.useEffect(() => {
    console.log('Mount - Solo una vez');
    
    const controller = new AbortController();
    
    fetch('https://jsonplaceholder.typicode.com/posts/1', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((json: Post) => setData(json))
      .catch((err: Error) => {
        if (err.name !== 'AbortError') setError(err);
      });
    
    // Cleanup function
    return () => {
      console.log('Unmount - Cleanup');
      controller.abort();
    };
  }, []); // Array vacío = solo mount/unmount
  
  return (
    <div>
      {data ? (
        <div>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </div>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

// ============================================
// 4. USEEFFECT CON DEPENDENCIAS
// ============================================

function EffectWithDepsTyped() {
  interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
  }
  
  const [userId, setUserId] = React.useState<number>(1);
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);
  
  React.useEffect(() => {
    const controller = new AbortController();
    
    setLoading(true);
    setUser(null);
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { signal: controller.signal })
      .then(res => res.json())
      .then((data: User) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          console.error(err);
          setLoading(false);
        }
      });
    
    return () => controller.abort();
  }, [userId]); // Dependency array
  
  return (
    <div>
      <select value={userId} onChange={e => setUserId(Number(e.target.value))}>
        {[1,2,3,4,5,6,7,8,9,10].map(i => <option key={i} value={i}>User {i}</option>)}
      </select>
      
      {loading ? <p>Cargando...</p> : user ? (
        <div>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      ) : null}
    </div>
  );
}

// ============================================
// 5. CLEANUP CON TIMERS Y EVENT LISTENERS
// ============================================

function CleanupExamplesTyped() {
  const [count, setCount] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  // Timer con cleanup
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Event listener con cleanup
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div>
      <p>Timer: {count}</p>
      <p>Window width: {windowWidth}px</p>
    </div>
  );
}

// ============================================
// 6. ABORTCONTROLLER PARA FETCH
// ============================================

function FetchWithAbortTyped() {
  const [userId, setUserId] = React.useState(1);
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = React.useState(false);
  
  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    setLoading(true);
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { signal })
      .then(res => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then((data: { name: string; email: string }) => {
        if (!signal.aborted) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!signal.aborted) {
          setUser(null);
          setLoading(false);
        }
      });
    
    return () => controller.abort();
  }, [userId]);
  
  return (
    <div>
      <select value={userId} onChange={e => setUserId(Number(e.target.value))}>
        {[1,2,3,4,5].map(i => <option key={i} value={i}>User {i}</option>)}
      </select>
      
      {loading && <p>Cargando...</p>}
      {user && (
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// 7. USELAYOUTEFFECT VS USEEFFECT
// ============================================

function LayoutEffectDemoTyped() {
  interface Dimensions {
    width: number;
    height: number;
  }
  
  const [dimensions, setDimensions] = React.useState<Dimensions>({ width: 0, height: 0 });
  const divRef = React.useRef<HTMLDivElement>(null);
  
  // useLayoutEffect: sincrónico, después de mutaciones DOM
  React.useLayoutEffect(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  }, []);
  
  React.useEffect(() => {
    console.log('useEffect - after paint');
  }, []);
  
  return (
    <div ref={divRef} style={{ padding: 20, background: '#f0f0f0' }}>
      <p>Dimensiones: {dimensions.width} x {dimensions.height}</p>
    </div>
  );
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function UseEffectBasicsDemo() {
  return (
    <section>
      <h1>useEffect Basics TypeScript</h1>
      
      <SyntheticEventTypes />
      <hr />
      <EffectEveryRenderTyped />
      <hr />
      <EffectOnlyMountTyped />
      <hr />
      <EffectWithDepsTyped />
      <hr />
      <CleanupExamplesTyped />
      <hr />
      <FetchWithAbortTyped />
      <hr />
      <LayoutEffectDemoTyped />
    </section>
  );
}