/**
 * 03-useEffect-basics.jsx - useEffect Fundamentos
 * 
 * useEffect maneja side effects: suscripciones, fetch, timers, DOM manual, etc.
 */

import React from 'react';

// ============================================
// 1. EFECTO SIN DEPENDENCIAS (CADA RENDER)
// ============================================

function EffectEveryRender() {
  const [count, setCount] = React.useState(0);
  
  // ⚠️ SE EJECUTA EN CADA RENDER - usar con cuidado
  React.useEffect(() => {
    console.log('Effect ejecutado, count:', count);
    document.title = `Count: ${count}`;
  }); // Sin array de dependencias
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Incrementar</button>
    </div>
  );
}

// ============================================
// 2. EFECTO SOLO MOUNT (ARRAY VACÍO [])
// ============================================

function EffectOnlyMount() {
  const [data, setData] = React.useState(null);
  
  // ✅ Se ejecuta UNA SOLA VEZ al montar
  React.useEffect(() => {
    console.log('Mount - Solo una vez');
    
    // Fetch data al montar
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(console.error);
  }, []); // Array vacío = solo mount
  
  // Cleanup al desmontar
  React.useEffect(() => {
    console.log('Mount effect cleanup');
    return () => {
      console.log('Unmount - Cleanup');
      // Cancelar suscripciones, timers, etc.
    };
  }, []);
  
  return (
    <div>
      {data ? (
        <div>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

// ============================================
// 3. EFECTO CON DEPENDENCIAS
// ============================================

function EffectWithDeps() {
  const [userId, setUserId] = React.useState(1);
  const [user, setUser] = React.useState(null);
  
  // Se ejecuta cuando userId CAMBIA
  React.useEffect(() => {
    console.log('Fetching user:', userId);
    setUser(null); // Loading state
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(console.error);
  }, [userId]); // Dependency array
  
  return (
    <div>
      <select value={userId} onChange={e => setUserId(Number(e.target.value))}>
        <option value={1}>User 1</option>
        <option value={2}>User 2</option>
        <option value={3}>User 3</option>
      </select>
      
      {user ? (
        <div>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

// ============================================
// 4. CLEANUP FUNCTION (LIMPIEZA)
// ============================================

function CleanupExamples() {
  const [count, setCount] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  
  // Timer con cleanup
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    // CLEANUP: Se ejecuta antes del siguiente effect O al desmontar
    return () => {
      clearInterval(timer); // ¡ESSENTIAL para evitar memory leaks!
      console.log('Timer limpiado');
    };
  }, []); // Solo mount/unmount
  
  // Event listener con cleanup
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Suscripción a store externo (patrón común)
  React.useEffect(() => {
    // Simular store externo
    const store = {
      subscribers: new Set(),
      state: { theme: 'light' },
      subscribe(fn) { this.subscribers.add(fn); return () => this.subscribers.delete(fn); },
      setTheme(t) { this.state.theme = t; this.subscribers.forEach(fn => fn(this.state)); }
    };
    
    const unsubscribe = store.subscribe(state => {
      console.log('Store changed:', state);
    });
    
    return () => unsubscribe(); // Cleanup suscripción
  }, []);
  
  return (
    <div>
      <p>Timer: {count}</p>
      <p>Window width: {windowWidth}px</p>
    </div>
  );
}

// ============================================
// 5. ABORTCONTROLLER PARA FETCH
// ============================================

function FetchWithAbort() {
  const [userId, setUserId] = React.useState(1);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  
  React.useEffect(() => {
    // Crear AbortController para este effect
    const controller = new AbortController();
    const signal = controller.signal;
    
    setLoading(true);
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { signal })
      .then(res => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then(data => {
        // Verificar si el componente sigue montado
        if (!signal.aborted) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!signal.aborted) {
          setUser(null);
          setLoading(false);
          console.error(err);
        }
        // Ignorar AbortError (es normal al cleanup)
      });
    
    // CLEANUP: Abortar fetch si userId cambia o desmonta
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
      {!loading && !user && <p>Usuario no encontrado</p>}
    </div>
  );
}

// ============================================
// 6. EFECTO CONDICIONAL (EARLY RETURN)
// ============================================

function ConditionalEffect({ userId }) {
  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    // Early return si no hay userId
    if (!userId) {
      setData(null);
      return; // No cleanup necesario
    }
    
    const controller = new AbortController();
    
    fetch(`/api/users/${userId}`, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });
    
    return () => controller.abort();
  }, [userId]);
  
  return <div>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Sin usuario'}</div>;
}

// ============================================
// 7. USEEFFECT VS USELAYOUTEFFECT
// ============================================

function LayoutEffectDemo() {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const divRef = React.useRef(null);
  
  // useLayoutEffect: sincrónico, después de mutaciones DOM, antes de paint
  // Útil para mediciones DOM que afectan layout
  React.useLayoutEffect(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  }, []); // Solo mount
  
  // useEffect: asíncrono, después de paint
  // Útil para la mayoría de side effects
  React.useEffect(() => {
    console.log('useEffect - after paint');
  }, []);
  
  return (
    <div ref={divRef} style={{ padding: 20, background: '#f0f0f0' }}>
      <p>Dimensiones: {dimensions.width} x {dimensions.height}</p>
      <button onClick={() => alert('Medido en useLayoutEffect')}>
        Medir de nuevo
      </button>
    </div>
  );
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function UseEffectBasicsDemo() {
  return (
    <section>
      <h1>useEffect Basics</h1>
      
      <EffectEveryRender />
      <hr />
      <EffectOnlyMount />
      <hr />
      <EffectWithDeps />
      <hr />
      <CleanupExamples />
      <hr />
      <FetchWithAbort />
      <hr />
      <ConditionalEffect userId={1} />
      <hr />
      <LayoutEffectDemo />
    </section>
  );
}