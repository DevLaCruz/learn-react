/**
 * Solución Exercise 3: Button Reutilizable
 * TypeScript version
 */

import React from 'react';

// ============================================
// TIPOS
// ============================================

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  // Sobrescribir type para restringir valores
  type?: ButtonType;
  // Excluir disabled del spread para controlarlo nosotros
  disabled?: boolean;
}

interface ButtonRef {
  focus: () => void;
  click: () => void;
}

// ============================================
// MAPEO DE CLASES CSS
// ============================================

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  danger: 'btn-danger'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg'
};

// ============================================
// COMPONENTE BASE
// ============================================

function ButtonBase({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled = false,
  type = 'button',
  className = '',
  style,
  onClick,
  'aria-label': ariaLabel,
  ...restProps
}: ButtonProps) {
  // Combinar disabled y loading
  const isDisabled = disabled || loading;

  // Clases compuestas
  const classes = [
    'btn',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'btn-full-width' : '',
    loading ? 'btn-loading' : '',
    className
  ].filter(Boolean).join(' ');

  // Contenido del botón
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <span className="btn-spinner" aria-hidden="true"></span>
          <span className="btn-loading-text">Cargando...</span>
        </>
      );
    }
    return (
      <>
        {leftIcon && <span className="btn-icon btn-icon-left">{leftIcon}</span>}
        <span className="btn-text">{children}</span>
        {rightIcon && <span className="btn-icon btn-icon-right">{rightIcon}</span>}
      </>
    );
  };

  return (
    <button
      type={type}
      className={classes}
      style={style}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...restProps}
    >
      {renderContent()}
    </button>
  );
}

// ============================================
// FORWARD REF
// ============================================

const Button = React.forwardRef<ButtonRef, ButtonProps>(
  function Button(props, ref) {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle<ButtonRef>(ref, () => ({
      focus: () => buttonRef.current?.focus(),
      click: () => buttonRef.current?.click()
    }));

    return <ButtonBase {...props} ref={buttonRef} />;
  }
);

Button.displayName = 'Button';

// ============================================
// COMPONENTES AUXILIARES (Puntos extra)
// ============================================

// ButtonGroup para agrupar botones
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

function ButtonGroup({ children, className, 'aria-label': ariaLabel }: ButtonGroupProps) {
  return (
    <div className={`btn-group ${className ?? ''}`} role="group" aria-label={ariaLabel}>
      {children}
    </div>
  );
}

// Variant link (renderiza <a>)
interface LinkButtonProps extends Omit<ButtonProps, 'type'> {
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
}

function LinkButton({ 
  href, 
  target = '_self', 
  rel = target === '_blank' ? 'noopener noreferrer' : undefined,
  ...props 
}: LinkButtonProps) {
  const { variant = 'primary', size = 'md', fullWidth = false, className = '', children, ...rest } = props;
  
  const classes = [
    'btn',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'btn-full-width' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={classes}
      {...rest}
    >
      {children}
    </a>
  );
}

// Adjuntar sub-componentes
Button.Group = ButtonGroup;
Button.Link = LinkButton;

// ============================================
// EXPORT
// ============================================

export default Button;
export { ButtonGroup, LinkButton };
export type { ButtonProps, ButtonRef, ButtonVariant, ButtonSize, ButtonType, LinkButtonProps, ButtonGroupProps };

/*
// CSS sugerido:
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
}

.btn:disabled,
.btn[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn-full-width { width: 100%; }

/* Tamaños */
.btn-sm { padding: 6px 12px; font-size: 12px; }
.btn-md { padding: 10px 20px; font-size: 14px; }
.btn-lg { padding: 14px 28px; font-size: 16px; }

/* Variantes */
.btn-primary { background: #3b82f6; color: white; }
.btn-primary:hover:not(:disabled) { background: #2563eb; }

.btn-secondary { background: #6b7280; color: white; }
.btn-secondary:hover:not(:disabled) { background: #4b5563; }

.btn-outline { background: transparent; color: #3b82f6; border: 1px solid #3b82f6; }
.btn-outline:hover:not(:disabled) { background: #eff6ff; }

.btn-ghost { background: transparent; color: #3b82f6; }
.btn-ghost:hover:not(:disabled) { background: #f3f4f6; }

.btn-danger { background: #ef4444; color: white; }
.btn-danger:hover:not(:disabled) { background: #dc2626; }

/* Loading */
.btn-loading { position: relative; color: transparent !important; pointer-events: none; }
.btn-spinner {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
.btn-loading-text { position: relative; color: inherit; }

@keyframes spin { to { transform: rotate(360deg); } }

/* Icons */
.btn-icon { display: flex; align-items: center; justify-content: center; }
.btn-icon-left { margin-right: 4px; }
.btn-icon-right { margin-left: 4px; }

/* ButtonGroup */
.btn-group { display: inline-flex; gap: 8px; }
.btn-group .btn:not(:first-child) { border-top-left-radius: 0; border-bottom-left-radius: 0; }
.btn-group .btn:not(:last-child) { border-top-right-radius: 0; border-bottom-right-radius: 0; }
*/