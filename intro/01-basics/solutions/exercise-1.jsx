/**
 * Solución Exercise 1: ProfileCard
 * JavaScript version
 */

import React from 'react';

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

/**
 * ProfileCard - Tarjeta de perfil de usuario
 * @param {Object} props
 * @param {string} props.name - Nombre del usuario (requerido)
 * @param {string} props.email - Email del usuario (requerido)
 * @param {string} props.avatar - URL del avatar (requerido)
 * @param {string} [props.bio] - Biografía opcional
 * @param {'admin'|'user'|'guest'} [props.role='user'] - Rol del usuario
 * @param {Function} [props.onFollow] - Callback al seguir
 * @param {React.ReactNode} [props.children] - Contenido extra en footer
 */
function ProfileCard({ 
  name, 
  email, 
  avatar, 
  bio, 
  role = 'user', 
  onFollow, 
  children 
}) {
  // Validación básica (en desarrollo)
  if (process.env.NODE_ENV !== 'production') {
    if (!name) console.warn('ProfileCard: prop "name" es requerida');
    if (!email) console.warn('ProfileCard: prop "email" es requerida');
    if (!avatar) console.warn('ProfileCard: prop "avatar" es requerida');
  }

  return (
    <article className={`profile-card profile-card--${role}`}>
      {/* Avatar */}
      <div className="profile-card__avatar">
        <img 
          src={avatar} 
          alt={name} 
          loading="lazy"
          width="80"
          height="80"
        />
      </div>

      {/* Info principal */}
      <div className="profile-card__info">
        <h3 className="profile-card__name">{name}</h3>
        <p className="profile-card__email">{email}</p>
        
        {/* Bio opcional */}
        {bio && (
          <p className="profile-card__bio">{bio}</p>
        )}

        {/* Badge de rol */}
        <span className={`profile-card__role profile-card__role--${role}`}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
      </div>

      {/* Botón seguir */}
      {onFollow && (
        <button 
          className="profile-card__follow-btn"
          onClick={onFollow}
          type="button"
        >
          Seguir
        </button>
      )}

      {/* Footer con children */}
      {children && (
        <footer className="profile-card__footer">
          {children}
        </footer>
      )}
    </article>
  );
}

// ============================================
// OPTIMIZACIÓN: React.memo
// ============================================

// Comparación personalizada para evitar re-renders innecesarios
const arePropsEqual = (prev, next) => {
  return (
    prev.name === next.name &&
    prev.email === next.email &&
    prev.avatar === next.avatar &&
    prev.bio === next.bio &&
    prev.role === next.role &&
    prev.onFollow === next.onFollow &&
    // children se compara por referencia (React lo hace automáticamente)
    prev.children === next.children
  );
};

const MemoizedProfileCard = React.memo(ProfileCard, arePropsEqual);

// ============================================
// FORWARD REF (Puntos extra)
// ============================================

const ForwardRefProfileCard = React.forwardRef(function ForwardRefProfileCard(props, ref) {
  const cardRef = React.useRef(null);
  
  // Exponer métodos imperativos
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      cardRef.current?.focus();
    },
    getElement: () => cardRef.current
  }));
  
  return <MemoizedProfileCard {...props} ref={cardRef} />;
});

ForwardRefProfileCard.displayName = 'ProfileCard';

// ============================================
// EXPORT
// ============================================

export default ForwardRefProfileCard;

// ============================================
// DEMO / TESTING
// ============================================

/*
// Ejemplo de uso:
function App() {
  const cardRef = React.useRef(null);
  
  return (
    <div className="app">
      <ForwardRefProfileCard
        ref={cardRef}
        name="Ana García"
        email="ana@example.com"
        avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Ana"
        bio="Desarrolladora React apasionada por TypeScript"
        role="admin"
        onFollow={() => console.log('Follow!')}
      >
        <small>Miembro desde 2023</small>
      </ForwardRefProfileCard>
      
      <button onClick={() => cardRef.current?.focus()}>
        Focus Card
      </button>
    </div>
  );
}
*/

/*
// CSS sugerido:
.profile-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-width: 320px;
}

.profile-card--admin { border-top: 4px solid #f59e0b; }
.profile-card--user { border-top: 4px solid #3b82f6; }
.profile-card--guest { border-top: 4px solid #6b7280; }

.profile-card__avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-card__name { margin: 0; font-size: 1.25rem; }
.profile-card__email { margin: 0; color: #6b7280; font-size: 0.875rem; }
.profile-card__bio { margin: 0; font-size: 0.875rem; color: #374151; }

.profile-card__role {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}
.profile-card__role--admin { background: #fef3c7; color: #92400e; }
.profile-card__role--user { background: #dbeafe; color: #1e40af; }
.profile-card__role--guest { background: #f3f4f6; color: #374151; }

.profile-card__follow-btn {
  align-self: flex-start;
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.profile-card__follow-btn:hover { background: #2563eb; }
.profile-card__follow-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.profile-card__footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  color: #6b7280;
  font-size: 0.75rem;
}
*/