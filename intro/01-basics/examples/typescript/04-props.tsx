/**
 * 04-props.tsx - Props en profundidad con TypeScript
 */

import React from 'react';

// ============================================
// 1. TIPOS DE PROPS COMPLETOS
// ============================================

interface AllPropTypes {
  // Primitivos
  stringProp: string;
  numberProp: number;
  booleanProp: boolean;
  
  // Opcionales
  optionalString?: string;
  optionalNumber?: number;
  
  // Arrays y objetos
  stringArray: string[];
  numberArray: readonly number[];  // Readonly array
  objectProp: { key: string; value: number };
  
  // Funciones (callbacks)
  onClick: () => void;
  onSubmit: (data: { test: boolean }) => void;
  onChange: (value: string) => void;
  
  // Nodos React
  children: React.ReactNode;
  singleElement: React.ReactElement;
  elementArray: React.ReactElement[];
  
  // Union types
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  
  // Tipos utilitarios
  partialUser: Partial<User>;
  requiredUser: Required<User>;
  userKeys: keyof User;
  userValues: User[keyof User];
}

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

function PropTypesDemo(props: AllPropTypes) {
  return (
    <div className="props-demo">
      <h3>Props Tipadas Recibidas</h3>
      <button onClick={props.onClick}>Click</button>
      <button onClick={() => props.onSubmit({ test: true })}>Submit</button>
      <div>{props.children}</div>
    </div>
  );
}

// ============================================
// 2. DEFAULT PARAMETERS VS DEFAULTPROPS
// ============================================

// ❌ Legacy: defaultProps (deprecated en React 18+)
interface LegacyButtonProps {
  label: string;
  variant: 'primary' | 'secondary';
  disabled: boolean;
}

function LegacyButton({ label, variant, disabled }: LegacyButtonProps) {
  return <button className={`btn btn-${variant}`} disabled={disabled}>{label}</button>;
}

// LegacyButton.defaultProps = { label: 'Botón', variant: 'primary', disabled: false };

// ✅ Moderno: Default parameters
interface ModernButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

function ModernButton({ 
  label = 'Botón', 
  variant = 'primary', 
  disabled = false 
}: ModernButtonProps) {
  return <button className={`btn btn-${variant}`} disabled={disabled}>{label}</button>;
}

// Con destructuring defaults
function DestructuredButton({ 
  label = 'Botón', 
  variant = 'primary', 
  disabled = false 
}: ModernButtonProps) {
  return <button className={`btn btn-${variant}`} disabled={disabled}>{label}</button>;
}

// ============================================
// 3. PROP DRILLING VS COMPOSITION
// ============================================

// ❌ Prop Drilling
interface DrillingProps {
  user: User;
}

function GrandParentDrilling({ user }: DrillingProps) {
  return <ParentDrilling user={user} />;
}

function ParentDrilling({ user }: DrillingProps) {
  return <ChildDrilling user={user} />;
}

function ChildDrilling({ user }: DrillingProps) {
  return <GrandChildDrilling user={user} />;
}

function GrandChildDrilling({ user }: DrillingProps) {
  return <div>Usuario: {user.name}</div>;
}

// ✅ Composition con children
interface CompositionProps {
  children: React.ReactNode;
}

function GrandParentComposition({ children }: CompositionProps) {
  return <div className="gp">{children}</div>;
}

function ParentComposition({ children }: CompositionProps) {
  return <div className="p">{children}</div>;
}

function ChildComposition({ children }: CompositionProps) {
  return <div className="c">{children}</div>;
}

function GrandChildContent({ user }: { user: User }) {
  return <div>Usuario: {user.name}</div>;
}

// ============================================
// 4. DESTRUCTURING AVANZADO TIPADO
// ============================================

// Rest props: capturar props restantes
interface InputWithRestProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function InputWithRest({ label, ...restProps }: InputWithRestProps) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input {...restProps} />
    </div>
  );
}

// Destructuring anidado con defaults
interface NestedUser {
  name: string;
  address?: {
    city?: string;
    country?: string;
  };
}

function UserCard({ 
  user: { 
    name = 'Anónimo', 
    address: { city = 'Desconocida', country = 'Desconocido' } = {} 
  } = {} 
}: { user?: NestedUser }) {
  return (
    <div className="user-card">
      <h4>{name}</h4>
      <p>{city}, {country}</p>
    </div>
  );
}

