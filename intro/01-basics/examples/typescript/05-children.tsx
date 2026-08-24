/**
 * 05-children.tsx - Children y Composición con TypeScript
 */

import React from 'react';

// ============================================
// 1. CHILDREN TIPADO BÁSICO
// ============================================

interface ContainerProps {
  children: React.ReactNode;  // Tipo más flexible
}

function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>;
}

// Tipos alternativos para children:
interface StrictChildrenProps {
  children: React.ReactElement;           // Exactamente un elemento
}

interface ArrayChildrenProps {
  children: React.ReactElement[];         // Array de elementos
}

interface RenderPropChildrenProps {
  children: (props: { index: number }) => React.ReactNode;  // Render prop
}

// ============================================
// 2. REACT.CHILDREN UTILITIES TIPADAS
// ============================================

function ChildrenUtilities({ children }: { children: React.ReactNode }) {
  // React.Children.count - retorna number
  const count: number = React.Children.count(children);
  
  // React.Children.only - retorna ReactElement (lanza error si no es 1)
  // const onlyChild: React.ReactElement = React.Children.only(children);
  
  // React.Children.map - retorna array
  const mapped: React.ReactNode[] = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    // cloneElement preserva tipos
    return React.cloneElement(child, { 'data-index': index } as any);
  });
  
  // React.Children.forEach - void
  React.Children.forEach(children, (child, index) => {
    console.log(`Child ${index}:`, child);
  });
  
  // React.Children.toArray - ReactNode[]
  const childrenArray: React.ReactNode[] = React.Children.toArray(children);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Array length: {childrenArray.length}</p>
      <div>{mapped}</div>
    </div>
  );
}

// ============================================
// 3. CLONEELEMENT TIPADO
// ============================================

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function Card({ title, children, className, onClick }: CardProps) {
  return (
    <div className={`card ${className ?? ''}`} onClick={onClick}>
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}

interface CardGridProps {
  children: React.ReactElement<CardProps> | React.ReactElement<CardProps>[];
  className?: string;
}

function CardGrid({ children, className }: CardGridProps) {
  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement<CardProps>(child)) return child;
    
    // React.cloneElement tipado
    return React.cloneElement<CardProps>(child, {
      'data-grid-index': index,
      className: `${child.props.className ?? ''} grid-item`.trim(),
      onClick: () => {
        child.props.onClick?.();
        console.log(`Card ${index} clicked`);
      }
    });
  });
  
  return <div className={`card-grid ${className ?? ''}`}>{enhancedChildren}</div>;
}

// ============================================
// 4. SLOTS PATTERN TIPADO
// ============================================

interface LayoutProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  main: React.ReactNode;
  footer: React.ReactNode;
}

function Layout({ header, sidebar, main, footer }: LayoutProps) {
  return (
    <div className="layout">
      <header>{header}</header>
      <div className="body">
        <aside>{sidebar}</aside>
        <main>{main}</main>
      </div>
      <footer>{footer}</footer>
    </div>
  );
}

// ============================================
// 5. FLEXIBLE SLOTS CON FALLBACK
// ============================================

interface FlexibleCardProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;  // Fallback
  className?: string;
}

function FlexibleCard({ 
  header, 
  body, 
  footer, 
  children, 
  className 
}: FlexibleCardProps) {
  const hasSlots = header || body || footer;
  
  return (
    <div className={`flexible-card ${className ?? ''}`}>
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">
        {body ?? children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// ============================================
// 6. RECURSIVE COMPONENTS TIPADOS
// ============================================

interface TreeNodeData {
  id: string;
  label: string;
  expanded?: boolean;
  children?: TreeNodeData[];
}

interface TreeNodeProps {
  node: TreeNodeData;
  level?: number;
}

// Componente recursivo tipado
function TreeNode({ node, level = 0 }: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0;
  
  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div className="tree-node">
        <span>{node.label}</span>
        {hasChildren && (
          <button onClick={() => console.log('Toggle', node.id)}>
            {node.expanded ? '▼' : '▶'}
          </button>
        )}
      </div>
      {hasChildren && node.expanded && (
        <div className="tree-children">
          {node.children!.map(child => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

const treeData: TreeNodeData = {
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
// 7. CONTEXT + CHILDREN TIPADO
// ============================================

type Theme = 'light' | 'dark';

const ThemeContext = React.createContext<Theme>('light');

interface ThemeProviderProps {
  theme: Theme;
  children: React.ReactNode;
}

function ThemeProvider({ theme, children }: ThemeProviderProps) {
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

// ============================================
// 8. HIGHER-ORDER COMPONENTS TIPADOS
// ============================================

// HOC que inyecta loading
function withLoading<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithLoadingComponent({ 
    isLoading, 
    ...props 
  }: P & { isLoading?: boolean }) {
    if (isLoading) return <div className="loading">Cargando...</div>;
    return <Component {...props} />;
  };
}

// HOC con Error Boundary
interface WithErrorBoundaryProps {
  fallback?: React.ReactNode;
}

function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithErrorBoundaryComponent({ 
    fallback, 
    ...props 
  }: P & WithErrorBoundaryProps) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div>Error: {this.state.error?.message}</div>
      );
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
      <h1>Children & Composition TypeScript</h1>
      
      <Container>
        <h2>Container</h2>
        <p>Children tipado</p>
      </Container>
      
      <ChildrenUtilities>
        <div>Child 1</div>
        <span>Child 2</span>
        Texto directo
      </ChildrenUtilities>
      
      <CardGrid>
        <Card title="Card A" key="a">Contenido A</Card>
        <Card title="Card B" key="b">Contenido B</Card>
        <Card title="Card C" key="c">Contenido C</Card>
      </CardGrid>
      
      <Layout
        header={<h2>Header</h2>}
        sidebar={<nav>Sidebar</nav>}
        main={<main>Main</main>}
        footer={<footer>Footer</footer>}
      />
      
      <FlexibleCard
        header={<h3>Slot Header</h3>}
        body={<p>Slot Body</p>}
        footer={<button>Slot Footer</button>}
      />
      
      <FlexibleCard>
        <p>Solo children (fallback)</p>
      </FlexibleCard>
      
      <TreeNode node={treeData} />
      
      <ThemeProvider theme="dark">
        <ThemedButton />
      </ThemeProvider>
      
      <button onClick={() => setShowModal(true)}>Mostrar Modal</button>
    </section>
  );
}