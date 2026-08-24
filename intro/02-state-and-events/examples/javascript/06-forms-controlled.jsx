/**
 * 06-forms-controlled.jsx - Formularios Controlados
 * 
 * En formularios controlados, React es la "single source of truth".
 * El estado de React controla el valor de cada input.
 */

import React from 'react';

// ============================================
// 1. INPUT CONTROLADO BÁSICO
// ============================================

function BasicControlledInput() {
  const [value, setValue] = React.useState('');
  
  return (
    <div>
      <label>
        Nombre:
        <input
          type="text"
          value={value}                    // Valor controlado por React
          onChange={e => setValue(e.target.value)} // Actualizar estado
        />
      </label>
      <p>Valor actual: "{value}"</p>
      <p>Longitud: {value.length}</p>
    </div>
  );
}

// ============================================
// 2. MÚLTIPLES INPUTS CON UN SOLO HANDLER
// ============================================

function MultipleInputs() {
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    bio: ''
  });
  
  // Handler genérico usando name attribute
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    alert('Datos: ' + JSON.stringify(form, null, 2));
  };
  
  const reset = () => {
    setForm({ firstName: '', lastName: '', email: '', age: '', bio: '' });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name: <input name="firstName" value={form.firstName} onChange={handleChange} /></label>
      </div>
      <div>
        <label>Last Name: <input name="lastName" value={form.lastName} onChange={handleChange} /></label>
      </div>
      <div>
        <label>Email: <input type="email" name="email" value={form.email} onChange={handleChange} /></label>
      </div>
      <div>
        <label>Age: <input type="number" name="age" value={form.age} onChange={handleChange} /></label>
      </div>
      <div>
        <label>Bio: <textarea name="bio" value={form.bio} onChange={handleChange} /></label>
      </div>
      <button type="submit">Enviar</button>
      <button type="button" onClick={reset}>Limpiar</button>
      
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}

// ============================================
// 3. SELECT, CHECKBOX, RADIO CONTROLADOS
// ============================================

function SelectCheckboxRadio() {
  const [form, setForm] = React.useState({
    role: 'user',
    skills: [],           // Array para checkboxes múltiples
    newsletter: false,    // Boolean para checkbox simple
    gender: '',           // Radio group
    agree: false          // Checkbox requerido
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'skills') {
      // Manejo especial para array de checkboxes
      setForm(prev => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter(s => s !== value)
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  const skillOptions = ['React', 'Vue', 'Angular', 'Svelte', 'Node.js', 'TypeScript'];
  const genderOptions = ['male', 'female', 'other', 'prefer-not-to-say'];
  
  return (
    <form>
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
    </form>
  );
}

// ============================================
// 4. VALIDACIÓN EN TIEMPO REAL
// ============================================

function RealTimeValidation() {
  const [form, setForm] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  
  const validateField = (name, value) => {
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Validar en tiempo real solo si ya fue tocado
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };
  
  const isValid = Object.keys(form).every(key => 
    form[key] && !validateField(key, form[key])
  );
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Marcar todos como touched
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    
    // Validar todo
    const newErrors = {};
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert('¡Formulario válido! Enviando...');
      console.log('Submit:', form);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field
        label="Username"
        name="username"
        type="text"
        value={form.username}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.username ? errors.username : undefined}
      />
      
      <Field
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : undefined}
      />
      
      <Field
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password ? errors.password : undefined}
      />
      
      <Field
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

// Componente Field reutilizable
function Field({ label, name, type, value, onChange, onBlur, error, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', marginBottom: 4 }}>
        {label}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{ 
            width: '100%', 
            padding: 8, 
            borderColor: error ? 'red' : '#ccc',
            marginTop: 4
          }}
          {...props}
        />
      </label>
      {error && <span style={{ color: 'red', fontSize: 12 }}>{error}</span>}
    </div>
  );
}

// ============================================
// 5. FORMULARIO CON ARRAYS DINÁMICOS
// ============================================

function DynamicArrayForm() {
  const [form, setForm] = React.useState({
    title: '',
    tags: ['react', 'javascript']  // Array de strings
  });
  
  const [newTag, setNewTag] = React.useState('');
  
  const addTag = () => {
    const tag = newTag.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setNewTag('');
    }
  };
  
  const removeTag = (tagToRemove) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };
  
  const handleTitleChange = (e) => {
    setForm(prev => ({ ...prev, title: e.target.value }));
  };
  
  return (
    <form>
      <div>
        <label>Title: <input value={form.title} onChange={handleTitleChange} /></label>
      </div>
      
      <fieldset>
        <legend>Tags</legend>
        <div>
          <input
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Nuevo tag + Enter"
          />
          <button type="button" onClick={addTag}>Añadir</button>
        </div>
        <div>
          {form.tags.map(tag => (
            <span key={tag} style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              background: '#e0e0e0', 
              borderRadius: 16, 
              padding: '4px 12px', 
              margin: 4 
            }}>
              {tag}
              <button 
                onClick={() => removeTag(tag)} 
                style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </fieldset>
      
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}

// ============================================
// 6. PATRÓN CONTROLADO PARA COMPONENTES PERSONALIZADOS
// ============================================

// Input personalizado que funciona como controlled
function CustomInput({ value, onChange, onBlur, label, error, ...props }) {
  const id = React.useId(); // React 18+ para IDs únicos
  
  return (
    <div className="custom-input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && <span id={`${id}-error`} role="alert">{error}</span>}
    </div>
  );
}

// Uso del componente personalizado controlado
function CustomInputForm() {
  const [form, setForm] = React.useState({ name: '', email: '' });
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };
  
  const validateField = (name, value) => {
    let error = '';
    if (name === 'name' && !value) error = 'Nombre requerido';
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Email inválido';
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  return (
    <form>
      <CustomInput
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name ? errors.name : undefined}
      />
      <CustomInput
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
      <h1>Controlled Forms</h1>
      
      <BasicControlledInput />
      <hr />
      <MultipleInputs />
      <hr />
      <SelectCheckboxRadio />
      <hr />
      <RealTimeValidation />
      <hr />
      <DynamicArrayForm />
      <hr />
      <CustomInputForm />
    </section>
  );
}