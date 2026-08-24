# Ejercicio 4: Card Composable con Slots

## Objetivo
Crear un sistema de `Card` composable usando el patrón Compound Components / Slots.

## Requisitos

### Componentes principales:
1. **Card** - Contenedor principal
2. **Card.Header** - Cabecera (título, acciones)
3. **Card.Body** - Contenido principal
4. **Card.Footer** - Pie (botones, metadata)
5. **Card.Image** - Imagen opcional (top/bottom)
6. **Card.Divider** - Separador entre secciones

### Props de Card (contenedor):
- `variant?: 'default' | 'outlined' | 'elevated' | 'filled'`
- `padding?: 'none' | 'sm' | 'md' | 'lg'`
- `hoverable?: boolean` - Efecto hover
- `clickable?: boolean` - Cursor pointer + onClick
- `onClick?: () => void`

### Props de sub-componentes:
- **Card.Header**: `title`, `subtitle`, `action` (ReactNode)
- **Card.Body**: `children` (required)
- **Card.Footer**: `children`, `align?: 'start' | 'center' | 'end' | 'between'`
- **Card.Image**: `src`, `alt`, `position?: 'top' | 'bottom'`, `height?`
- **Card.Divider**: sin props

### Uso esperado:

```tsx
<Card variant="elevated" hoverable padding="md" onClick={handleClick}>
  <Card.Image src="/cover.jpg" alt="Cover" position="top" height={200} />
  <Card.Header 
    title="Título de la Tarjeta" 
    subtitle="Subtítulo opcional"
    action={<Button size="sm">Acción</Button>}
  />
  <Card.Divider />
  <Card.Body>
    <p>Contenido principal de la tarjeta...</p>
  </Card.Body>
  <Card.Divider />
  <Card.Footer align="end">
    <Button variant="ghost">Cancelar</Button>
    <Button variant="primary">Confirmar</Button>
  </Card.Footer>
</Card>
```

### También permitir uso simple (backwards compatible):

```tsx
<Card>
  <h3>Título simple</h3>
  <p>Contenido simple</p>
</Card>
```

## Tests de verificación

- [ ] Todos los sub-componentes accesibles via `Card.Header`, `Card.Body`, etc.
- [ ] Variantes aplican clases CSS correctas
- [ ] Padding se aplica al contenedor correcto
- [ ] `hoverable` añade estilos hover
- [ ] `clickable` + `onClick` funcionan juntos
- [ ] Image en position top/bottom se renderiza en orden correcto
- [ ] Divider renderiza `<hr>` o `<div class="divider">`
- [ ] Footer align distribuye children correctamente
- [ ] Uso simple (solo children) funciona sin sub-componentes
- [ ] TypeScript: Tipos correctos, autocompletado en `Card.<Tab>`

## Puntos extra

- `Card.Overlay` para overlays en imágenes
- `Card.Grid` para layout de múltiples cards responsive
- Soporte para `asChild` en sub-componentes
- Animaciones de entrada (framer-motion o CSS)
- Dark mode automático via CSS variables