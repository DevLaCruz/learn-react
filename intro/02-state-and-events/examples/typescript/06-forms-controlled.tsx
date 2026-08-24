/**
 * 06-forms-controlled.tsx - Formularios Controlados con TypeScript
 */

import React from 'react';

// ============================================
// 1. INPUT CONTROLADO BÁSICO TIPADO
// ============================================

function BasicControlledInputTyped() {
  const [value, setValue] = React.useState('');

  return (
    <div>
      <label>
        Nombre:
        <input
          type="text"
          value={value}
          onChange={e => setValue((e.target as HTMLInputElement).value)}
        />
      </label>
      <p>Valor actual: "{value}"</p>
      <p>Longitud: {value.length}</p>
    </div>
  );
}

// ============================================
// 2. MÚLTIPLES INPUTS CON UN SOLO HANDLER TIPADO
// ============================================

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  bio: string;
}

function MultipleInputsTyped() {
  const [form, setForm] = React.useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    bio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  const reset = () => {
    setForm({ firstName: '', lastName: '', email: '', age: '', bio: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div><label>First Name: <input name="firstName" value={form.firstName} onChange={handleChange} /></label></div>
      <div><label>Last Name: <input name="lastName" value={form.lastName} onChange={handleChange} /></label></div>
      <div><label>Email: <input type="email" name="email" value={form.email} onChange={handleChange} /></label></div>
      <div><label>Age: <input type="number" name="age" value={form.age} onChange={handleChange} /></label></div>
      <div><label>Bio: <textarea name="bio" value={form.bio} onChange={handleChange} /></label></div>
      <button type="submit">Enviar</button>
      <button type="button" onClick={reset}>Limpiar</button>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}

// ============================================
// 3. SELECT, CHECKBOX, RADIO CONTROLADOS TIPADOS
// ============================================

interface SubFormState {
  role: string;
  skills: string[];
  newsletter: boolean;
  gender: string;
  agree: boolean;
}

function SubFormControlsTyped() {
  const [form, setForm] = React.useState<SubFormState>({
    role: 'user',
    skills: [],
    newsletter: false,
    gender: '',
    agree: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'skills') {
      setForm(prev => ({
        ...prev,
        skills: checked ? [...prev.skills, value] : prev.skills.filter(s => s !== value)
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : (name === 'gender' ? value : prev[name])
      }));
    }
  };

  const skillOptions = ['React', 'Vue', 'Angular', 'Svelte', 'Node.js', 'TypeScript'];
  const genderOptions = ['male', 'female', 'other', 'prefer-not-to-say'];

  return (
    <fieldset>
      <legend>Role</legend>
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="moderator">Moderator</option>
      </select>
    </fieldset>

    <fieldset>
      <legend>Skills (múltiples)</legend>
      {skillOptions.map(skill => (
        <label key={skill}>
          <input
            type="checkbox"
            name="skills"
            value={skill}
            checked={form.skills.includes(skill)}
            onChange={handleChange}
          />
          {skill}
        </label>
      ))}
      <p>Seleccionadas: {form.skills.join(', ') || 'ninguna'}</p>
    </fieldset>

    <fieldset>
      <legend>Newsletter</legend>
      <label>
        <input
          type="checkbox"
          name="newsletter"
          checked={form.newsletter}
          onChange={handleChange}
        />
        Suscribirme
      </label>
    </fieldset>

    <fieldset>
      <legend>Gender</legend>
      {genderOptions.map(g => (
        <label key={g}>
          <input
            type="radio"
            name="gender"
            value={g}
            checked={form.gender === g}
            onChange={handleChange}
          />
          {g}
        </label>
      ))}
    </fieldset>

    <fieldset>
      <legend>Terms</legend>
      <label>
        <input
          type="checkbox"
          name="agree"
          checked={form.agree}
          onChange={handleChange}
          required
        />
        Acepto términos
      </label>
    </fieldset>

    <button type="button" onClick={() => console.log(form)}>Log State</button>
    <pre>{JSON.stringify(form, null, 2)}</pre>
  );
}

// ============================================
// 4. VALIDACIÓN EN TIEMPO REAL TIPADO
// ============================================

function RealTimeValidationTyped() {
  interface ValidationErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }

  interface FormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const [form, setForm] = React.useState<FormValues>({
    username: '', email: '', password: '', confirmPassword: ''
  });
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [touched, setTouched] = React.useState<Partial<keyof FormValues>>({});

  const validateField = (name: keyof FormValues, value: string): string | null => {
    switch (name) {
      case 'username':
        if (!value) return 'Username requerido';
        if (value.length < 3) return 'Mínimo 3 caracteres';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Solo letras, números y _';
        return '';
      case 'email':
        if (!value) return 'Email requerido';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
        return '';
      case 'password':
        if (!value) return 'Password requerido';
        if (value.length < 8) return 'Mínimo 8 caracteres';
        if (!/[A-Z]/.test(value)) return 'Debe tener mayúscula';
        if (!/[0-9]/.test(value)) return 'Debe tener número';
        return '';
      case 'confirmPassword':
        if (!value) return 'Confirmar password';
        if (value !== form.password) return 'No coinciden';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const isValid = Object.keys(form).every(key => form[key] && !validateField(key, form[key]));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce((acc: Partial<keyof FormValues>, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const newErrors: ValidationErrors = {};
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) alert('¡Formulario válido!');
  };

  const FieldTyped = ({
    label: label: string,
    name: name: keyof FormValues,
    type: type: 'text' | 'email' | 'password',
    value,
    onChange,
    onBlur,
    error,
    ...rest
  }: {
    label: string;
    name: keyof FormValues;
    type: 'text' | 'email' | 'password';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    error: string | undefined;
    [key: string]: any;
  }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', marginBottom: 4 }}>{label}
        <input type={type} name={String(name)} value={value} onChange={onChange} onBlur={onBlur} {...rest} />
      </label>
      {error && <span style={{ color: 'red', fontSize: 12 }}>{error}</span>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldTyped
        label="Username"
        name="username"
        type="text"
        value={form.username}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.username ? errors.username : undefined}
      />
      <FieldTyped
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : undefined}
      />
      <FieldTyped
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password ? errors.password : undefined}
      />
      <FieldTyped
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.confirmPassword ? errors.confirmPassword : undefined}
      />
      <button type="submit" disabled={!isValid}>Registrar</button>
    </form>
  );
}

// ============================================
// 5. FORMULARIO CON ARRAYS DINÁMICOS TIPADO
// ============================================

function DynamicArrayFormTyped() {
  interface ArrayFormState {
    title: string;
    tags: string[];
  }

  const [form, setForm] = React.useState<ArrayFormState>({ title: '', tags: ['react', 'javascript'] });
  const [newTag, setNewTag] = React.useState('');

  const addTag = () => {
    const tag = newTag.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, title: e.target.value }));
  };

  return (
    <form>
      <div><label>Title: <input value={form.title} onChange={handleTitleChange} /></label></div>
      <fieldset><legend>Tags</legend>
        <div>
          <input value={newTag} onChange={e => setNewTag(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Nuevo tag + Enter" />
          <button type="button" onClick={addTag}>Añadir</button>
        </div>
        <div>{form.tags.map(tag => (
          <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', background: '#e0e0e0', borderRadius: 16, padding: '4px 12px', margin: 4 }}>
            {tag}
            <button onClick={() => removeTag(tag)} style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
          </span>
        ))}</div></fieldset>
      <pre>{JSON.stringify(form, null, 2)}</pre></form>
}

// ============================================
// 6. COMPONENTE INPUT PERSONALIZADO TIPADO
// ============================================

function CustomInputTyped({ value, onChange, onBlur, label, error, ...props }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  label: string;
  error?: string;
  [key: string]: any;
}) {
  const id = React.useId();
  return (
    <div className="custom-input">
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={onChange} onBlur={onBlur} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error && <span id={`${id}-error`} role="alert" style={{ color: 'red', fontSize: 12 }}>{error}</span>}
    </div>
  );
}

function CustomInputFormTyped() {
  interface Form { name: string; email: string; }
  const [form, setForm] = React.useState<Form>({ name: '', email: '' });
  const [errors, setErrors] = React.useState<{ name?: string; email?: string }>({});
  const [touched, setTouched] = React.useState<Partial<keyof Form>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name: keyof Form, value: string) => {
    let error = '';
    if (name === 'name' && !value) error = 'Nombre requerido';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Email inválido';
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  return (
    <form>
      <CustomInputTyped
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name ? errors.name : undefined}
      />
      <CustomInputTyped
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : undefined}
      />
      <button type="button" onClick={() => console.log(form)}>Log</button>
    </form>
  );
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function ControlledFormsDemo() {
  return (
    <section>
      <h1>Controlled Forms TypeScript</h1>
      <BasicControlledInputTyped />
      <hr />
      <MultipleInputsTyped />
      <hr />
      <SubFormControlsTyped />
      <hr />
      <RealTimeValidationTyped />
      <hr />
      <DynamicArrayFormTyped />
      <hr />
      <CustomInputFormTyped />
    </section>
  );
}