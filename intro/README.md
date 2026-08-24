# React Fundamentals - Guía Educativa Completa

## Acerca de Este Repositorio

Este directorio (`intro/`) contiene una guía **progresiva y completa** para aprender React desde cero, diseñada específicamente como material educativo para un curso de React + TypeScript + Vite. Incluye:

- **Ejemplos comentados** en JavaScript y TypeScript
- **Ejercicios prácticos** con sus soluciones
- **Patrones modernos de React**
- **Cobertura completa** desde fundamentos hasta temas avanzados

## Estructura del Curso

El repositorio está organizado en 5 módulos progresivos:

| Módulo | Tema | Enfoque |
|--------|------|---------|
| **01-basics** | Fundamentos de React | Elements, JSX, Components, Props, Children |
| **02-state-and-events** | Estado y Eventos | useState, useEffect, Event Handling, Forms |
| **03-hooks** | Hooks Avanzados | Custom Hooks, useRef, useContext, useReducer |
| **04-component-patterns** | Patrones de Componentes | Composition, HOC, Render Props, Compound Components |
| **05-advanced** | Temas Avanzados | Context API, Performance, Testing, Type Patterns |

## Estructura por Módulo

Cada módulo sigue una estructura consistente:

```
XX-module-name/
├── README.md           # Explicación teórica detallada del módulo
├── examples/           # Ejemplos de código comentados
│   ├── javascript/     # Versión JavaScript (archivos .jsx o .js)
│   └── typescript/     # Versión TypeScript (archivos .tsx o .ts)
├── exercises/          # Ejercicios para practicar (archivos .md)
│   ├── exercise-1.md
│   ├── exercise-2.md
│   └── exercise-3.md (y así sucesivamente)
└── solutions/          # Soluciones comentadas (archivos .jsx/.tsx/.js/.ts)
    ├── exercise-1.jsx / .tsx
    ├── exercise-2.jsx / .tsx
    └── ...
```

### Ejemplo de Estructura Completa: 01-basics

```
01-basics/
├── README.md           # Fundamentos teóricos + checklist + errores comunes
├── examples/
│   ├── javascript/
│   │   ├── 01-react-elements.jsx
│   │   ├── 02-jsx-syntax.jsx
│   │   ├── 03-components.jsx
│   │   ├── 04-props.jsx
│   │   ├── 05-children.jsx
│   │   └── 06-lists-keys.jsx
│   └── typescript/
│       ├── 01-react-elements.tsx
│       ├── 02-jsx-syntax.tsx
│       ├── 03-components.tsx
│       ├── 04-props.tsx
│       ├── 05-children.tsx
│       └── 06-lists-keys.tsx
├── exercises/
│   ├── exercise-1.md   # ProfileCard
│   ├── exercise-2.md   # Task List
│   ├── exercise-3.md   # Button
│   └── exercise-4.md   # Card Composable
└── solutions/
    ├── exercise-1.jsx / .tsx   # ProfileCard solución
    ├── exercise-2.jsx / .tsx   # Task List solución
    ├── exercise-3.tsx          # Button solución
    └── exercise-4.tsx          # Card Composable solución
```

## Módulo por Módulo

### 📚 01-basics: Fundamentos de React

**Qué aprenderás:**
- React Elements vs JSX
- Function Components y Props
- Children y composición
- Listas con keys
- Diferencias JS vs TS

**Archivos clave:**
- `examples/javascript/01-react-elements.jsx` - createElement vs JSX
- `examples/typescript/01-react-elements.tsx` - Versión TypeScript
- `exercise-1.md` - ProfileCard (crear componente)
- `solutions/exercise-1.tsx` - Solution

### 📚 02-state-and-events: Estado y Eventos

**Qué aprenderás:**
- useState (lazy init, functional updates, derived state)
- useEffect (mount, cleanup, dependencies, AbortController)
- Event handling (SyntheticEvents, delegation, preventDefault)
- Formularios controlados vs uncontrolled
- Custom hooks básicos

**Archivos clave:**
- `examples/javascript/01-useState-basics.jsx` a `07-forms-uncontrolled.jsx`
- `examples/typescript/01-useState-basics.tsx` a `07-forms-uncontrolled.tsx`
- `exercise-1.md` - State Machine
- `exercise-2.md` - Custom Hooks (useFetch, useTimer, useLocalStorage)
- `exercise-3.md` - Formularios Complejos
- `exercise-4.md` - Performance Optimization
- `solutions/exercise-1.tsx` - State Machine solución
- `solutions/exercise-2.tsx` - Custom Hooks solución
- etc.

### 📚 03-hooks: Hooks Avanzados

**Qué aprenderás:**
- Custom Hooks patrón
- useRef para valores mutables sin re-render
- useContext y Context API
- useReducer para lógica compleja
- useMemo y useCallback para performance
- Patrones: debounce, throttle, intersection observer

### 📚 04-component-patterns: Patrones de Componentes

**Qué aprenderás:**
- Composition sobre herencia
- Higher-Order Components (HOC)
- Render Props pattern
- Compound Components (select/option pattern)
- Slot pattern y flexibles

### 📚 05-advanced: Temas Avanzados

**Qué aprenderás:**
- Context API (Provider/Consumer patterns)
- Performance optimization (memo, useMemo, useCallback)
- Testing basics con React Testing Library
- TypeScript patterns avanzados
- Error boundaries y portales

## Cómo Usar Esta Guía

### Opción 1: Solo Lectura (Recomendado para empezar)
1. Comienza por [`01-basics/README.md`](./01-basics/README.md)
2. Lee el README de cada módulo para entender los conceptos
3. Estudia los ejemplos (empieza por JavaScript, luego TypeScript)
4. Intenta los ejercicios sin mirar las soluciones
5. Compara tus soluciones con las proporcionadas

