/**
 * 06-lists-keys.tsx - Listas, Keys y Renderizado Condicional con TypeScript
 */

import React from 'react';

// ============================================
// 1. TIPOS PARA LISTAS
// ============================================

interface ListItem {
  id: number | string;
  name: string;
  active?: boolean;
  date?: string;
}

interface Category {
  id: string;
  name: string;
  items: ListItem[];
}

// ============================================
// 2. MAP BÁSICO TIPADO
// ============================================

function BasicList({ items }: { items: readonly ListItem[] }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// ============================================
// 3. KEYS: TIPOS Y BUENAS PRÁCTICAS
// ============================================

function KeysDemo() {
  const [items, setItems] = React.useState<ListItem[]>([
    { id: 1, name: 'Manzana' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cereza' }
  ]);
  
  // ❌ MAL: index como key
  const BadKeyList = () => (
    <ul>
      {items.map((item, index) => (
        <li key={index}>  // Problema con reordenamiento
          <input placeholder={item.name} />
        </li>
      ))}
    </ul>
  );
  
  // ✅ BIEN: id único
  const GoodKeyList = () => (
    <ul>
      {items.map(item => (
        <li key={item.id}>  // Correcto
          <input placeholder={item.name} />
        </li>
      ))}
    </ul>
  );
  
  // ✅ BIEN: key en Fragment
  const FragmentKeyList = () => (
    <>
      {items.map(item => (
        <React.Fragment key={item.id}>
          <dt>{item.name}</dt>
          <dd>Detalle</dd>
        </React.Fragment>
      ))}
    </>
  );
  
  const addItem = () => {
    const newItem: ListItem = { 
      id: Date.now(),  // ID único
      name: `Fruta ${items.length + 1}` 
    };
    setItems([newItem, ...items]);
  };
  
  const removeItem = (id: number | string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  return (
    <div>
      <button onClick={addItem}>Añadir al inicio</button>
      <h4>❌ Index (malo):</h4>
      <BadKeyList />
      <h4>✅ ID (bueno):</h4>
      <GoodKeyList />
      <dl>{FragmentKeyList()}</dl>
    </div>
  );
}

// ============================================
// 4. RENDERIZADO CONDICIONAL TIPADO
// ============================================

type FilterType = 'all' | 'active' | 'inactive';

function ConditionalList({ items, filter }: { items: readonly ListItem[]; filter: FilterType }) {
  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'active') return item.active === true;
    if (filter === 'inactive') return item.active !== true;
    return true;
  });
  
  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id} className={item.active ? 'active' : 'inactive'}>
          {item.name} {item.active ? '✓' : '✗'}
        </li>
      ))}
    </ul>
  );
}

// ============================================
// 5. LISTAS ANIDADAS
// ============================================

function NestedLists({ categories }: { categories: readonly Category[] }) {
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
// 6. VIRTUALIZACIÓN CONCEPTUAL
// ============================================

function VirtualListConcept({ items }: { items: readonly ListItem[] }) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const itemHeight = 50;
  const windowHeight = 400;
  
  const visibleCount = Math.ceil(windowHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
  
  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;
  const totalHeight = items.length * itemHeight;
  
  return (
    <div 
      style={{ height: windowHeight, overflow: 'auto' }}
      onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map(item => (
            <div key={item.id} style={{ height: itemHeight }}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// 7. USE MEMO PARA LISTAS OPTIMIZADAS
// ============================================

function OptimizedList({ 
  items, 
  sortBy, 
  filter 
}: { 
  items: readonly ListItem[]; 
  sortBy: 'name' | 'date';
  filter: string;
}) {
  // useMemo tipado
  const processedItems = React.useMemo((): ListItem[] => {
    console.log('Procesando lista...');
    
    return [...items]
      .filter(item => 
        !filter || item.name.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'date') {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        }
        return 0;
      });
  }, [items, sortBy, filter]);
  
  return (
    <ul>
      {processedItems.map(item => (
        <li key={item.id}>
          {item.name} - {item.date ?? 'Sin fecha'}
        </li>
      ))}
    </ul>
  );
}

// ============================================
// 8. FORMULARIOS CON LISTAS DINÁMICAS
// ============================================

interface FormField {
  id: number;
  value: string;
}

function DynamicForm() {
  const [fields, setFields] = React.useState<FormField[]>([
    { id: 1, value: '' },
    { id: 2, value: '' }
  ]);
  
  const addField = () => {
    setFields(prev => [...prev, { id: Date.now(), value: '' }]);
  };
  
  const removeField = (id: number) => {
    if (fields.length <= 1) return;
    setFields(prev => prev.filter(f => f.id !== id));
  };
  
  const updateField = (id: number, value: string) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, value } : f));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
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
      <button type="button" onClick={addField}>+ Añadir</button>
      <button type="submit">Enviar</button>
    </form>
  );
}

// ============================================
// 9. KEYS EN COMPONENTES PERSONALIZADOS
// ============================================

interface ListItemComponentProps {
  item: ListItem;
  onDelete: (id: number | string) => void;
}

function ListItemComponent({ item, onDelete }: ListItemComponentProps) {
  return (
    <li className="list-item">
      <span>{item.name}</span>
      <button onClick={() => onDelete(item.id)}>Eliminar</button>
    </li>
  );
}

function ItemList({ 
  items, 
  onDelete 
}: { 
  items: readonly ListItem[]; 
  onDelete: (id: number | string) => void;
}) {
  return (
    <ul>
      {items.map(item => (
        // KEY VA EN EL MAP, NO EN EL COMPONENTE
        <ListItemComponent key={item.id} item={item} onDelete={onDelete} />
      ))}
    </ul>
  );
}

// ============================================
// 10. ERRORES COMUNES TIPADOS
// ============================================

function CommonKeyMistakes() {
  const [items] = React.useState<string[]>(['a', 'b', 'c']);
  
  return (
    <div>
      <h4>Errores Comunes:</h4>
      
      {/* ❌ Key duplicada si items tiene duplicados */}
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      
      {/* ❌ Index en lista mutable */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      {/* ✅ Correcto: ID único estable */}
      <ul>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function ListsKeysDemo() {
  const items: ListItem[] = [
    { id: 1, name: 'React', active: true, date: '2024-01-15' },
    { id: 2, name: 'Vue', active: false, date: '2024-01-10' },
    { id: 3, name: 'Angular', active: true, date: '2024-01-20' },
    { id: 4, name: 'Svelte', active: true, date: '2024-01-05' }
  ];
  
  const categories: Category[] = [
    { id: 'frontend', name: 'Frontend', items: [
      { id: 1, name: 'React' },
      { id: 2, name: 'Vue' }
    ]},
    { id: 'backend', name: 'Backend', items: [
      { id: 3, name: 'Node.js' },
      { id: 4, name: 'Python' }
    ]}
  ];
  
  const largeList: ListItem[] = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`
  }));
  
  return (
    <section>
      <h1>Lists & Keys TypeScript</h1>
      
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