/**
 * 04-props.jsx - Props en profundidad
 * 
 * Props (properties) son la forma de pasar datos de padre a hijo.
 * Son READ-ONLY (inmutables) - el hijo NUNCA debe modificarlas.
 */

import React from 'react';

// ============================================
// 1. TIPOS DE PROPS BÁSICOS
// ============================================

function PropTypesDemo({
  // Primitivos
  stringProp = 'default',
  numberProp = 0,
  booleanProp = false,
  
  // Arrays y objetos
  arrayProp = [],
  objectProp = {},
  
  // Funciones (callbacks)
  onClick,
  onSubmit,
  
  // Nodos React
  children,
  customElement,
  
  // Cualquier tipo
  anyProp
}) {
  return (
    <div className="props-demo">
      <h3>Tipos de Props Recibidos:</h3>
      <ul>
        <li>String: {stringProp}</li>
        <li>Number: {numberProp}</li>
        <li>Boolean: {String(booleanProp)}</li>
        <li>Array length: {arrayProp.length}</li>
        <li>Object keys: {Object.keys(objectProp).join(', ')}</li>
        <li>Children: {React.Children.count(children)} elementos</li>
        <li>Custom Element: {customElement ? 'Sí' : 'No'}</li>
      </ul>
      
      <button onClick={onClick}>Ejecutar onClick</button>
      <button onClick={() => onSubmit({ test: true })}>Ejecutar onSubmit</button>
      
      <div>{children}</div>
      <div>{customElement}</div>
    </div>
  );
}

// ============================================
// 2. DEFAULT PROPS (Legacy - usar default parameters)
// ============================================

// Forma antigua (todavía funciona pero deprecated en React 18+)
function LegacyButton({ label, variant, disabled }) {
  return <button className={`btn btn-${variant}`} disabled={disabled}>{label}</button>;
}

LegacyButton.defaultProps = {
  label: 'Botón',
  variant: 'primary',
  disabled: false
};

// Forma moderna: default parameters en la función
function ModernButton({ label = 'Botón', variant = 'primary', disabled = false }) {
  return <button className={`btn btn-${variant}`} disabled={disabled}>{label}</button>;
}

// ============================================
// 3. PROP DRILLING VS COMPOSITION
// ============================================

// ❌ PROP DRILLING: Pasar props a través de muchos niveles
function GrandParentDrilling({ user }) {
  return <ParentDrilling user={user} />;
}

function ParentDrilling({ user }) {
  return <ChildDrilling user={user} />;
}

function ChildDrilling({ user }) {
  return <GrandChildDrilling user={user} />;
}

function GrandChildDrilling({ user }) {
  return <div>Usuario final: {user.name}</div>;
}

// ✅ COMPOSITION: Usar children o Context
function GrandParentComposition({ children }) {
  return <div className="grandparent">{children}</div>;
}

function ParentComposition({ children }) {
  return <div className="parent">{children}</div>;
}

function ChildComposition({ children }) {
  return <div className="child">{children}</div>;
}

// Uso composición:
// <GrandParentComposition>
//   <ParentComposition>
//     <ChildComposition>
//       <GrandChildContent user={user} />
//     </ChildComposition>
//   </ParentComposition>
// </GrandParentComposition>

function GrandChildContent({ user }) {
  return <div>Usuario final: {user.name}</div>;
}

// ============================================
// 4. PROPS CON VALIDACIÓN (PropTypes - Runtime)
// ============================================

// import PropTypes from 'prop-types';

function ValidatedComponent({ 
  requiredString, 
  optionalNumber, 
  arrayOfStrings, 
  shapeObject,
  callback 
}) {
  return <div>Validado en runtime con PropTypes</div>;
}

/*
ValidatedComponent.propTypes = {
  requiredString: PropTypes.string.isRequired,
  optionalNumber: PropTypes.number,
  arrayOfStrings: PropTypes.arrayOf(PropTypes.string),
  shapeObject: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    active: PropTypes.bool
  }),
  callback: PropTypes.func
};
*/

// ============================================
// 5. DESTRUCTURING AVANZADO
// ============================================

// Rest props: capturar props no desestructuradas
function InputWithRest({ label, type = 'text', ...restProps }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input type={type} {...restProps} />
    </div>
  );
}

// Uso: <InputWithRest label="Email" type="email" placeholder="tu@email.com" required />

// Destructuring anidado
function UserCard({ user: { name, address: { city, country } = {} } = {} }) {
  return (
    <div className="user-card">
      <h4>{name}</h4>
      <p>{city}, {country}</p>
    </div>
  );
}

// Con valores por defecto en destructuring anidado
function UserCardSafe({ 
  user: { 
    name = 'Anónimo', 
    address: { city = 'Desconocida', country = 'Desconocido' } = {} 
  } = {} 
}) {
  return (
    <div className="user-card">
      <h4>{name}</h4>
      <p>{city}, {country}</p>
    </div>
  );
}

