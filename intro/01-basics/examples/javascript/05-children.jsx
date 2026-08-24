/**
 * 05-children.jsx - Children y Composición Avanzada
 * 
 * children es una prop especial que contiene el contenido
 * pasado entre las etiquetas de apertura y cierre de un componente.
 */

import React from 'react';

// ============================================
// 1. CHILDREN BÁSICO
// ============================================

function Container({ children }) {
  return <div className="container">{children}</div>;
}

// Uso:
// <Container>
//   <h1>Título</h1>
//   <p>Contenido</p>
// </Container>

// ============================================
// 2. TIPOS DE CHILDREN
// ============================================

function ChildrenTypes({ children }) {
  console.log('Children recibido:', children);
  console.log('Tipo:', typeof children);
  console.log('Es array:', Array.isArray(children));
  
  return (
    <div>
      <h3>Análisis de Children:</h3>
      <pre>{JSON.stringify(children, null, 2)}</pre>
      <hr />
      <h3>Renderizado:</h3>
      <div className="rendered-children">{children}</div>
    </div>
  );
}

// Tipos posibles:
// - String: "texto"
// - Number: 123
// - Boolean: true/false (no renderizan)
// - null/undefined (no renderizan)
// - React Element: <Component />
// - Array: [<Comp1 />, <Comp2 />, "texto"]
// - Function: () => <div>...</div> (render props)

// ============================================
// 3. REACT.CHILDREN UTILITIES
// ============================================

function ChildrenUtilities({ children }) {
  // React.Children.count - cuenta elementos (ignora null/undefined/boolean)
  const count = React.Children.count(children);
  
  // React.Children.only - SOLO un hijo (lanza error si más de uno)
  // const onlyChild = React.Children.only(children);
  
  // React.Children.map - map que maneja opaque keys
  const mappedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, { 'data-index': index });
  });
  
  // React.Children.forEach - como map pero sin retorno
  React.Children.forEach(children, (child, index) => {
    console.log(`Child ${index}:`, child.type);
  });
  
  // React.Children.toArray - convierte a array plano con keys preservadas
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div>
      <h3>React.Children Utilities</h3>
      <p>Count: {count}</p>
      <p>Array length: {childrenArray.length}</p>
      <div>{mappedChildren}</div>
    </div>
  );
}

// ============================================
// 4. CLONEELEMENT - MODIFICAR CHILDREN
// ============================================

function CardGrid({ children, className = '' }) {
  // Clonar cada child y pasarle props extra
  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    
    return React.cloneElement(child, {
      // Props que se pasan a TODOS los children
      'data-grid-index': index,
      className: `${child.props.className || ''} grid-item`.trim(),
      // Sobrescribir o añadir handlers
      onClick: e => {
        child.props.onClick?.(e);
        console.log(`Card ${index} clicked`);
      }
    });
  });
  
  return <div className={`card-grid ${className}`}>{enhancedChildren}</div>;
}

function Card({ title, children, className, onClick }) {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}

// Uso:
// <CardGrid>
//   <Card title="Card 1">Contenido 1</Card>
//   <Card title="Card 2">Contenido 2</Card>
// </CardGrid>

// ============================================
// 5. SLOTS PATTERN (MÚLTIPLES CHILDREN NOMBRADOS)
// ============================================

function Layout({ header, sidebar, main, footer }) {
  return (
    <div className="layout">
      <header className="layout-header">{header}</header>
      <div className="layout-body">
        <aside className="layout-sidebar">{sidebar}</aside>
        <main className="layout-main">{main}</main>
      </div>
      <footer className="layout-footer">{footer}</footer>
    </div>
  );
}

// Uso:
// <Layout
//   header={<Header />}
//   sidebar={<Sidebar />}
//   main={<MainContent />}
//   footer={<Footer />}
// />

// ============================================
// 6. COMPONENTES CON SLOTS FLEXIBLES
// ============================================

