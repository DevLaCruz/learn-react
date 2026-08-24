# Ejercicio 1: Componente ProfileCard

## Objetivo
Crear un componente `ProfileCard` que muestre información de un usuario usando props y children.

## Requisitos

1. **Props obligatorias:**
   - `name: string` - Nombre del usuario
   - `email: string` - Email del usuario
   - `avatar: string` - URL de la imagen de avatar

2. **Props opcionales:**
   - `bio?: string` - Biografía corta (máx 160 chars)
   - `role?: 'admin' | 'user' | 'guest'` - Rol del usuario
   - `onFollow?: () => void` - Callback al hacer click en "Seguir"

3. **Children:**
   - El componente debe aceptar `children` para contenido extra en el footer

4. **Renderizado:**
   - Imagen avatar (img tag con alt = name)
   - Nombre en h3
   - Email en p con className="email"
   - Bio en p con className="bio" (solo si existe)
   - Badge del rol con clase CSS según rol: `role-admin`, `role-user`, `role-guest`
   - Botón "Seguir" (solo si onFollow existe)
   - Footer con children

## Estructura esperada

```jsx
<ProfileCard 
  name="Ana García"
  email="ana@example.com"
  avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Ana"
  bio="Desarrolladora React apasionada por TypeScript"
  role="admin"
  onFollow={() => console.log('Follow!')}
>
  <small>Miembro desde 2023</small>
</ProfileCard>
```

## Tests de verificación

- [ ] El componente renderiza sin errores
- [ ] Props obligatorias se muestran correctamente
- [ ] Props opcionales solo renderizan si existen
- [ ] Badge tiene clase CSS correcta según role
- [ ] Botón "Seguir" solo aparece si onFollow existe
- [ ] Children se renderizan en el footer
- [ ] TypeScript: Sin errores de tipos (si usas .tsx)

## Puntos extra

- Añadir `React.memo` para optimizar
- Usar `forwardRef` para exponer método `focus()`
- Añadir PropTypes (solo JS) o JSDoc types