// ============================================
// 6. FORWARDING REFS (Para acceder a DOM del hijo)
// ============================================

// import { forwardRef, useImperativeHandle } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = React.useRef(null);
  
  // Exponer métodos imperativos al padre
  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => { if (inputRef.current) inputRef.current.value = ''; },
    getValue: () => inputRef.current?.value
  }));
  
  return <input ref={inputRef} {...props} />;
});

// Uso en padre:
// const inputRef = useRef(null);
// <FancyInput ref={inputRef} />
// inputRef.current.focus();

FancyInput.displayName = 'FancyInput'; // Para debugging

// ============================================
// 7. MEMO: OPTIMIZACIÓN DE RE-RENDERS
// ============================================

// React.memo: evita re-render si props no cambian (comparación shallow)
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data, onAction }) {
  console.log('ExpensiveComponent renderizado');
  
  // Cálculo costoso simulado
  const processed = data?.map(item => ({ ...item, processed: true }));
  
  return (
    <div>
      <h3>Componente Costoso</h3>
      <ul>{processed?.map(item => <li key={item.id}>{item.name}</li>)}</ul>
      <button onClick={onAction}>Acción</button>
    </div>
  );
});

// Comparación personalizada (arePropsEqual)
const CustomMemoComponent = React.memo(
  function CustomMemoComponent({ user, onUpdate }) {
    return <div>{user.name} - {user.email}</div>;
  },
  (prevProps, nextProps) => {
    // Return true si NO debe re-renderizar (props "iguales")
    return prevProps.user.id === nextProps.user.id &&
           prevProps.user.name === nextProps.user.name;
  }
);

// ============================================
// 8. CHILDREN COMO FUNCIÓN (RENDER PROPS)
// ============================================

function MouseTracker({ children }) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  
  React.useEffect(() => {
    const handleMove = e => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  // children puede ser una función: children(position)
  return typeof children === 'function' ? children(position) : children;
}

// Uso:
// <MouseTracker>
//   {({ x, y }) => <p>Mouse: {x}, {y}</p>}
// </MouseTracker>

// ============================================
// 9. PROPS PATTERNS COMUNES
// ============================================

// Compound Components (patrón de componentes compuestos)
function Select({ children, value, onChange }) {
  return (
    <select value={value} onChange={onChange}>
      {React.Children.map(children, child => 
        React.isValidElement(child) ? React.cloneElement(child, { value }) : child
      )}
    </select>
  );
}

function Option({ value, children }) {
  return <option value={value}>{children}</option>;
}

Select.Option = Option;

// Uso:
// <Select value="2" onChange={e => console.log(e.target.value)}>
//   <Select.Option value="1">Opción 1</Select.Option>
//   <Select.Option value="2">Opción 2</Select.Option>
// </Select>

// Controlled vs Uncontrolled
function ControlledInput({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}

function UncontrolledInput({ defaultValue, onChange }) {
  return <input defaultValue={defaultValue} onChange={onChange} />;
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function PropsDemo() {
  const [counter, setCounter] = React.useState(0);
  const [user, setUser] = React.useState({ name: 'Ana', age: 28, address: { city: 'Madrid', country: 'España' } });
  
  return (
    <section>
      <h1>Props Deep Dive</h1>
      
      <PropTypesDemo
        stringProp="Hola"
        numberProp={42}
        booleanProp={true}
        arrayProp={['a', 'b', 'c']}
        objectProp={{ key: 'value' }}
        onClick={() => setCounter(c => c + 1)}
        onSubmit={data => console.log('Submit:', data)}
        customElement={<span>Elemento personalizado</span>}
      >
        <p>Soy children</p>
      </PropTypesDemo>
      
      <ModernButton label="Primario" />
      <ModernButton label="Secundario" variant="secondary" />
      <ModernButton disabled />
      
      <h3>Composition vs Prop Drilling</h3>
      <GrandParentDrilling user={{ name: 'Drilling' }} />
      
      <GrandParentComposition>
        <ParentComposition>
          <ChildComposition>
            <GrandChildContent user={{ name: 'Composition' }} />
          </ChildComposition>
        </ParentComposition>
      </GrandParentComposition>
      
      <InputWithRest 
        label="Email" 
        type="email" 
        placeholder="tu@email.com" 
        required 
        className="custom-input"
      />
      
      <UserCardSafe user={user} />
      
      <ExpensiveComponent 
        data={[{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]}
        onAction={() => console.log('Acción')}
      />
      
      <MouseTracker>
        {({ x, y }) => <p>Mouse position: {x}, {y}</p>}
      </MouseTracker>
    </section>
  );
}