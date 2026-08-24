# Módulo 1: Fundamentos de React

## Conceptos Clave

### 1. React Elements (Elementos de React)
- **Qué son**: Objetos JavaScript planos que describen qué se debe renderizar
- **Inmutables**: Una vez creados, no cambian
- **Creación**: `React.createElement(type, props, ...children)` o JSX

```jsx
// Estos dos son equivalentes:
React.createElement('h1', { className: 'title' }, 'Hola')
<h1 className="title">Hola</h1>
```

### 2. JSX (JavaScript XML)
- **Sintaxis**: Extensión de JavaScript que permite escribir HTML-like en JS
- **Transformación**: Babel convierte JSX → `React.createElement()`
- **Reglas**:
  - Un solo elemento raíz (o Fragment `<>...</>`)
  - `className` en lugar de `class`
  - `htmlFor` en lugar de `for`
  - Expresiones JS entre `{}`
  - Atributos en camelCase: `onClick`, `tabIndex`

### 3. Components (Componentes)
- **Function Components** (Modernos, recomendados):
  ```jsx
  function Welcome({ name }) {
    return <h1>Hola, {name}</h1>;
  }
  ```
- **Props**: Entrada de datos (solo lectura, inmutables)
- **Children**: Contenido pasado entre etiquetas de apertura/cierre

### 4. Composition (Composición)
- Componentes anidados: `<Card><Button /></Card>`
- `props.children` para contenido flexible
- Reutilización sobre herencia

## Diferencias JS vs TS

| JavaScript | TypeScript |
|------------|------------|
| `function Button({ onClick, children })` | `interface ButtonProps { onClick: () => void; children: React.ReactNode; }` |
| `PropTypes` (runtime) | Interfaces (compile-time) |
| Sin autocompletado | Autocompletado completo |
| Errores en runtime | Errores en compile-time |

## Archivos de Este Módulo

```
examples/
├── javascript/
│   ├── 01-react-elements.jsx    # createElement vs JSX
│   ├── 02-jsx-syntax.jsx        # Reglas JSX completas
│   ├── 03-components.jsx        # Function components básicos
│   ├── 04-props.jsx             # Props, defaultProps, destructuring
│   ├── 05-children.jsx          # children, composición
│   └── 06-lists-keys.jsx        # Listas, keys, map
└── typescript/
    ├── 01-react-elements.tsx
    ├── 02-jsx-syntax.tsx
    ├── 03-components.tsx
    ├── 04-props.tsx
    ├── 05-children.tsx
    └── 06-lists-keys.tsx

exercises/
├── exercise-1.md    # Crear componente ProfileCard
├── exercise-2.md    # Lista de tareas con keys
├── exercise-3.md    # Componente Button reutilizable
└── exercise-4.md    # Card con children flexible

solutions/
├── exercise-1.jsx / .tsx
├── exercise-2.jsx / .tsx
├── exercise-3.jsx / .tsx
└── exercise-4.jsx / .tsx
```

## Checklist de Aprendizaje

- [ ] Entender qué es un React Element
- [ ] Escribir JSX correctamente (className, htmlFor, camelCase)
- [ ] Crear Function Components
- [ ] Pasar y recibir props
- [ ] Usar `props.children` para composición
- [ ] Renderizar listas con `map()` y `key` única
- [ ] Destructuring de props en parámetros
- [ ] Diferencia entre props y state (próximo módulo)

## Errores Comunes

❌ **Mal**: `<div class="container">` → ✅ **Bien**: `<div className="container">`
❌ **Mal**: `<label for="input">` → ✅ **Bien**: `<label htmlFor="input">`
❌ **Mal**: `key={index}` en listas dinámicas → ✅ **Bien**: `key={item.id}`
❌ **Mal**: Mutar props: `props.name = 'Nuevo'` → ✅ **Bien**: Props son readonly
❌ **Mal**: Múltiples elementos raíz sin Fragment → ✅ **Bien**: `<>...</>` o `<React.Fragment>`

## Próximo Paso

→ [02-state-and-events](../02-state-and-events/README.md): useState, useEffect, manejo de eventos y formularios