# Módulo 2: Estado y Eventos

## Conceptos Clave

### 1. useState - Estado Local
```jsx
const [count, setCount] = useState(0);
// setCount(nuevoValor) | setCount(prev => prev + 1)
```
- **Lazy initialization**: `useState(() => expensiveComputation())`
- **Functional updates**: `setCount(c => c + 1)` para evitar race conditions
- **Batching**: React 18+ agrupa actualizaciones automáticamente

### 2. useEffect - Side Effects
```jsx
useEffect(() => {
  // Setup
  return () => { /* Cleanup */ };
}, [dependencies]);
```
- **Sin deps**: Ejecuta cada render
- **Array vacío `[]`**: Solo mount/unmount
- **Con deps `[a, b]`**: Ejecuta cuando cambian
- **Cleanup**: Función retornada se ejecuta antes del siguiente effect o unmount

### 3. Event Handling
```jsx
// Synthetic Events (pooling en React 17-)
<button onClick={handleClick}>Click</button>
<input onChange={e => setValue(e.target.value)} />
```
- **SyntheticEvent**: Wrapper cross-browser nativo
- **Persistencia**: En React 18+ no hay pooling, eventos son persistentes
- **Tipos TS**: `React.MouseEvent<HTMLButtonElement>`, `React.ChangeEvent<HTMLInputElement>`, etc.

### 4. Formularios
- **Controlled**: `value` + `onChange` (React controla todo)
- **Uncontrolled**: `defaultValue` + `ref` (DOM controla)
- **Validación**: HTML5 nativa + custom

## Diferencias JS vs TS

| JavaScript | TypeScript |
|------------|------------|
| `useState(0)` | `useState<number>(0)` |
| `e.target.value` | `(e.target as HTMLInputElement).value` |
| `onClick={() => {}}` | `onClick={(e: React.MouseEvent) => {}}` |
| `ref = useRef()` | `ref = useRef<HTMLInputElement>(null)` |

## Archivos de Este Módulo

```
examples/
├── javascript/
│   ├── 01-useState-basics.jsx
│   ├── 02-useState-advanced.jsx
│   ├── 03-useEffect-basics.jsx
│   ├── 04-useEffect-advanced.jsx
│   ├── 05-event-handling.jsx
│   ├── 06-forms-controlled.jsx
│   └── 07-forms-uncontrolled.jsx
└── typescript/
    ├── 01-useState-basics.tsx
    ├── 02-useState-advanced.tsx
    ├── 03-useEffect-basics.tsx
    ├── 04-useEffect-advanced.tsx
    ├── 05-event-handling.tsx
    ├── 06-forms-controlled.tsx
    └── 07-forms-uncontrolled.tsx

exercises/
├── exercise-1.md    # Counter con useState
├── exercise-2.md    # Timer con useEffect
├── exercise-3.md    # Formulario controlado
└── exercise-4.md    # Formulario uncontrolled + ref

solutions/
├── exercise-1.jsx / .tsx
├── exercise-2.jsx / .tsx
├── exercise-3.jsx / .tsx
└── exercise-4.jsx / .tsx
```

## Checklist de Aprendizaje

- [ ] `useState`: valor inicial, updates funcionales, lazy init
- [ ] `useEffect`: mount, update, cleanup, dependency array
- [ ] Eventos: SyntheticEvent, tipos comunes, preventDefault
- [ ] Formularios controlados vs uncontrolled
- [ ] `useRef` para DOM access y valores mutables
- [ ] Patrones: debounce, throttle, fetch en useEffect

## Errores Comunes

❌ **Mal**: `setCount(count + 1)` en callbacks/efectos → ✅ **Bien**: `setCount(c => c + 1)`
❌ **Mal**: `useEffect(() => { fetch() }, [])` sin cleanup → ✅ **Bien**: AbortController en cleanup
❌ **Mal**: `onClick={handleClick()}` (ejecuta inmediato) → ✅ **Bien**: `onClick={handleClick}`
❌ **Mal**: Mutar estado: `items.push(new)` → ✅ **Bien**: `setItems([...items, new])`
❌ **Mal**: `useEffect` sin deps cuando usa vars externas → ✅ **Bien**: Incluir todas las deps

## Próximo Paso

→ [03-hooks](../03-hooks/README.md): Custom hooks, useRef, useContext, useReducer