function FlexibleCard({ 
  header, 
  body, 
  footer, 
  children, // fallback para contenido no slotted
  ...props 
}) {
  const hasSlots = header || body || footer;
  
  return (
    <div className="flexible-card" {...props}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">
        {body ?? children} {/* body tiene prioridad sobre children */}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// Uso con slots:
// <FlexibleCard
//   header={<h3>Título</h3>}
//   body={<p>Cuerpo principal</p>}
//   footer={<button>Acción</button>}
// />

// Uso con children (fallback):
// <FlexibleCard>
//   <p>Contenido simple</p>
// </FlexibleCard>

// ============================================
// 7. RECURSIVE COMPONENTS (ÁRBOLES)
// ============================================

function TreeNode({ node, level = 0 }) {
  const hasChildren = node.children && node.children.length > 0;
  
  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div className="tree-node">
        <span className="node-label">{node.label}</span>
        {hasChildren && (
          <button onClick={() => console.log('Toggle', node.id)}>
            {node.expanded ? '▼' : '▶'}
          </button>
        )}
      </div>
      {hasChildren && node.expanded && (
        <div className="tree-children">
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

const treeData = {
  id: 'root',
  label: 'Raíz',
  expanded: true,
  children: [
    { id: '1', label: 'Hijo 1', expanded: true, children: [
      { id: '1-1', label: 'Nieto 1.1' },
      { id: '1-2', label: 'Nieto 1.2' }
    ]},
    { id: '2', label: 'Hijo 2', children: [] },
    { id: '3', label: 'Hijo 3', expanded: false, children: [
      { id: '3-1', label: 'Nieto 3.1' }
    ]}
  ]
};

// ============================================
// 8. PORTALS (RENDER FUERA DEL DOM ACTUAL)
// ============================================

// import ReactDOM from 'react-dom';

function Modal({ isOpen, children, onClose }) {
  if (!isOpen) return null;
  
  // ReactDOM.createPortal(children, document.getElementById('modal-root'))
  // Renderiza children en #modal-root (fuera del root principal)
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

// ============================================
// 9. CONTEXT + CHILDREN (PROVIDER PATTERN)
// ============================================

const ThemeContext = React.createContext('light');

function ThemeProvider({ children, theme = 'light' }) {
  return (
    <ThemeContext.Provider value={theme}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = React.useContext(ThemeContext);
  return <button className={`btn-${theme}`}>Botón {theme}</button>;
}

// Uso:
// <ThemeProvider theme="dark">
//   <ThemedButton />
// </ThemeProvider>

// ============================================
// 10. COMPONENTES DE ORDEN SUPERIOR (HOC) CON CHILDREN
// ============================================

function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <div className="loading">Cargando...</div>;
    return <Component {...props} />;
  };
}

function withErrorBoundary(Component) {
  return function WithErrorBoundary({ fallback, ...props }) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Error: {this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function ChildrenDemo() {
  const [showModal, setShowModal] = React.useState(false);
  
  return (
    <section>
      <h1>Children & Composition</h1>
      
      <Container>
        <h2>Container Simple</h2>
        <p>Contenido pasado como children</p>
      </Container>
      
      <ChildrenTypes>
        <h3>Múltiples children</h3>
        <p>Párrafo 1</p>
        <p>Párrafo 2</p>
        <span>Span inline</span>
      </ChildrenTypes>
      
      <ChildrenUtilities>
        <div>Child 1</div>
        <span>Child 2</span>
        Texto directo
        <CustomComponent />
      </ChildrenUtilities>
      
      <CardGrid>
        <Card title="Card A">Contenido A</Card>
        <Card title="Card B">Contenido B</Card>
        <Card title="Card C">Contenido C</Card>
      </CardGrid>
      
      <Layout
        header={<h2>Header Slot</h2>}
        sidebar={<nav>Sidebar</nav>}
        main={<main>Main Content</main>}
        footer={<footer>Footer</footer>}
      />
      
      <FlexibleCard
        header={<h3>Título con Slot</h3>}
        body={<p>Cuerpo con slot body</p>}
        footer={<button>Acción Footer</button>}
      />
      
      <FlexibleCard>
        <p>Solo children (fallback)</p>
      </FlexibleCard>
      
      <TreeNode node={treeData} />
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h3>Modal con Portal</h3>
        <p>Este contenido se renderiza en modal-root</p>
      </Modal>
      <button onClick={() => setShowModal(true)}>Abrir Modal</button>
      
      <ThemeProvider theme="dark">
        <ThemedButton />
      </ThemeProvider>
    </section>
  );
}

function CustomComponent() {
  return <em>Componente personalizado</em>;
}