/**
 * 01-react-elements.tsx - React Elements: createElement vs JSX (TypeScript)
 * 
 * TypeScript añade tipado estático a React Elements.
 * Los elementos tienen tipo React.ReactElement<Props>.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

// ============================================
// 1. TIPOS DE REACT ELEMENTS
// ============================================

// ReactElement: resultado de createElement o JSX
// React.ReactElement<P> donde P son las props del elemento
const typedElement: React.ReactElement<{ className: string }> = 
  React.createElement('h1', { className: 'title' }, 'Hola');

// JSX también infiere tipos
const jsxTyped: React.ReactElement<{ id: string; className: string }> = (
  <div id="app" className="container">
    <h1 className="title">Título</h1>
  </div>
);

// ReactNode: cualquier cosa renderizable (element, string, number, array, null, undefined)
const nodeExamples: React.ReactNode[] = [
  'texto',
  123,
  true,
  null,
  undefined,
  <div>Elemento</div>,
  ['array', 'de', 'nodos']
];

// ReactElement vs ReactNode:
// - ReactElement: SOLO elementos creados con createElement/JSX (tiene type, props, key)
// - ReactNode: CUALQUIER cosa que React pueda renderizar

// ============================================
// 2. CREATEELEMENT CON TIPOS
// ============================================

// HTML Elements: React.createElement('tag', props, children)
const htmlElement = React.createElement(
  'div',
  { id: 'app', className: 'container' },
  React.createElement('h1', { className: 'title' }, 'Título'),
  React.createElement('p', { className: 'text' }, 'Contenido')
);

// Component Elements: React.createElement(Component, props, children)
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button className={`btn btn-${variant}`} onClick={onClick}>{label}</button>;
}

const componentElement = React.createElement(
  Button,
  { label: 'Click me', onClick: () => alert('!'), variant: 'secondary' }
);

// ============================================
// 3. JSX CON TIPOS EXPLÍCITOS
// ============================================

// Tipo inferido automáticamente
const inferred = <div className="box">Contenido</div>;
// inferred: React.ReactElement<{ className: string; children: string }>

// Tipo explícito con React.ReactElement
const explicit: React.ReactElement<{ className: string; children: React.ReactNode }> = (
  <div className="box">
    <span>Niño</span>
  </div>
);

// Fragment con tipo
const fragment: React.ReactElement = (
  <>
    <h1>Uno</h1>
    <h2>Dos</h2>
  </>
);

// Fragment con key (requiere React.Fragment explícito)
const keyedFragment = (
  <React.Fragment key="unique-key">
    <dt>Término</dt>
    <dd>Definición</dd>
  </React.Fragment>
);

// ============================================
// 4. EXPRESIONES TIPADAS EN JSX
// ============================================

interface User {
  name: string;
  age: number;
  isAdmin: boolean;
  skills: string[];
}

const user: User = { name: 'Ana', age: 28, isAdmin: true, skills: ['React', 'TS'] };

const expressions: React.ReactElement = (
  <div className="user-card">
    {/* Variables tipadas */}
    <h2>{user.name.toUpperCase()}</h2>
    <p>Edad: {user.age}</p>
    
    {/* Ternario con tipos */}
    <p>{user.isAdmin ? 'Administrador' : 'Usuario'}</p>
    
    {/* Map tipado */}
    <ul>
      {user.skills.map((skill: string, index: number) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
    
    {/* Función con retorno tipado */}
    <p>Habilidades: {formatSkills(user.skills)}</p>
  </div>
);

function formatSkills(skills: string[]): string {
  return skills.join(', ').toUpperCase();
}

// ============================================
// 5. CHILDREN TIPADO
// ============================================

interface ContainerProps {
  children: React.ReactNode;  // Acepta cualquier nodo renderizable
  // O más restrictivo:
  // children: React.ReactElement | React.ReactElement[]; // Solo elementos
  // children: (props: { index: number }) => React.ReactNode; // Render prop
}

function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>;
}

// Uso con diferentes tipos de children:
const childrenVariations = (
  <Container>
    <h1>Título</h1>
    <p>Párrafo</p>
    {'Texto plano'}
    {123}
    {null}
    {undefined}
    {true && <span>Condicional</span>}
    {['a', 'b'].map(l => <span key={l}>{l}</span>)}
  </Container>
);

// ============================================
// 6. RENDERIZADO TIPADO
// ============================================

// createRoot tipado
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  
  // root.render espera React.ReactElement | React.ReactNode
  root.render(<App />);
}

// ============================================
// 7. INMUTABILIDAD CON TIPOS
// ============================================

// ReactElement es readonly (inmutable)
const immutableElement: Readonly<React.ReactElement<{ className: string }>> = (
  <h1 className="title">Inmutable</h1>
);

// immutableElement.props.className = 'otro'; // Error TS: Cannot assign to 'className' because it is a read-only property

// Para "actualizar", crear nuevo elemento
function createUpdatedElement(newClass: string): React.ReactElement {
  return <h1 className={newClass}>Actualizado</h1>;
}

// ============================================
// COMPONENTE DEMO
// ============================================

interface AppProps {
  title: string;
}

export default function ReactElementsDemo({ title }: AppProps) {
  return (
    <section>
      <h1>{title}</h1>
      <div>{jsxTyped}</div>
      <div>{expressions}</div>
      <Container>
        <p>Children tipado como ReactNode</p>
      </Container>
    </section>
  );
}