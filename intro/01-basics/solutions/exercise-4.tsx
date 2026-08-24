/**
 * Solución Exercise 4: Card Composable con Slots
 * TypeScript version
 */

import React from 'react';

// ============================================
// TIPOS
// ============================================

type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type FooterAlign = 'start' | 'center' | 'end' | 'between';

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Sub-componentes
interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children?: React.ReactNode; // Para flexibilidad
}

interface CardBodyProps {
  children: React.ReactNode;
}

interface CardFooterProps {
  children: React.ReactNode;
  align?: FooterAlign;
}

interface CardImageProps {
  src: string;
  alt: string;
  position?: 'top' | 'bottom';
  height?: number | string;
  className?: string;
}

interface CardDividerProps {
  className?: string;
}

// Compound Component type
interface CardCompound {
  (props: CardProps): React.ReactElement;
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
  Image: React.FC<CardImageProps>;
  Divider: React.FC<CardDividerProps>;
}

// ============================================
// CLASES CSS MAP
// ============================================

const variantClasses: Record<CardVariant, string> = {
  default: 'card--default',
  outlined: 'card--outlined',
  elevated: 'card--elevated',
  filled: 'card--filled'
};

const paddingClasses: Record<CardPadding, string> = {
  none: 'card--padding-none',
  sm: 'card--padding-sm',
  md: 'card--padding-md',
  lg: 'card--padding-lg'
};

const alignClasses: Record<FooterAlign, string> = {
  start: 'justify-content: flex-start',
  center: 'justify-content: center',
  end: 'justify-content: flex-end',
  between: 'justify-content: space-between'
};

// ============================================
// COMPONENTE PRINCIPAL: Card
// ============================================

function Card({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  onClick,
  children,
  className = '',
  style
}: CardProps) {
  // Detectar si children son sub-componentes o contenido simple
  const hasSubComponents = React.Children.toArray(children).some(child =>
    React.isValidElement(child) && 
    (child.type === Card.Header || 
     child.type === Card.Body || 
     child.type === Card.Footer ||
     child.type === Card.Image ||
     child.type === Card.Divider)
  );

  const classes = [
    'card',
    variantClasses[variant],
    paddingClasses[padding],
    hoverable ? 'card--hoverable' : '',
    clickable ? 'card--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (clickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className={classes}
      style={style}
      onClick={clickable && onClick ? onClick : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? 'button' : undefined}
    >
      {hasSubComponents ? (
        // Renderizar sub-componentes en orden lógico
        React.Children.map(children, child => {
          if (!React.isValidElement(child)) return child;
          
          // Pasar props adicionales a sub-componentes
          if (child.type === Card.Image && child.props.position === 'top') {
            return child;
          }
          if (child.type === Card.Header) {
            return child;
          }
          if (child.type === Card.Image && child.props.position !== 'top') {
            return child;
          }
          if (child.type === Card.Body) {
            return child;
          }
          if (child.type === Card.Footer) {
            return child;
          }
          if (child.type === Card.Divider) {
            return child;
          }
          return child; // Otros elementos
        })
      ) : (
        // Modo simple: solo children
        <div className="card__simple-content">{children}</div>
      )}
    </article>
  );
}

// ============================================
// SUB-COMPONENTES
// ============================================

// Card.Header
function CardHeader({ title, subtitle, action, children }: CardHeaderProps) {
  return (
    <header className="card__header">
      <div className="card__header-content">
        {children ? (
          children
        ) : (
          <>
            <h3 className="card__title">{title}</h3>
            {subtitle && <p className="card__subtitle">{subtitle}</p>}
          </>
        )}
      </div>
      {action && <div className="card__header-action">{action}</div>}
    </header>
  );
}

CardHeader.displayName = 'Card.Header';

// Card.Body
function CardBody({ children }: CardBodyProps) {
  return (
    <div className="card__body">
      {children}
    </div>
  );
}

CardBody.displayName = 'Card.Body';

// Card.Footer
function CardFooter({ children, align = 'end' }: CardFooterProps) {
  return (
    <footer 
      className="card__footer"
      style={{ [alignClasses[align]]: true } as React.CSSProperties}
    >
      {children}
    </footer>
  );
}

CardFooter.displayName = 'Card.Footer';

// Card.Image
function CardImage({ src, alt, position = 'top', height, className = '' }: CardImageProps) {
  return (
    <div className={`card__image card__image--${position} ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        style={{ height }}
      />
    </div>
  );
}

CardImage.displayName = 'Card.Image';

// Card.Divider
function CardDivider({ className = '' }: CardDividerProps) {
  return <hr className={`card__divider ${className}`} />;
}

CardDivider.displayName = 'Card.Divider';

// ============================================
// COMPOUND COMPONENT
// ============================================

const CardCompoundComponent = Card as CardCompound;
CardCompoundComponent.Header = CardHeader;
CardCompoundComponent.Body = CardBody;
CardCompoundComponent.Footer = CardFooter;
CardCompoundComponent.Image = CardImage;
CardCompoundComponent.Divider = CardDivider;

// ============================================
// EXPORT
// ============================================

export default CardCompoundComponent;
export { CardHeader, CardBody, CardFooter, CardImage, CardDivider };
export type { 
  CardProps, 
  CardHeaderProps, 
  CardBodyProps, 
  CardFooterProps, 
  CardImageProps, 
  CardDividerProps,
  CardVariant,
  CardPadding,
  FooterAlign
};

/*
// CSS sugerido:
.card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.card--default { border: 1px solid #e5e7eb; }
.card--outlined { border: 2px solid #e5e7eb; }
.card--elevated { box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); border: none; }
.card--filled { background: #f9fafb; border: none; }

.card--padding-none { padding: 0; }
.card--padding-sm { padding: 12px; }
.card--padding-md { padding: 20px; }
.card--padding-lg { padding: 28px; }

.card--hoverable:hover { 
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); 
  transform: translateY(-2px); 
}
.card--clickable { cursor: pointer; user-select: none; }
.card--clickable:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }

.card__image { overflow: hidden; }
.card__image--top { margin: calc(-1 * var(--card-padding, 20px)) calc(-1 * var(--card-padding, 20px)) 0; }
.card__image--bottom { margin: 0 calc(-1 * var(--card-padding, 20px)) calc(-1 * var(--card-padding, 20px)); }
.card__image img { width: 100%; height: auto; display: block; object-fit: cover; }

.card__header { 
  display: flex; 
  align-items: flex-start; 
  justify-content: space-between; 
  margin-bottom: 16px; 
  gap: 16px; 
}
.card__header-content { flex: 1; min-width: 0; }
.card__title { margin: 0 0 4px; font-size: 1.125rem; font-weight: 600; }
.card__subtitle { margin: 0; font-size: 0.875rem; color: #6b7280; }
.card__header-action { flex-shrink: 0; }

.card__body { flex: 1; }
.card__body :first-child { margin-top: 0; }
.card__body :last-child { margin-bottom: 0; }

.card__footer { 
  display: flex; 
  align-items: center; 
  gap: 12px; 
  padding-top: 16px; 
  margin-top: 16px; 
  border-top: 1px solid #e5e7eb; 
}

.card__divider { border: none; border-top: 1px solid #e5e7eb; margin: 16px calc(-1 * var(--card-padding, 20px)); }

.card__simple-content { flex: 1; }
*/