# React + Vite Projects Overview - LearnReactAndTanstack Workspace

Este documento describe **todos los proyectos React + Vite** (y el backend NestJS) que componen el workspace `/mnt/Datos/NodejsProjects/LearnReactAndTanstack/`. Cada proyecto tiene un propósito educativo o funcional específico.

---

## 📁 Estructura General del Workspace

```
/mnt/Datos/NodejsProjects/LearnReactAndTanstack/
├── first-app/           # Primeros pasos con React + TypeScript + Vite
├── gifs-app-react/      # Aplicación de búsqueda de GIFs (Giphy API)
├── hooks-app/           # Ejemplos exhaustivos de Hooks de React
├── intro/               # 📚 ESTA CARPETA - Guía educativa completa (5 módulos)
├── nest-heroes-backend/ # Backend NestJS (API REST para heroes)
├── review/              # Proyecto de revisión/consolidación
└── spa-project/         # Single Page Application completa (Heroes SPA)
```

---

## 🔍 Detalle de Cada Proyecto

### 1. `first-app` — Primeros Pasos Básicos
**Propósito:** Proyecto base mínimo para aprender la configuración inicial de **React + TypeScript + Vite** desde cero.

**Qué contiene:**
- Configuración mínima: `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`
- Componentes básicos: `FirstSteps.tsx`, `MyAwesomeApp.tsx`
- Tests unitarios con Vitest + React Testing Library (`*.test.tsx`)
- Helpers de ejemplo: `math.helper.ts` + test
- Mini proyecto: `shopping-cart/ItemCounter.tsx` con test y snapshot

**Justificación educativa:**
- **Punto de partida ideal**: Todo lo esencial para arrancar un proyecto React moderno
- **Testing desde el inicio**: Incluye Vitest, React Testing Library, snapshots
- **TypeScript nativo**: Configuración estricta desde el primer archivo
- **Estructura limpia**: Separa componentes, helpers, assets, tests

**Cuándo usarlo:** Primera vez que montas un proyecto React + Vite + TS. Base para copiar/pegar.

---

### 2. `gifs-app-react` — Consumo de API Externa (Giphy)
**Propósito:** Aplicación completa que consume la **API de Giphy** para buscar y mostrar GIFs animados.

**Qué contiene:**
- Estructura por features: `gifs/`, `counter/`, `shared/`, `mock-data/`
- Componente principal `GifsApp.tsx` + test
- Uso de **custom hooks** para fetch de datos (`useGifs`, etc.)
- Manejo de estados: loading, error, data
- Mock data para testing y desarrollo offline
- Tests con snapshots

**Justificación educativa:**
- **API real**: Aprende a integrar APIs REST externas (Giphy)
- **Custom hooks**: Patrón `useGifs` para lógica de datos reutilizable
- **Estados asíncronos**: loading/error/data en componentes reales
- **Testing de hooks**: Cómo testear custom hooks con fetch
- **Arquitectura por features**: Separación clara de responsabilidades

**Cuándo usarlo:** Cuando necesites aprender consumo de APIs, custom hooks para data fetching, y testing de componentes con datos asíncronos.

---

### 3. `hooks-app` — Catálogo Exhaustivo de Hooks
**Propósito:** **Referencia completa** de todos los hooks de React (built-in + avanzados + experimentales) con ejemplos funcionales.

**Qué contiene (estructura por carpetas numeradas):**
```
src/
├── 01-useState/          # useState básico y avanzado
├── 02-useEffect/         # useEffect, cleanup, dependencias
├── 03-examples/          # Ejemplos combinados
├── 04-useRef/            # useRef para DOM y valores mutables
├── 05-useReducer/        # useReducer para lógica compleja
├── 06-memos/             # useMemo, useCallback, React.memo
├── 07-useOptimistic/     # useOptimistic (React 19 experimental)
├── 08-use-suspense/      # use + Suspense patterns
├── 09-useContext/        # Context API + useContext
├── api/                  # Helpers para API calls
├── components/           # UI components reutilizables
└── lib/                  # Utilities
```

