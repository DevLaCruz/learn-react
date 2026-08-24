/**
 * 02-jsx-syntax.jsx - Reglas completas de sintaxis JSX
 * 
 * JSX es una extensión de sintaxis para JavaScript que permite
 * escribir estructuras de UI de forma declarativa.
 */

import React from 'react';

// ============================================
// 1. UN SOLO ELEMENTO RAÍZ (o Fragment)
// ============================================

// ✅ Correcto: un solo padre
const validSingleRoot = (
  <div>
    <h1>Título</h1>
    <p>Contenido</p>
  </div>
);

// ✅ Correcto: Fragment (sin nodo DOM extra)
const validFragment = (
  <>
    <h1>Título</h1>
    <p>Contenido</p>
  </>
);

// ❌ Incorrecto: múltiples raíces sin wrapper
// const invalid = (<h1>Uno</h1> <h2>Dos</h2>);

// ============================================
// 2. ATRIBUTOS: CAMELCASE Y NOMBRES ESPECIALES
// ============================================

const attributesDemo = (
  <div>
    {/* HTML estándar → camelCase en JSX */}
    <input
      type="text"
      className="input-field"        // class → className
      htmlFor="email"                // for → htmlFor
      tabIndex={1}                   // tabindex → tabIndex
      readOnly={true}                // readonly → readOnly
      maxLength={50}                 // maxlength → maxLength
      autoComplete="email"           // autocomplete → autoComplete
      onChange={handleChange}        // onchange → onChange
      onClick={handleClick}          // onclick → onClick
    />
    
    {/* Atributos de datos: data-* se mantienen */}
    <div data-user-id="123" data-role="admin">Datos</div>
    
    {/* ARIA: aria-* se mantienen */}
    <button aria-label="Cerrar" aria-expanded={false}>X</button>
    
    {/* SVG: algunos atributos son diferentes */}
    <svg viewBox="0 0 100 100" className="icon">
      <circle cx={50} cy={50} r={40} stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  </div>
);

function handleChange(e) {
  console.log('Input:', e.target.value);
}

function handleClick() {
  console.log('Click!');
}

// ============================================
// 3. EXPRESIONES JAVASCRIPT EN { }
// ============================================

const user = { name: 'Carlos', age: 30, skills: ['React', 'Node'] };

