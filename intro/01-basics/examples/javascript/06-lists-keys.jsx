/**
 * 06-lists-keys.jsx - Listas, Keys y Renderizado Condicional
 * 
 * Renderizar listas eficientemente es crucial en React.
 * Las keys ayudan a React a identificar qué elementos cambiaron.
 */

import React from 'react';

// ============================================
// 1. MAP BÁSICO - Renderizar array de datos
// ============================================

function BasicList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// ============================================
// 2. KEYS: IMPORTANCIA Y BUENAS PRÁCTICAS
// ============================================

function KeysDemo() {
  const [items, setItems] = React.useState([
    { id: 1, name: 'Manzana' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cereza' }
  ]);
  
  // ❌ MAL: index como key (rompe con reordenamiento/inserción)
  const BadKeyList = () => (
    <ul>
      {items.map((item, index) => (
        <li key={index}>  // PROBLEMA: si insertas al inicio, keys no cambian pero contenido sí
          <input placeholder={item.name} />
        </li>
      ))}
    </ul>
  );
  
  // ✅ BIEN: id único y estable como key
  const GoodKeyList = () => (
    <ul>
      {items.map(item => (
        <li key={item.id}>  // CORRECTO: id único identifica el elemento
          <input placeholder={item.name} />
        </li>
      ))}
    </ul>
  );
  
  // ✅ BIEN: key en Fragment para listas de fragments
  const FragmentKeyList = () => (
    <>
      {items.map(item => (
        <React.Fragment key={item.id}>
          <dt>{item.name}</dt>
          <dd>Detalle de {item.name}</dd>
        </React.Fragment>
      ))}
    </>
  );
  
  const addItem = () => {
    const newItem = { 
      id: Date.now(), // id único basado en timestamp
      name: `Fruta ${items.length + 1}` 
    };
    setItems([newItem, ...items]); // Insertar al inicio
  };
  
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  return (
    <div>
      <h3>Keys Demo</h3>
      <button onClick={addItem}>Añadir al inicio</button>
      
      <h4>❌ Con Index (malo - prueba escribir y añadir):</h4>
      <BadKeyList />
      
      <h4>✅ Con ID (bueno - mantiene estado input):</h4>
      <GoodKeyList />
      
      <h4>Fragment Keys:</h4>
      <dl>{FragmentKeyList()}</dl>
    </div>
  );
}

// ============================================
// 3. RENDERIZADO CONDICIONAL EN LISTAS
// ============================================

function ConditionalList({ items, filter }) {
  return (
    <ul>
      {items
        .filter(item => {
          if (filter === 'all') return true;
          if (filter === 'active') return item.active;
          if (filter === 'inactive') return !item.active;
          return true;
        })
        .map(item => (
          <li key={item.id} className={item.active ? 'active' : 'inactive'}>
            {item.name} {item.active ? '✓' : '✗'}
          </li>
        ))}
    </ul>
  );
}

// ============================================
// 4. LISTAS ANIDADAS
// ============================================

function NestedLists({ categories }) {
  return (
    <div>
      {categories.map(category => (
        <div key={category.id} className="category">
          <h3>{category.name}</h3>
          <ul>
            {category.items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 5. VIRTUALIZACIÓN (PARA LISTAS GRANDES)
// ============================================

// Concepto: solo renderizar elementos visibles
// Librerías: react-window, react-virtualized, @tanstack/react-virtual

function VirtualListConcept({ items, itemHeight = 50, windowHeight = 400 }) {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const visibleCount = Math.ceil(windowHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
  
  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;
  const totalHeight = items.length * itemHeight;
  
  return (
    <div 
      className="virtual-list"
      style={{ height: windowHeight, overflow: 'auto' }}
      onScroll={e => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map(item => (
            <div key={item.id} className="virtual-item" style={{ height: itemHeight }}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// 6. ORDENAMIENTO Y FILTRADO MEMOIZADO
// ============================================

function OptimizedList({ items, sortBy, filter }) {
  // useMemo: memoiza el resultado del filtrado/ordenamiento
  const processedItems = React.useMemo(() => {
    console.log('Procesando lista...'); // Solo log cuando cambia items/sortBy/filter
    
    return items
      .filter(item => {
        if (!filter) return true;
        return item.name.toLowerCase().includes(filter.toLowerCase());
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
        return 0;
      });
  }, [items, sortBy, filter]);
  
  return (
    <ul>
      {processedItems.map(item => (
        <li key={item.id}>{item.name} - {item.date}</li>
      ))}
    </ul>
  );
}

// ============================================
// 7. FORMULARIOS CON LISTAS DINÁMICAS
// ============================================

function DynamicForm() {
  const [fields, setFields] = React.useState([
    { id: 1, value: '' },
    { id: 2, value: '' }
  ]);
  
  const addField = () => {
    setFields([...fields, { id: Date.now(), value: '' }]);
  };
  
  const removeField = (id) => {
    if (fields.length <= 1) return; // Mínimo 1 campo
    setFields(fields.filter(f => f.id !== id));
  };
  
  const updateField = (id, value) => {
    setFields(fields.map(f => f.id === id ? { ...f, value } : f));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Valores:', fields.map(f => f.value));
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.id} className="field-row">
          <input
            value={field.value}
            onChange={e => updateField(field.id, e.target.value)}
            placeholder={`Campo ${fields.indexOf(field) + 1}`}
          />
          <button type="button" onClick={() => removeField(field.id)}>
            ×
          </button>
        </div>
      ))}
      <button type="button" onClick={addField}>+ Añadir campo</button>
      <button type="submit">Enviar</button>
    </form>
  );
}

// ============================================
// 8. KEYS EN COMPONENTES PERSONALIZADOS
// ============================================

function ListItem({ item, onDelete }) {
  // El key se pasa al componente contenedor, NO aquí
  return (
    <li className="list-item">
      <span>{item.name}</span>
      <button onClick={() => onDelete(item.id)}>Eliminar</button>
    </li>
  );
}

function ItemList({ items, onDelete }) {
  return (
    <ul>
      {items.map(item => (
        // KEY VA AQUÍ, en el elemento del map, NO en ListItem
        <ListItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </ul>
  );
}

// ============================================
// 9. ERRORES COMUNES CON KEYS
// ============================================

function CommonKeyMistakes() {
  const [items, setItems] = React.useState(['a', 'b', 'c']);
  
  return (
    <div>
      <h4>Errores Comunes:</h4>
      
      {/* ❌ Key duplicada */}
      <ul>
        {items.map((item, i) => (
          <li key={item}>{item}</li> // Si items tiene duplicados, key duplicada!
        ))}
      </ul>
      
      {/* ❌ Key como índice en lista mutable */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li> // Rompe con inserción/eliminación
        ))}
      </ul>
      
      {/* ❌ Key en componente hijo (no en el map) */}
      {/* <ul>
        {items.map(item => (
          <ChildComponent key={item.id} item={item} /> // Funciona pero confuso
        ))}
      </ul> */}
      
      {/* ❌ Key como string de objeto */}
      <ul>
        {items.map(item => (
          <li key={{ id: item.id }}>{item}</li> // Key debe ser string/number
        ))}
      </ul>
      
      {/* ✅ Correcto: ID único estable */}
      <ul>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li> // Único si items puede duplicarse
        ))}
      </ul>
    </div>
  );
}

// ============================================
// COMPONENTE DEMO PRINCIPAL
// ============================================

export default function ListsKeysDemo() {
  const [items] = React.useState([
    { id: 1, name: 'React', active: true, date: '2024-01-15' },
    { id: 2, name: 'Vue', active: false, date: '2024-01-10' },
    { id: 3, name: 'Angular', active: true, date: '2024-01-20' },
    { id: 4, name: 'Svelte', active: true, date: '2024-01-05' }
  ]);
  
  const categories = [
    { id: 'frontend', name: 'Frontend', items: [
      { id: 1, name: 'React' },
      { id: 2, name: 'Vue' }
    ]},
    { id: 'backend', name: 'Backend', items: [
      { id: 3, name: 'Node.js' },
      { id: 4, name: 'Python' }
    ]}
  ];
  
  const largeList = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`
  }));
  
  return (
    <section>
      <h1>Lists & Keys</h1>
      
      <BasicList items={items} />
      
      <KeysDemo />
      
      <ConditionalList items={items} filter="active" />
      
      <NestedLists categories={categories} />
      
      <VirtualListConcept items={largeList} />
      
      <OptimizedList items={items} sortBy="name" filter="Re" />
      
      <DynamicForm />
      
      <ItemList items={items} onDelete={id => console.log('Delete:', id)} />
      
      <CommonKeyMistakes />
    </section>
  );
}