# Ejercicio 3: Componente Button Reutilizable

## Objetivo
Crear un componente `Button` completamente tipado y reutilizable con múltiples variantes y estados.

## Requisitos

### Props obligatorias:
- `children: React.ReactNode` - Contenido del botón
- `onClick: () => void` - Handler de click

### Props opcionales:
- `variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'` - Estilo visual
- `size?: 'sm' | 'md' | 'lg'` - Tamaño
- `disabled?: boolean` - Estado deshabilitado
- `loading?: boolean` - Estado de carga (muestra spinner)
- `fullWidth?: boolean` - Ancho completo (block)
- `leftIcon?: React.ReactNode` - Icono a la izquierda
- `rightIcon?: React.ReactNode` - Icono a la derecha
- `type?: 'button' | 'submit' | 'reset'` - Tipo nativo
- `aria-label?: string` - Accesibilidad

### Comportamiento:
- `disabled` o `loading` → deshabilita el botón y cambia cursor
- `loading` → muestra spinner y oculta children (o mantiene ancho)
- `fullWidth` → `display: block; width: 100%`
- Forward ref para permitir `focus()` desde padre

### Clases CSS esperadas:
```css
.btn { /* base */ }
.btn-primary { /* azul */ }
.btn-secondary { /* gris */ }
.btn-outline { /* borde solo */ }
.btn-ghost { /* sin fondo ni borde */ }
.btn-danger { /* rojo */ }
.btn-sm { padding: 4px 8px; font-size: 12px; }
.btn-md { padding: 8px 16px; font-size: 14px; }
.btn-lg { padding: 12px 24px; font-size: 16px; }
.btn-loading { position: relative; color: transparent; }
.btn-loading::after { /* spinner */ }
```

## Estructura esperada

```tsx
<Button 
  variant="primary" 
  size="md"
  onClick={handleClick}
  leftIcon={<PlusIcon />}
  loading={isSubmitting}
>
  Guardar
</Button>

<Button 
  variant="danger" 
  onClick={handleDelete}
  disabled={isDeleting}
>
  Eliminar
</Button>
```

## Tests de verificación

- [ ] Todas las variantes renderizan clases correctas
- [ ] Tamaños aplican padding/font-size correctos
- [ ] `disabled` previene onClick y cambia estilos
- [ ] `loading` muestra spinner y deshabilita
- [ ] `fullWidth` aplica ancho 100%
- [ ] Icons se renderizan en posición correcta
- [ ] `forwardRef` permite `ref.current.focus()`
- [ ] TypeScript: Props tipadas correctamente, sin `any`
- [ ] Accesibilidad: `aria-label`, `aria-disabled`, `type`

## Puntos extra

- Componente `ButtonGroup` para agrupar botones
- Variante `link` que renderiza `<a>` en lugar de `<button>`
- Soporte para `asChild` pattern (Radix UI style)
- Tests con @testing-library/react