const expressionsDemo = (
  <div>
    {/* Variables */}
    <p>Nombre: {user.name}</p>
    
    {/* Operaciones */}
    <p>Edad en meses: {user.age * 12}</p>
    
    {/* Llamadas a función */}
    <p>Habilidades: {formatSkills(user.skills)}</p>
    
    {/* Operador ternario */}
    <p>{user.age >= 18 ? 'Mayor de edad' : 'Menor de edad'}</p>
    
    {/* Operador lógico && (renderizado condicional) */}
    {user.skills.length > 0 && <p>Tiene {user.skills.length} skills</p>}
    
    {/* Operador lógico || (valor por defecto) */}
    <p>Nickname: {user.nickname || 'Sin apodo'}</p>
    
    {/* Objetos/Arrays NO se renderizan directamente */}
    {/* <p>{user}</p>  ERROR: Objects are not valid as React child */}
    
    {/* Map en JSX */}
    <ul>
      {user.skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </div>
);

function formatSkills(skills) {
  return skills.join(', ').toUpperCase();
}

// ============================================
// 4. CHILDREN: TEXTO, ELEMENTOS, EXPRESIONES
// ============================================

const childrenDemo = (
  <div className="card">
    {/* Texto plano */}
    <h2>Título de la tarjeta</h2>
    
    {/* Elementos JSX anidados */}
    <div className="content">
      <p>Párrafo 1</p>
      <p>Párrafo 2</p>
    </div>
    
    {/* Expresión que retorna JSX */}
    <div className="footer">
      {renderFooter()}
    </div>
    
    {/* Array de elementos */}
    <div className="tags">
      {['react', 'jsx', 'javascript'].map(tag => (
        <span key={tag} className="tag">#{tag}</span>
      ))}
    </div>
  </div>
);

function renderFooter() {
  return <small>© 2024 Mi App</small>;
}

// ============================================
// 5. COMENTARIOS EN JSX
// ============================================

const commentsDemo = (
  <div>
    {/* Comentario de una línea */}
    
    {/*
      Comentario
      de múltiples
      líneas
    */}
    
    <p>Contenido visible</p>
    
    {/* Comentario al final de línea */}
  </div>
);

// ============================================
// 6. BOOLEANOS, NULL, UNDEFINED NO SE RENDERIZAN
// ============================================

const falsyDemo = (
  <div>
    {true && <p>Este SÍ se muestra (true)</p>}
    {false && <p>Este NO se muestra (false)</p>}
    {null && <p>Este NO se muestra (null)</p>}
    {undefined && <p>Este NO se muestra (undefined)</p>}
    {0 && <p>Este NO se muestra (0) - CUIDADO!</p>}
    {'' && <p>Este NO se muestra (string vacío)</p>}
    
    {/* Para mostrar 0 o false explícitamente: */}
    <p>Contador: {0}</p>
    <p>Estado: {String(false)}</p>
  </div>
);

// ============================================
// 7. PROPAGACIÓN DE PROPS (SPREAD OPERATOR)
// ============================================

const baseProps = {
  className: 'btn btn-primary',
  disabled: false,
  'aria-label': 'Botón principal'
};

const spreadDemo = (
  <div>
    {/* Spread: expande todas las props del objeto */}
    <button {...baseProps} onClick={() => console.log('Click!')}>
      Botón con spread
    </button>
    
    {/* Override: props posteriores ganan */}
    <button {...baseProps} className="btn btn-secondary" disabled={true}>
      Botón secundario (override className y disabled)
    </button>
    
    {/* Rest: extraer props específicas */}
    const { className, ...restProps } = baseProps;
    <button {...restProps} className="btn btn-custom">
      Solo props restantes (sin className del original)
    </button>
  </div>
);

// ============================================
// 8. COMPONENTES DINÁMICOS (ELEMENT TYPE VARIABLE)
// ============================================

const DynamicComponents = () => {
  const isLoggedIn = true;
  
  // El tipo de elemento puede ser una variable
  const Title = isLoggedIn ? 'h1' : 'h2';
  const Icon = isLoggedIn ? '🔓' : '🔒';
  
  return (
    <div>
      {/* Componentes nativos (minúscula) */}
      <Title>{Icon} Estado: {isLoggedIn ? 'Logueado' : 'Invitado'}</Title>
      
      {/* Componentes personalizados (Mayúscula) */}
      {isLoggedIn ? <UserPanel /> : <LoginForm />}
    </div>
  );
};

function UserPanel() { return <div>Panel de usuario</div>; }
function LoginForm() { return <form>Formulario de login</form>; }

// ============================================
// 9. SELF-CLOSING TAGS
// ============================================

const selfClosing = (
  <div>
    {/* Elementos vacíos: self-closing obligatorio */}
    <img src="avatar.png" alt="Avatar" />
    <input type="text" placeholder="Escribe..." />
    <br />
    <hr />
    <meta charSet="utf-8" />
    
    {/* Componentes sin children: self-closing opcional */}
    <Button />
    <Button></Button>  // Equivalente
  </div>
);

function Button({ children }) {
  return <button>{children}</button>;
}

export default function JSXSyntaxDemo() {
  return (
    <section>
      <h1>JSX Syntax Rules</h1>
      <attributesDemo />
      <expressionsDemo />
      <childrenDemo />
      <commentsDemo />
      <falsyDemo />
      <spreadDemo />
      <DynamicComponents />
      <selfClosing />
    </section>
  );
}