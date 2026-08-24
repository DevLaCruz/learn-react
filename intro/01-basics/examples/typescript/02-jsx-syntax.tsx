/**
 * 02-jsx-syntax.tsx - Reglas JSX con TypeScript
 */

import React from 'react';

// ============================================
// 1. ATRIBUTOS TIPADOS
// ============================================

// React proporciona tipos para todos los atributos HTML/SVG
interface InputProps {
  // HTMLAttributes<HTMLInputElement> incluye todos los attrs válidos
  type?: 'text' | 'email' | 'password' | 'number';
  className?: string;
  htmlFor?: string;        // NO 'for'
  tabIndex?: number;       // NO 'tabindex'
  readOnly?: boolean;      // NO 'readonly'
  maxLength?: number;      // NO 'maxlength'
  autoComplete?: string;   // NO 'autocomplete'
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  // data-* y aria-* se permiten automáticamente
  'data-user-id'?: string;
  'aria-label'?: string;
}

const typedInput = (
  <input
    type="email"
    className="input-field"
    htmlFor="email"
    tabIndex={1}
    readOnly={false}
    maxLength={50}
    autoComplete="email"
    onChange={e => console.log(e.target.value)}
    onClick={e => console.log('Click', e.currentTarget)}
    data-user-id="123"
    aria-label="Email"
  />
);

// ============================================
// 2. EVENTOS TIPADOS
// ============================================

function EventHandlers() {
  // Tipos de eventos comunes:
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Click en:', e.currentTarget);
    console.log('Posición:', e.clientX, e.clientY);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Valor:', e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form enviado');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') console.log('Enter presionado');
  };
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log('Focus:', e.target.value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      />
      <button type="submit" onClick={handleClick}>Enviar</button>
    </form>
  );
}

// ============================================
// 3. EXPRESIONES CON TIPOS
// ============================================

interface User {
  readonly name: string;  // readonly en props
  age: number;
  skills: readonly string[];  // Array readonly
}

const user: User = { name: 'Carlos', age: 30, skills: ['React', 'TypeScript'] };

const expressions = (
  <div>
    {/* TypeScript infiere tipos en expresiones */}
    <p>Nombre: {user.name.toUpperCase()}</p>
    <p>Edad en meses: {user.age * 12}</p>
    
    {/* Ternario: ambos brazos deben tener tipo compatible */}
    <p>{user.age >= 18 ? 'Adulto' : 'Menor'}</p>
    
    {/* && con tipo */}
    {user.skills.length > 0 && <p>Skills: {user.skills.length}</p>}
    
    {/* Map con tipado explícito */}
    <ul>
      {user.skills.map((skill: string, index: number) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
    
    {/* Aserción de tipo si es necesario */}
    <p>{user.name as string}</p>
  </div>
);

// ============================================
// 4. BOOLEANOS, NULL, UNDEFINED
// ============================================

const falsyValues = (
  <div>
    {true && <p>True se renderiza</p>}
    {false && <p>False NO</p>}
    {null && <p>Null NO</p>}
    {undefined && <p>Undefined NO</p>}
    {0 && <p>0 NO - CUIDADO!</p>}  // 0 es falsy en JS
    {'' && <p>String vacío NO</p>}
    
    {/* Para renderizar 0 o false: */}
    <p>Contador: {0}</p>
    <p>Estado: {String(false)}</p>
  </div>
);

// ============================================
// 5. SPREAD OPERATOR TIPADO
// ============================================

interface BaseButtonProps {
  className: string;
  disabled: boolean;
  'aria-label': string;
}

const baseProps: BaseButtonProps = {
  className: 'btn btn-primary',
  disabled: false,
  'aria-label': 'Botón principal'
};

const spreadDemo = (
  <div>
    {/* Spread tipado */}
    <button {...baseProps} onClick={() => {}}>
      Con spread
    </button>
    
    {/* Override tipado */}
    <button {...baseProps} className="btn btn-secondary" disabled={true}>
      Override
    </button>
    
    {/* Rest props */}
    const { className, ...restProps } = baseProps;
    <button {...restProps} className="btn-custom">
      Rest props
    </button>
  </div>
);

// ============================================
// 6. COMPONENTES DINÁMICOS TIPADOS
// ============================================

interface ComponentMap {
  header: React.ComponentType<{ title: string }>;
  content: React.ComponentType<{ body: string }>;
  footer: React.ComponentType<{ copyright: string }>;
}

const components: ComponentMap = {
  header: ({ title }) => <header><h1>{title}</h1></header>,
  content: ({ body }) => <main><p>{body}</p></main>,
  footer: ({ copyright }) => <footer><small>{copyright}</small></footer>
};

function DynamicComponents({ type }: { type: keyof ComponentMap }) {
  const Component = components[type];
  const props = { 
    title: 'Título', 
    body: 'Contenido', 
    copyright: '2024' 
  }[type];
  
  return <Component {...props as any} />; // Cast necesario por union types
}

// ============================================
// 7. SELF-CLOSING Y CHILDREN TIPADOS
// ============================================

interface SelfClosingProps {
  src: string;
  alt: string;
}

const selfClosing = (
  <div>
    <img src="avatar.png" alt="Avatar" />
    <input type="text" placeholder="Escribe..." />
    <br />
    <hr />
    <CustomComponent />
    <CustomComponent></CustomComponent>
  </div>
);

function CustomComponent({ children }: { children?: React.ReactNode }) {
  return <div>{children ?? 'Sin children'}</div>;
}

// ============================================
// 8. GENERICS EN COMPONENTES
// ============================================

// Componente genérico para listas
interface ListProps<T> {
  items: readonly T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Uso con tipo inferido:
const stringList = (
  <List
    items={['a', 'b', 'c']}
    renderItem={item => <span>{item}</span>}
    keyExtractor={item => item}
  />
);

interface Item {
  id: number;
  label: string;
}

const objectList = (
  <List<Item>
    items={[{ id: 1, label: 'Uno' }, { id: 2, label: 'Dos' }]}
    renderItem={item => <span>{item.label}</span>}
    keyExtractor={item => item.id}
  />
);

// ============================================
// COMPONENTE DEMO
// ============================================

export default function JSXSyntaxDemo() {
  return (
    <section>
      <h1>JSX Syntax TypeScript</h1>
      <EventHandlers />
      <div>{expressions}</div>
      <div>{falsyValues}</div>
      <div>{spreadDemo}</div>
      <DynamicComponents type="header" />
      <div>{selfClosing}</div>
      <div>{stringList}</div>
      <div>{objectList}</div>
    </section>
  );
}