**Justificación educativa:**
- **Cobertura 100%**: Todos los hooks oficiales + experimentales
- **Progresión lógica**: De básico (useState) a avanzado (useOptimistic)
- **Ejemplos aislados**: Cada hook en su carpeta con demo funcional
- **Patrones reales**: No solo "hola mundo", casos de uso reales
- **TypeScript estricto**: Tipado correcto en cada hook

**Cuándo usarlo:** Como **diccionario de consulta** cuando dudes sobre algún hook. Ideal para repasar antes de entrevistas técnicas.

---

### 4. `review` — Proyecto de Consolidación/Repaso
**Propósito:** Aplicación que **integra todo lo aprendido** en un solo proyecto cohesivo: Context, Hooks personalizados, TypeScript avanzado, Components.

**Qué contiene:**
- `context/` - Context API para estado global
- `hooks/` - Custom hooks reutilizables
- `components/` - Componentes UI compuestos
- `typescript/` - Tipos avanzados, generics, utility types
- App principal integrando todo: `App.tsx`

**Justificación educativa:**
- **Integración real**: No ejemplos aislados, sino app cohesionada
- **Arquitectura escalable**: Context + Hooks + Components pattern
- **TypeScript avanzado**: Generics, conditional types, mapped types
- **Repaso final**: Valida que dominas todos los conceptos previos

**Cuándo usarlo:** Después de completar los módulos 01-03 de `intro/`, para ver cómo encajan las piezas en una app real.

---

### 5. `spa-project` — Single Page Application Completa (Heroes SPA)
**Propósito:** **Proyecto final de grado** - SPA completa con routing, estado servidor, testing exhaustivo, arquitectura por features.

**Qué contiene:**
```
src/
├── heroes/
│   ├── api/              # Axios instance + interceptors
│   ├── actions/          # Server Actions (getHero, getHeroesByPage, getSummary)
│   ├── components/       # UI components (HeroCard, HeroList, etc.)
│   ├── context/          # Global state (Auth, Theme, etc.)
│   ├── hooks/            # usePaginatedHero, useHeroSummary
│   ├── layouts/          # Layouts (MainLayout, AuthLayout)
│   ├── pages/            # Pages (Home, HeroDetail, Login, etc.)
│   └── types/            # TypeScript interfaces
├── router/               # React Router v7 config
├── admin/                # Panel de administración
└── main.test.tsx         # Test smoke
```

**Testing exhaustivo (7 archivos):**
- `hero.api.test.ts` - Configuración Axios
- `get-hero.action.test.ts` - Server actions + error handling
- `get-heroes-by-page.action.test.ts` - Mocking Axios + params
- `get-summary.action.test.ts` - Response shape validation
- `usePaginatedHero.test.tsx` - React Query + renderHook
- `useHeroSummary.test.tsx` - React Query + error states
- `main.test.tsx` - Smoke test

**Justificación educativa:**
- **Arquitectura profesional**: Feature-based, separation of concerns
- **Server Actions**: Patrón moderno para mutaciones de datos
- **React Query (TanStack Query)**: Server state management
- **Testing real**: Mocking, integration tests, hook testing
- **Routing avanzado**: Layouts, protected routes, lazy loading
- **Backend real**: Conecta con `nest-heroes-backend`

**Cuándo usarlo:** Proyecto capstone. Demuestra dominio completo: routing, state management, testing, API integration, TypeScript.

---

### 6. `nest-heroes-backend` — Backend API (NestJS)
**Propósito:** **API REST** que sirve datos a `spa-project` y `gifs-app-react`. No es React, pero es esencial para el ecosistema.

**Qué contiene:**
- NestJS framework (Node.js + TypeScript)
- Entidades: Hero, User, etc.
- Endpoints REST: CRUD completo para heroes
- Autenticación JWT (login, register, guards)
- Base de datos (TypeORM/Prisma)
- Tests unitarios + e2e
- Swagger/OpenAPI documentation

