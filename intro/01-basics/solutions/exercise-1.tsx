/**
 * Solución Exercise 1: ProfileCard
 * TypeScript version
 */

import React from 'react';

// ============================================
// TIPOS
// ============================================

type UserRole = 'admin' | 'user' | 'guest';

interface ProfileCardProps {
  // Requeridas
  name: string;
  email: string;
  avatar: string;
  
  // Opcionales
  bio?: string;
  role?: UserRole;
  onFollow?: () => void;
  children?: React.ReactNode;
}

// Para forwardRef: métodos expuestos al padre
interface ProfileCardRef {
  focus: () => void;
  getElement: () => HTMLArticleElement | null;
}

// ============================================
// COMPONENTE BASE
// ============================================

function ProfileCard({ 
  name, 
  email, 
  avatar, 
  bio, 
  role = 'user', 
  onFollow, 
  children 
}: ProfileCardProps) {
  return (
    <article className={`profile-card profile-card--${role}`}>
      {/* Avatar */}
      <div className="profile-card__avatar">
        <img 
          src={avatar} 
          alt={name} 
          loading="lazy"
          width={80}
          height={80}
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

      {/* Botón seguir - solo si onFollow existe */}
      {onFollow && (
        <button 
          className="profile-card__follow-btn"
          onClick={onFollow}
          type="button"
          aria-label={`Seguir a ${name}`}
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
// MEMO CON COMPARACIÓN PERSONALIZADA
// ============================================

const arePropsEqual = (prev: ProfileCardProps, next: ProfileCardProps): boolean => {
  return (
    prev.name === next.name &&
    prev.email === next.email &&
    prev.avatar === next.avatar &&
    prev.bio === next.bio &&
    prev.role === next.role &&
    prev.onFollow === next.onFollow &&
    prev.children === next.children
  );
};

const MemoizedProfileCard = React.memo(ProfileCard, arePropsEqual);

// ============================================
// FORWARD REF CON TIPOS
// ============================================

const ForwardRefProfileCard = React.forwardRef<ProfileCardRef, ProfileCardProps>(
  function ForwardRefProfileCard(props, ref) {
    const cardRef = React.useRef<HTMLArticleElement>(null);
    
    // Exponer métodos imperativos al padre
    React.useImperativeHandle<ProfileCardRef>(ref, () => ({
      focus: () => {
        cardRef.current?.focus();
      },
      getElement: () => cardRef.current
    }));
    
    return <MemoizedProfileCard {...props} ref={cardRef} />;
  }
);

ForwardRefProfileCard.displayName = 'ProfileCard';

// ============================================
// EXPORT
// ============================================

export default ForwardRefProfileCard;
export type { ProfileCardProps, ProfileCardRef, UserRole };

// ============================================
// DEMO / TESTING (comentado)
// ============================================

/*
// Ejemplo de uso completo:
function App() {
  const cardRef = React.useRef<ProfileCardRef>(null);
  
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
      
      <button 
        onClick={() => cardRef.current?.focus()}
        type="button"
      >
        Focus Card
      </button>
    </div>
  );
}
*/

/*
// CSS sugerido (mismo que versión JS):
/*
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