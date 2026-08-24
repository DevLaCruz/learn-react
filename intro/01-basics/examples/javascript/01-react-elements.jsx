/**
 * 01-react-elements.jsx - React Elements: createElement vs JSX
 * 
 * CONCEPTO CLAVE: React Elements son objetos JS planos e inmutables
 * que describen qué renderizar. NO son nodos DOM reales.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

// ============================================
// 1. React.createElement() - La forma "cruda"
// ============================================

// Sintaxis: React.createElement(type, props, ...children)
// type: string (HTML tag) o function/class (component)
// props: objeto con atributos (null si no hay)
// children: contenido interno (strings, números, otros elements)

const h1Element = React.createElement(
  'h1',                    // type: etiqueta HTML
  { className: 'title' },  // props: atributos
  'Hola Mundo'             // children: texto interno
);

// Resultado: { type: 'h1', props: { className: 'title', children: 'Hola Mundo' } }

// Elemento anidado: div > h1 + p
const containerElement = React.createElement(
  'div',
  { id: 'app', className: 'container' },
  React.createElement('h1', { className: 'title' }, 'Título Principal'),
  React.createElement('p', { className: 'subtitle' }, 'Subtítulo descriptivo'),
  React.createElement('button', { className: 'btn', onClick: () => alert('Click!') }, 'Botón')
);

// ============================================
// 2. JSX - Azúcar sintáctico (se compila a createElement)
// ============================================

// ESTOS DOS SON IDÉNTICOS DESPUÉS DE TRANSPILAR:

// JSX (lo que escribimos)
const jsxElement = (
  <div id="app" className="container">
    <h1 className="title">Título Principal</h1>
    <p className="subtitle">Subtítulo descriptivo</p>
    <button className="btn" onClick={() => alert('Click!')}>Botón</button>
  </div>
);

// createElement (lo que genera Babel)
const compiledElement = React.createElement(
  'div',
  { id: 'app', className: 'container' },
  React.createElement('h1', { className: 'title' }, 'Título Principal'),
  React.createElement('p', { className: 'subtitle' }, 'Subtítulo descriptivo'),
  React.createElement('button', { className: 'btn', onClick: () => alert('Click!') }, 'Botón')
);

// ============================================
// 3. Expresiones JavaScript en JSX { }
// ============================================

const user = { name: 'Ana', age: 28, isAdmin: true };

const dynamicElement = (
  <div className="user-card">
    {/* Expresiones válidas: variables, funciones, ternarios, map */}
    <h2>Usuario: {user.name.toUpperCase()}</h2>
    <p>Edad: {user.age}</p>
    <p>Rol: {user.isAdmin ? 'Administrador' : 'Usuario'}</p>
    {/* Comentarios en JSX: {/* comentario */} */}
    <ul>
      {['React', 'TypeScript', 'Node.js'].map((skill, i) => (
        <li key={i}>{skill}</li>
      ))}
    </ul>
  </div>
);

// ============================================
// 4. Renderizado en el DOM
// ============================================

// createRoot (React 18+) - Modo concurrente
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza CUALQUIER React Element (createElement o JSX)
root.render(jsxElement);

// ============================================
// 5. Inmutabilidad de React Elements
// ============================================

// Los elements son INMUTABLES - no se pueden cambiar tras crearse
const element1 = <h1>Hola</h1>;
const element2 = <h1>Mundo</h1>;
// element1.props.children = 'Cambiado'; // ERROR: no se puede mutar

// Para "cambiar" la UI, se crea un NUEVO element y se re-renderiza
function tick() {
  const element = (
    <div>
      <h1>¿Qué hora es?</h1>
      <h2>Son las {new Date().toLocaleTimeString()}</h2>
    </div>
  );
  root.render(element); // Nuevo element cada segundo
}

// setInterval(tick, 1000); // Descomenta para ver reloj en vivo

// ============================================
// 6. Fragmentos - Múltiples elementos raíz
// ============================================

// ❌ Error: JSX debe tener un solo elemento padre
// const bad = (<h1>Uno</h1> <h2>Dos</h2>);

// ✅ Bien: Fragment explícito
const withFragment = (
  <React.Fragment>
    <h1>Uno</h1>
    <h2>Dos</h2>
  </React.Fragment>
);

// ✅ Bien: Fragment abreviado (sintaxis preferida)
const shortFragment = (
  <>
    <h1>Uno</h1>
    <h2>Dos</h2>
  </>
);

// Fragment con key (necesario en listas de fragments)
const keyedFragments = items.map(item => (
  <React.Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </React.Fragment>
));

export default function ReactElementsDemo() {
  return (
    <section>
      <h1>React Elements Demo</h1>
      <jsxElement />
      <dynamicElement />
    </section>
  );
}