### Opción 2: Ejecutar los Ejemplos

**Requisitos previos:**
- Node.js 18+
- npm o bun

```bash
# Desde la raíz del proyecto intro/
cd /mnt/Datos/NodejsProjects/LearnReactAndTanstack/intro

# Opción A: Crear proyecto Vite (recomendado)
npm create vite@latest react-playground -- --template react-ts
cd react-playground
npm install

# Copiar ejemplos a src/ y probar
npm run dev

# O copiar ejercicios a src/components/
# Opción B: CodeSandbox / StackBlitz
# Simplemente abre cualquier archivo .jsx o .tsx en CodeSandbox
```

### Opción 3: Con tu IDE
- Abre el directorio `intro/` en VS Code / WebStorm
- Los ejemplos tienen comentarios explicativos línea por línea
- Los ejercicios tienen especificaciones claras

## Prerrequisitos

### JavaScript ES6+
- Arrow functions: `(x) => x + 1`
- Destructuring: `const {a, b} = obj`
- Modules: `import/export`
- Spread operator: `...arr`
- Template literals: `` `hola ${name}` ``

### TypeScript Básico (para ejemplos .ts/.tsx)
- Types e interfaces
- Generics: `<T>`
- Union types: `'a' | 'b'`
- Readonly arrays: `readonly number[]`
- Nullable types: `string | null`

### HTML/CSS Básico
- Box model
- Flexbox
- Selectores CSS

## Convenciones de Código

### Nomenclatura
- **Componentes**: `UserProfile`, `handleClick` (PascalCase para componentes, camelCase para funciones)
- **Archivos**: `useState-basics.jsx`, `ProfileCard.tsx` (kebab-case o camelCase)
- **Ejercicios**: `exercise-1.md`, `StateMachine.tsx`

### Estilo de Código
- **Comentarios educativos**: Cada línea clave está explicada
- **Componentes funcionales**: Siempre que sea posible
- **Tipos TypeScript**: Definidos explícitamente en archivos .tsx
- **Archivos .jsx vs .tsx**: `.jsx` cuando hay JSX puro, `.tsx` cuándo se usa TypeScript

### Patrones Enfatizados
- **Composition sobre herencia**
- **Custom Hooks** para lógica reutilizable
- **Funcional updates** en useState
- **Cleanup** en useEffect
- **Accessibility** (aria-label, aria-describedby, roles apropiados)

## Guía de Progreso Recomendado

| Semana | Módulo | Objetivos |
|--------|--------|-----------|
| **1** | 01-basics | Fundamentos completos + 4 ejercicios |
| **2** | 02-state-and-events | Estado + eventos + 4 ejercicios |
| **3** | 03-hooks | Custom hooks + 3 ejercicios |
| **4** | 04-component-patterns | Patrones + 3 ejercicios |
| **5** | 05-advanced | Temas avanzados + mini-proyecto final |

**Al finalizar las 5 semanas:** Tendrás los conocimientos fundamentales para:
- Crear aplicaciones React completas
- Usar TypeScript de manera efectiva
- Optimizar performance
- Escribir código mantenible y testable
- Entender los patrones modernos de React

## Recursos Adicionales

### Oficiales
- [React Official Tutorial](https://react.dev/learn) - El tutorial oficial interactivo
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Handbook completo
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) - Guía visual
- [Vite Docs](https://vitejs.dev/guide/) - Build tooling

### Herramientas
- [React DevTools](https://react.dev/learn#introducing-react-devtools) - Inspeccionar estado y renders
- [Vite](https://vitejs.dev/) - Dev server y build rápido
- [ESLint + Prettier](https://prettier.io/) - Linting y formato
- [Testing Library](https://testing-library.com/) - Testing de componentes

### Patterns Avanzados
- [Understanding useCallback and useMemo](https://overreacted.io/zh/understanding-react-usecallback-and-usememo/)
- [Advanced React Patterns](https://www.tanstack.com/blog/react-patterns)
- [Context API Best Practices](https://react.dev/learn/sharing-state-between-components)

## Problemas Comunes y Soluciones

### "Mi state no se actualiza"
**Causa:** Mutación directa del state o async setState
**Solución:** Usar functional updates: `setCount(c => c + 1)`

### "El efecto se ejecuta infinitamente"
**Causa:** Faltan dependencies en el array o cleanup missing
**Solución:** Revisar deps y siempre retornar cleanup function

### "No puedo acceder al DOM del hijo"
**Causa:** forwardRef no usado
**Solución:** `const Child = forwardRef((props, ref) => ...)`

### "Los forms no validan"
**Causa:** Control vs Uncontrolled confusion
**Solución:** Decidir híbrido o elegir uno y mantenerlo consistente

## Contribuir

Si quieres agregar más contenido a este repositorio educativo:

1. **Fork** el repositorio
2. **Crea una nueva rama** (`git checkout -b feature/nuevo-modulo`)
3. **Agrega tus ejercicios/soluciones** siguiendo la convención existente
4. **Haz commit** (`git commit -m 'Add: nuevo módulo educativo'`)
5. **Push** y crea un Pull Request

## Licencia

Este repositorio es para fines educativos. Puedes usar el contenido para:
- Aprender React por tu cuenta
- Enseñar a otros
- Referencia personal

No se permite el uso comercial sin autorización.

---

**¡Empieza por [01-basics/README.md](./01-basics/README.md)!**

*Esta guía fue creada como material educativo para aprender React + TypeScript + Vite de manera estructurada y progresiva.*