**Justificación educativa:**
- **Full-stack real**: Frontend + Backend comunicándose
- **NestJS patterns**: Modules, Controllers, Services, Guards, Pipes
- **TypeScript end-to-end**: Tipos compartidos entre frontend/backend
- **Auth JWT**: Login, registro, protected routes
- **Documentación automática**: Swagger UI

**Cuándo usarlo:** Cuando necesites backend real para tus apps React. Corre en `npm run start:dev` (puerto 3001).

---

### 7. `intro/` — Guía Educativa Estructurada (ESTA CARPETA)
**Propósito:** **Curso progresivo de 5 módulos** desde cero hasta avanzado, con teoría, ejemplos JS/TS, ejercicios y soluciones.

**Estructura completa:**
```
intro/
├── README.md                    # Este archivo
├── 01-basics/                   # Fundamentos: Elements, JSX, Props, Children
│   ├── README.md
│   ├── examples/javascript/     # 6 archivos .jsx comentados
│   ├── examples/typescript/     # 6 archivos .tsx comentados
│   ├── exercises/               # 4 ejercicios (.md)
│   └── solutions/               # 4 soluciones (.jsx + .tsx)
├── 02-state-and-events/         # useState, useEffect, Events, Forms
│   ├── examples/javascript/     # 7 archivos .jsx
│   ├── examples/typescript/     # 7 archivos .tsx
│   ├── exercises/               # 4 ejercicios
│   └── solutions/
├── 03-hooks/                    # Custom hooks, useRef, useContext, useReducer
├── 04-component-patterns/       # Composition, HOC, Render Props, Compound
└── 05-advanced/                 # Context API, Performance, Testing, TS patterns
```

**Justificación educativa:**
- **Progresión garantizada**: Cada módulo construye sobre el anterior
- **Dual JS/TS**: Aprende conceptos en JS, luego refuerza con TS
- **Práctica obligatoria**: Ejercicios con soluciones comentadas
- **Referencia rápida**: README teórico + checklist + errores comunes
- **Auto-contenido**: No requiere proyectos externos para aprender

**Cuándo usarlo:** **Desde el día 1**. Sigue el orden 01→05. Dedica 1-2 semanas por módulo.

---

## 🔗 Relaciones Entre Proyectos

```
┌─────────────────────────────────────────────────────────────┐
│                    WORKSPACE ROOT                           │
├─────────────────────────────────────────────────────────────┤
│  nest-heroes-backend  ◄─── API REST (puerto 3001)          │
│        ▲                                                  │
│        │ HTTP/JSON                                        │
│        │                                                  │
│  ┌────┴────┬──────────────┬────────────────────────────┐  │
│  │         │              │                            │  │
│  ▼         ▼              ▼                            ▼  │
│ spa-    gifs-app-     hooks-app                    review  │
│ project  react          (referencia)                 (repaso)│
│ (capstone) (API real)   (hooks catalog)              (integra)│
│                                                              │
│  ▲                                                          │
│  │                                                          │
│  └────────────────── intro/ (guía paso a paso)             │
└─────────────────────────────────────────────────────────────┘
```

- **`nest-heroes-backend`** es la **fuente de datos** para `spa-project`
- **`spa-project`** consume la API y demuestra arquitectura profesional
- **`gifs-app-react`** consume API externa (Giphy) - patrón similar
- **`hooks-app`** es **referencia técnica** para todos los demás
- **`review`** integra patrones de `hooks-app` + `spa-project`
- **`first-app`** es la **base mínima** de la que derivan los demás
- **`intro/`** enseña **todos los conceptos** que se usan en los proyectos arriba

---

## 🚀 Cómo Ejecutar Todo el Ecosistema

### 1. Backend (primero, en terminal aparte)
```bash
cd /mnt/Datos/NodejsProjects/LearnReactAndTanstack/nest-heroes-backend
npm run start:dev
# Corre en http://localhost:3001
# Swagger en http://localhost:3001/api
```

### 2. Frontend Principal (spa-project)
```bash
cd /mnt/Datos/NodejsProjects/LearnReactAndTanstack/spa-project
npm run dev
# Corre en http://localhost:5173 (o similar)
```

