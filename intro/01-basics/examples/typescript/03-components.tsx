/**
 * 03-components.tsx - Function Components con TypeScript
 */

import React from 'react';

// ============================================
// 1. TIPOS DE COMPONENTES
// ============================================

// FunctionComponent (FC) - tipo oficial de React
// Incluye children y props tipadas
interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hola, {name}</h1>;
};

// Arrow function con tipo explícito (RECOMENDADO moderno)
interface FarewellProps {
  name: string;
}

const Farewell = ({ name }: FarewellProps): React.ReactElement => {
  return <h1>Adiós, {name}</h1>;
};

// Function declaration
function Welcome({ name }: { name: string }): React.ReactElement {
  return <h1>Bienvenido, {name}</h1>;
}

// Component sin props
const SimpleComponent = (): React.ReactElement => <div>Simple</div>;

// ============================================
// 2. PROPS CON DESTRUCTURING Y DEFAULTS
// ============================================

interface ProfileProps {
  name: string;
  age?: number;           // Opcional
  city?: string;          // Opcional
  isActive?: boolean;     // Opcional
}

// Default parameters (mejor que defaultProps)
function Profile({ 
  name, 
  age = 0, 
  city = 'Desconocida', 
  isActive = false 
}: ProfileProps) {
  return (
    <div className="profile">
      <h2>{name}</h2>
      <p>Edad: {age}</p>
      <p>Ciudad: {city}</p>
      <p>Estado: {isActive ? 'Activo' : 'Inactivo'}</p>
    </div>
  );
}

// Destructuring con renombrado
interface RenamedProps {
  userName: string;
  userAge: number;
}

function ProfileRenamed({ userName: name, userAge: age }: RenamedProps) {
  return <div>{name} - {age}</div>;
}

// ============================================
// 3. CHILDREN TIPADO
// ============================================

interface CardProps {
  title: string;
  children: React.ReactNode;  // Tipo recomendado para children
  // Alternativas más restrictivas:
  // children: React.ReactElement;           // Un solo elemento
  // children: React.ReactElement[];         // Array de elementos
  // children: (props: { index: number }) => React.ReactNode; // Render prop
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <header><h3>{title}</h3></header>
      <div className="card-body">{children}</div>
    </div>
  );
}

// ============================================
// 4. COMPOSICIÓN TIPADA
// ============================================

interface User {
  id: number;
  name: string;
  email: string;
  postsCount: number;
}

interface UserDashboardProps {
  user: User;
}

function UserDashboard({ user }: UserDashboardProps) {
  return (
    <div className="dashboard">
      <Header user={user} />
      <Navigation />
      <main>
        <UserProfile user={user} />
        <UserStats user={user} />
        <UserActivity userId={user.id} />
      </main>
      <Footer />
    </div>
  );
}

// Sub-componentes tipados
function Header({ user }: { user: User }) {
  return <header>Bienvenido, {user.name}</header>;
}

function Navigation() {
  return <nav>Navegación</nav>;
}

function UserProfile({ user }: { user: User }) {
  return <section><h2>Perfil: {user.name}</h2></section>;
}

function UserStats({ user }: { user: User }) {
  return <section>Posts: {user.postsCount}</section>;
}

function UserActivity({ userId }: { userId: number }) {
  return <section>Actividad de {userId}</section>;
}

function Footer() {
  return <footer>© 2024</footer>;
}

// ============================================
// 5. RENDER PROPS TIPADO
// ============================================

interface DataFetcherProps<T> {
  url: string;
  render: (data: T) => React.ReactNode;
}

function DataFetcher<T>({ url, render }: DataFetcherProps<T>) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((result: T) => { setData(result); setLoading(false); })
      .catch((err: Error) => { setError(err); setLoading(false); });
  }, [url]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Sin datos</div>;
  
  return <>{render(data)}</>;
}

// Uso:
// <DataFetcher<User> url="/api/user" render={user => <Profile name={user.name} />} />

// ============================================
// 6. FORWARDREF TIPADO
// ============================================

interface FancyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

// forwardRef con tipado de ref e props
const FancyInput = React.forwardRef<HTMLInputElement, FancyInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="fancy-input">
        {label && <label>{label}</label>}
        <input ref={ref} {...props} />
      </div>
    );
  }
);

FancyInput.displayName = 'FancyInput';

// Uso:
// const inputRef = React.useRef<HTMLInputElement>(null);
// <FancyInput ref={inputRef} label="Email" type="email" />
// inputRef.current?.focus();

// ============================================
// 7. MEMO TIPADO
// ============================================

interface ExpensiveProps {
  data: readonly { id: number; name: string }[];
  onAction: (id: number) => void;
}

// React.memo con comparación personalizada tipada
const ExpensiveComponent = React.memo<ExpensiveProps>(
  function ExpensiveComponent({ data, onAction }) {
    console.log('ExpensiveComponent render');
    return (
      <div>
        <h3>Costoso</h3>
        <ul>
          {data.map(item => (
            <li key={item.id} onClick={() => onAction(item.id)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  },
  (prev, next) => {
    // Comparación personalizada: true = NO re-renderizar
    return prev.data.length === next.data.length &&
           prev.data.every((item, i) => item.id === next.data[i].id);
  }
);

// ============================================
// 8. COMPONENTES COMPUESTOS (COMPOUND) TIPADOS
// ============================================

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
}

interface OptionProps {
  value: string;
  children: React.ReactNode;
}

function Select({ value, onChange, children }: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  // Clonar children para pasar value
  const enhancedChildren = React.Children.map(children, child => {
    if (!React.isValidElement<OptionProps>(child)) return child;
    return React.cloneElement(child, { value: child.props.value });
  });

  return (
    <select value={value} onChange={handleChange}>
      {enhancedChildren}
    </select>
  );
}

function Option({ value, children }: OptionProps) {
  return <option value={value}>{children}</option>;
}

// Adjuntar Option a Select (namespace pattern)
Select.Option = Option;

// Uso:
// <Select value="1" onChange={v => console.log(v)}>
//   <Select.Option value="1">Uno</Select.Option>
//   <Select.Option value="2">Dos</Select.Option>
// </Select>

// ============================================
// 9. EXPORT/IMPORT TIPADOS
// ============================================

// Named exports
export function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick}>{children}</button>;
}

export function Input({ value, onChange, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input value={value} onChange={onChange} {...props} />;
}

// Default export
// export default function App() { ... }

// Re-export
export { Greeting, Farewell, Welcome };

// ============================================
// COMPONENTE DEMO
// ============================================

export default function ComponentsDemo() {
  const user: User = { id: 1, name: 'Ana', email: 'ana@test.com', postsCount: 5 };
  
  return (
    <section>
      <h1>Function Components TypeScript</h1>
      
      <Greeting name="Mundo" />
      <Farewell name="Mundo" />
      <Welcome name="Mundo" />
      
      <Profile name="Ana" age={25} city="Madrid" />
      <Profile name="Carlos" />
      <ProfileRenamed userName="Luis" userAge={30} />
      
      <Card title="Con Children">
        <p>Contenido children</p>
        <button>Botón</button>
      </Card>
      
      <UserDashboard user={user} />
      
      <FancyInput label="Email" type="email" placeholder="tu@email.com" />
      
      <ExpensiveComponent
        data={[{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]}
        onAction={id => console.log('Action:', id)}
      />
    </section>
  );
}