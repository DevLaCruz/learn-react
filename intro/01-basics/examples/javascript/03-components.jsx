/**
 * 03-components.jsx - Function Components Básicos
 * 
 * Los Function Components son la forma moderna y recomendada
 * de crear componentes en React (desde Hooks en React 16.8).
 */

import React from 'react';

// ============================================
// 1. COMPONENTE MÁS SIMPLE
// ============================================

// Function declaration (hoisted, puede usarse antes de declararse)
function Greeting() {
  return <h1>¡Hola, Mundo!</h1>;
}

// Arrow function (no hoisted, const/let)
const Farewell = () => {
  return <h1>¡Adiós, Mundo!</h1>;
};

// Arrow function implícita (return implícito con paréntesis)
const Welcome = () => (
  <h1>¡Bienvenido!</h1>
);

// Uso: <Greeting /> <Farewell /> <Welcome />

// ============================================
// 2. COMPONENTES CON PROPS
// ============================================

// Props como parámetro único (objeto)
function Profile(props) {
  // props es un objeto: { name: 'Ana', age: 25, city: 'Madrid' }
  return (
    <div className="profile">
      <h2>{props.name}</h2>
      <p>Edad: {props.age}</p>
      <p>Ciudad: {props.city}</p>
    </div>
  );
}

// Destructuring en parámetros (RECOMENDADO)
function ProfileDestructured({ name, age, city }) {
  return (
    <div className="profile">
      <h2>{name}</h2>
      <p>Edad: {age}</p>
      <p>Ciudad: {city}</p>
    </div>
  );
}

// Destructuring con valores por defecto
function ProfileWithDefaults({ name = 'Anónimo', age = 0, city = 'Desconocida' }) {
  return (
    <div className="profile">
      <h2>{name}</h2>
      <p>Edad: {age}</p>
      <p>Ciudad: {city}</p>
    </div>
  );
}

// Renombrar props al desestructurar
function ProfileRenamed({ name: userName, age: userAge }) {
  return <div>Usuario: {userName}, Edad: {userAge}</div>;
}

// ============================================
// 3. COMPONENTES CON CHILDREN
// ============================================

// children es una prop especial: contenido entre etiquetas
function Card({ title, children }) {
  return (
    <div className="card">
      <header className="card-header">
        <h3>{title}</h3>
      </header>
      <div className="card-body">
        {children}  {/* Renderiza lo que pase entre <Card>...</Card> */}
      </div>
      <footer className="card-footer">
        <small>Pie de tarjeta</small>
      </footer>
    </div>
  );
}

// Uso:
// <Card title="Mi Tarjeta">
//   <p>Contenido interno</p>
//   <button>Acción</button>
// </Card>

// Múltiples "slots" con props nombradas
function Layout({ header, sidebar, main, footer }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{main}</main>
      <footer>{footer}</footer>
    </div>
  );
}

// ============================================
// 4. COMPOSICIÓN DE COMPONENTES
// ============================================

// Componente contenedor que usa otros componentes
function UserDashboard({ user }) {
  return (
    <div className="dashboard">
      <Header user={user} />
      <Navigation />
      <main>
        <UserProfile user={user} />
        <UserStats user={user} />
        <UserActivity user={user} />
      </main>
      <Footer />
    </div>
  );
}

function Header({ user }) {
  return <header>Bienvenido, {user.name} | <LogoutButton /></header>;
}

function Navigation() {
  return <nav><a href="#perfil">Perfil</a> | <a href="#config">Config</a></nav>;
}

function UserProfile({ user }) {
  return <section><h2>Perfil de {user.name}</h2></section>;
}

function UserStats({ user }) {
  return <section><h3>Estadísticas</h3><p>Posts: {user.postsCount}</p></section>;
}

function UserActivity({ user }) {
  return <section><h3>Actividad Reciente</h3><ActivityList userId={user.id} /></section>;
}

function ActivityList({ userId }) {
  return <ul><li>Actividad 1</li><li>Actividad 2</li></ul>;
}

function LogoutButton() {
  return <button onClick={() => alert('Logout')}>Cerrar Sesión</button>;
}

function Footer() {
  return <footer>© 2024 Mi App</footer>;
}

// ============================================
// 5. COMPONENTES COMO PROPS (RENDER PROPS BÁSICO)
// ============================================

function DataFetcher({ url, render }) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, [url]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return render(data);  // render es una función que recibe data
}

// Uso:
// <DataFetcher url="/api/user" render={data => <UserProfile user={data} />} />

// ============================================
// 6. FRAGMENTS EN COMPONENTES
// ============================================

function TableRow({ children }) {
  // Fragment permite retornar múltiples <td> sin wrapper extra
  return (
    <>
      <td>{children}</td>
      <td><button className="btn-edit">Editar</button></td>
      <td><button className="btn-delete">Eliminar</button></td>
    </>
  );
}

// ============================================
// 7. HOISTING Y ORDEN DE DECLARACIÓN
// ============================================

// Function declarations: SÍ se hoistean (pueden usarse antes)
function ComponentA() { return <ComponentB />; }
function ComponentB() { return <div>B</div>; }

// Arrow functions: NO se hoistean (deben declararse antes)
// const ComponentC = () => <ComponentD />; // Error si D no existe aún
// const ComponentD = () => <div>D</div>;

// ============================================
// 8. EXPORT/IMPORT
// ============================================

// Named exports (múltiples por archivo)
export function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

export function Input({ value, onChange, ...props }) {
  return <input value={value} onChange={onChange} {...props} />;
}

// Default export (uno por archivo)
// export default function App() { ... }

// Re-export
export { Greeting, Farewell, Welcome };

// ============================================
// COMPONENTE DEMO PRINCIPAL
// ============================================

export default function ComponentsDemo() {
  return (
    <section>
      <h1>Function Components</h1>
      
      <Greeting />
      <Farewell />
      <Welcome />
      
      <Profile name="Ana" age={25} city="Madrid" />
      <ProfileDestructured name="Carlos" age={30} city="Barcelona" />
      <ProfileWithDefaults />
      <ProfileWithDefaults name="Luis" />
      
      <Card title="Tarjeta con Children">
        <p>Este es el contenido children</p>
        <button>Botón dentro</button>
      </Card>
      
      <Layout
        header={<Header user={{ name: 'Admin' }} />}
        sidebar={<Navigation />}
        main={<UserProfile user={{ name: 'Test', postsCount: 5 }} />}
        footer={<Footer />}
      />
    </section>
  );
}