// ============================================
// 5. FORWARDREF TIPADO
// ============================================

interface FancyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FancyInput = React.forwardRef<HTMLInputElement, FancyInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div>
        {label && <label>{label}</label>}
        <input ref={ref} {...props} />
      </div>
    );
  }
);

FancyInput.displayName = 'FancyInput';

// ============================================
// 6. MEMO CON COMPARACIÓN PERSONALIZADA
// ============================================

interface MemoProps {
  user: User;
  onUpdate: (user: User) => void;
}

// arePropsEqual: (prev, next) => boolean (true = skip render)
const MemoizedComponent = React.memo<MemoProps>(
  function MemoizedComponent({ user, onUpdate }) {
    return (
      <div>
        <span>{user.name}</span>
        <button onClick={() => onUpdate({ ...user, name: 'Nuevo' })}>Actualizar</button>
      </div>
    );
  },
  (prev, next) => {
    // Comparación personalizada
    return prev.user.id === next.user.id && 
           prev.user.name === next.user.name;
  }
);

// ============================================
// 7. CHILDREN COMO FUNCIÓN (RENDER PROPS)
// ============================================

interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  children: (position: MousePosition) => React.ReactNode;
}

function MouseTracker({ children }: MouseTrackerProps) {
  const [position, setPosition] = React.useState<MousePosition>({ x: 0, y: 0 });
  
  React.useEffect(() => {
    const handler = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  
  return <>{children(position)}</>;
}

// ============================================
// 8. PATTERNS AVANZADOS
// ============================================

// Controlled Component
interface ControlledInputProps {
  value: string;
  onChange: (value: string) => void;
}

function ControlledInput({ value, onChange }: ControlledInputProps) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}

// Uncontrolled Component
interface UncontrolledInputProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function UncontrolledInput({ defaultValue, onChange }: UncontrolledInputProps) {
  return <input defaultValue={defaultValue} onChange={e => onChange?.(e.target.value)} />;
}

// Compound Components con tipos
interface TabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
  children: React.ReactElement<TabProps>[];
}

interface TabProps {
  id: string;
  children: React.ReactNode;
}

function Tabs({ activeTab, onChange, children }: TabsProps) {
  return (
    <div>
      <div className="tabs">
        {React.Children.map(children, child => 
          React.isValidElement<TabProps>(child) && (
            <button
              key={child.props.id}
              className={child.props.id === activeTab ? 'active' : ''}
              onClick={() => onChange(child.props.id)}
            >
              {child.props.children}
            </button>
          )
        )}
      </div>
      <div className="tab-panel">
        {React.Children.map(children, child => 
          React.isValidElement<TabProps>(child) && 
          child.props.id === activeTab && child.props.children
        )}
      </div>
    </div>
  );
}

function Tab({ id, children }: TabProps) {
  return <div data-tab-id={id}>{children}</div>;
}

Tabs.Tab = Tab;

// ============================================
// COMPONENTE DEMO
// ============================================

export default function PropsDemo() {
  const [counter, setCounter] = React.useState(0);
  const [user, setUser] = React.useState<User>({ id: 1, name: 'Ana', email: 'ana@test.com', age: 28 });
  
  return (
    <section>
      <h1>Props Deep Dive TypeScript</h1>
      
      <ModernButton label="Primario" />
      <ModernButton label="Secundario" variant="secondary" />
      <ModernButton disabled />
      
      <h3>Composition</h3>
      <GrandParentDrilling user={user} />
      <GrandParentComposition>
        <ParentComposition>
          <ChildComposition>
            <GrandChildContent user={user} />
          </ChildComposition>
        </ParentComposition>
      </GrandParentComposition>
      
      <InputWithRest label="Email" type="email" placeholder="tu@email.com" required />
      
      <UserCard user={user} />
      
      <MemoizedComponent 
        user={user} 
        onUpdate={setUser} 
      />
      
      <MouseTracker>
        {({ x, y }) => <p>Mouse: {x}, {y}</p>}
      </MouseTracker>
      
      <Tabs activeTab="tab1" onChange={console.log}>
        <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
      </Tabs>
    </section>
  );
}