### 3. Otros Frontends (opcional, en otras terminales)
```bash
# Gifs App
cd /mnt/Datos/NodejsProjects/LearnReactAndTanstack/gifs-app-react
npm run dev

# Hooks App (catálogo de hooks)
cd /mnt/Datos/NodejsProjects/LearnReactAndTanstack/hooks-app
npm run dev

# Review (consolidación)
cd /mnt/Datos/NodejsProjects/LearnReactAndTanstack/review
npm run dev

# First App (básico)
cd /mnt/Datos/NodejsProjects/LearnReactAndTanstack/first-app
npm run dev
```

### 4. Testing
```bash
# En cualquier proyecto React:
npm run test        # Vitest watch mode
npm run test:ui     # Interfaz visual
npm run coverage    # Cobertura de código
```

---

## 📚 Ruta de Aprendizaje Recomendada

| Semana | Enfoque | Proyecto de Práctica | Lectura en `intro/` |
|--------|---------|---------------------|---------------------|
| **1** | Setup + Fundamentos | `first-app` | `01-basics/` |
| **2** | Estado + Eventos + Forms | `first-app` (shopping-cart) | `02-state-and-events/` |
| **3** | Hooks + Custom Hooks | `hooks-app` (explorar) | `03-hooks/` |
| **4** | API Externa + Data Fetching | `gifs-app-react` | Repaso 01-03 |
| **5** | Patrones de Componentes | `review` + `hooks-app` | `04-component-patterns/` |
| **6** | Arquitectura + Testing + Full-stack | `spa-project` + `nest-heroes-backend` | `05-advanced/` |

**Total: 6 semanas** para dominio completo.

---

## 🎯 Qué Proyecto Usar Según Tu Objetivo

| Objetivo | Proyecto Recomendado |
|----------|---------------------|
| "Nunca he usado React + Vite + TS" | `first-app` → `intro/01-basics` |
| "Quiero ver TODOS los hooks con ejemplos" | `hooks-app` + `intro/03-hooks` |
| "Necesito consumir una API REST real" | `gifs-app-react` + `intro/02-state-and-events` |
| "Quiero ver testing real (Vitest + RTL)" | `spa-project` (tests) + `intro/05-advanced` |
| "Quiero arquitectura profesional completa" | `spa-project` (código + tests) |
| "Necesito backend para mi frontend" | `nest-heroes-backend` |
| "Quiero repasar todo antes de entrevista" | `review` + `hooks-app` + `intro/` (todos) |
| "Curso estructurado desde cero" | **`intro/` completo** (01→05) |

---

## 🛠 Stack Tecnológico Común

Todos los proyectos React comparten:
- **React 19** + **TypeScript 6** + **Vite 8**
- **ESLint 10** + **React Compiler** (experimental)
- **Vitest** + **React Testing Library** + **jsdom**
- **TailwindCSS 4** (en la mayoría)
- **React Router 7** (en spa-project, review)
- **TanStack Query 5** (en spa-project)
- **Axios** + **Axios Mock Adapter** (testing)

---

## 📝 Notas de Mantenimiento

- **Node.js**: Usar v18+ (`.nvmrc` recomendado)
- **Package Manager**: `pnpm` (hay `pnpm-lock.yaml` y `pnpm-workspace.yaml` en varios)
- **Lockfiles**: `bun.lock` en algunos, `package-lock.json` en nest, `pnpm-lock.yaml` en otros
- **Scripts comunes**: `dev`, `build`, `lint`, `test`, `preview`, `coverage`

---

## 📄 Licencia y Uso

Este workspace es **material educativo personal**. Puedes:
- ✅ Estudiar, modificar, experimentar
- ✅ Usar como base para tus proyectos
- ✅ Copiar patrones y configuraciones
- ❌ Uso comercial sin autorización

---

**¿Por dónde empezar?** → Lee `intro/01-basics/README.md` y abre `first-app` en tu editor.

*Última actualización: Agosto 2026*