/**
 * 07-forms-uncontrolled.jsx - Formularios Uncontrolled
 * 
 * En formularios uncontrolled, el DOM maneja el estado.
 * React accede a valores via refs cuando necesita.
 */

import React from 'react';

// ============================================
// 1. USEREF BÁSICO PARA INPUT
// ============================================

function BasicUncontrolled() {
  const inputRef = React.useRef(null);
  const [submittedValue, setSubmittedValue] = React.useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Acceder al valor actual del DOM via ref
    const value = inputRef.current.value;
    setSubmittedValue(value);
    console.log('Submitted:', value);
  };
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  const clearInput = () => {
    inputRef.current.value = '';
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre (uncontrolled):
        <input ref={inputRef} type="text" defaultValue="Valor inicial" />
      </label>
      <button type="submit">Enviar</button>
      <button type="button" onClick={focusInput}>Focus</button>
      <button type="button" onClick={clearInput}>Limpiar</button>
      
      {submittedValue && <p>Último enviado: {submittedValue}</p>}
    </form>
  );
}

// ============================================
// 2. DEFAULT VALUE VS VALUE
// ============================================

function DefaultValueVsValue() {
  // Controlled: value prop
  const [controlledValue, setControlledValue] = React.useState('Controlado');
  
  // Uncontrolled: defaultValue prop (solo inicial)
  const uncontrolledRef = React.useRef(null);
  const [uncontrolledSubmitted, setUncontrolledSubmitted] = React.useState('');
  
  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    setUncontrolledSubmitted(uncontrolledRef.current.value);
  };
  
  return (
    <div>
      <h3>Controlled (value)</h3>
      <input 
        value={controlledValue} 
        onChange={e => setControlledValue(e.target.value)} 
      />
      <p>Estado React: {controlledValue}</p>
      
      <h3>Uncontrolled (defaultValue)</h3>
      <form onSubmit={handleUncontrolledSubmit}>
        <input ref={uncontrolledRef} defaultValue="Inicial (solo mount)" />
        <button type="submit">Obtener valor</button>
      </form>
      <p>Último submit: {uncontrolledSubmitted}</p>
      <p>Nota: Cambiar el input NO actualiza estado React</p>
    </div>
  );
}

// ============================================
// 3. FORMULARIO COMPLETO UNCONTROLLED
// ============================================

function FullUncontrolledForm() {
  const formRef = React.useRef(null);
  const [lastSubmit, setLastSubmit] = React.useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // FormData API - nativo del navegador
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Para checkboxes múltiples, getAll
    const skills = formData.getAll('skills');
    data.skills = skills;
    
    setLastSubmit(data);
    console.log('Form data:', data);
  };
  
  const handleReset = () => {
    formRef.current?.reset(); // Reset nativo del form
    setLastSubmit(null);
  };
  
  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <label>Nombre: <input name="name" defaultValue="Juan" /></label>
        </div>
        <div>
          <label>Email: <input type="email" name="email" defaultValue="juan@test.com" /></label>
        </div>
        <div>
          <label>Bio: <textarea name="bio" defaultValue="Desarrollador"></textarea></label>
        </div>
        <fieldset>
          <legend>Skills</legend>
          <label><input type="checkbox" name="skills" value="react" defaultChecked /> React</label>
          <label><input type="checkbox" name="skills" value="vue" /> Vue</label>
          <label><input type="checkbox" name="skills" value="angular" /> Angular</label>
        </fieldset>
        <fieldset>
          <legend>Role</legend>
          <label><input type="radio" name="role" value="user" defaultChecked /> User</label>
          <label><input type="radio" name="role" value="admin" /> Admin</label>
        </fieldset>
        <div>
          <label>
            <input type="checkbox" name="newsletter" defaultChecked />
            Newsletter
          </label>
        </div>
        <button type="submit">Enviar</button>
        <button type="button" onClick={handleReset}>Reset Nativo</button>
      </form>
      
      {lastSubmit && (
        <div>
          <h4>Datos enviados:</h4>
          <pre>{JSON.stringify(lastSubmit, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// ============================================
// 4. FILE INPUT (SOLO UNCONTROLLED)
// ============================================

function FileInputDemo() {
  const fileInputRef = React.useRef(null);
  const [files, setFiles] = React.useState([]);
  const [preview, setPreview] = React.useState(null);
  
  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const filesArray = Array.from(fileList);
    setFiles(filesArray);
    
    // Preview de imagen
    if (filesArray[0]?.type.startsWith('image/')) {
      const url = URL.createObjectURL(filesArray[0]);
      setPreview(url);
    }
  };
  
  const handleUpload = async () => {
    if (files.length === 0) return;
    
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    
    // Simular upload
    console.log('Uploading:', formData);
    alert(`Subiendo ${files.length} archivo(s)...`);
  };
  
  const clearFiles = () => {
    fileInputRef.current.value = '';
    setFiles([]);
    setPreview(null);
  };
  
  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload" style={{ cursor: 'pointer', padding: '10px 20px', background: '#3b82f6', color: 'white', borderRadius: 4, display: 'inline-block' }}>
        Seleccionar archivos
      </label>
      <button onClick={handleUpload} disabled={files.length === 0}>Subir</button>
      <button onClick={clearFiles}>Limpiar</button>
      
      {preview && (
        <div style={{ marginTop: 10 }}>
          <img src={preview} alt="Preview" style={{ maxWidth: 200 }} />
        </div>
      )}
      
      <ul>
        {files.map((file, i) => (
          <li key={i}>{file.name} ({(file.size / 1024).toFixed(1)} KB)</li>
        ))}
      </ul>
    </div>
  );
}

// ============================================
// 5. USEREF PARA VALORES MUTABLES (SIN RE-RENDER)
// ============================================

function MutableRefExample() {
  const [renderCount, setRenderCount] = React.useState(0);
  const countRef = React.useRef(0); // Mutable, no triggera render
  
  const incrementState = () => {
    setRenderCount(c => c + 1);
  };
  
  const incrementRef = () => {
    countRef.current += 1;
    console.log('Ref count:', countRef.current); // Solo log, sin render
  };
  
  const incrementBoth = () => {
    incrementState();
    incrementRef();
  };
  
  return (
    <div>
      <p>Render count (state): {renderCount}</p>
      <p>Ref count (mutable): {countRef.current}</p>
      <button onClick={incrementState}>Increment State</button>
      <button onClick={incrementRef}>Increment Ref (no render)</button>
      <button onClick={incrementBoth}>Increment Both</button>
    </div>
  );
}

// ============================================
// 6. FORWARDREF PARA EXPONER MÉTODOS IMPERATIVOS
// ============================================

const CustomTextArea = React.forwardRef((props, ref) => {
  const textareaRef = React.useRef(null);
  
  // Exponer API imperativa al padre
  React.useImperativeHandle(ref, () => ({
    focus: () => textareaRef.current?.focus(),
    getValue: () => textareaRef.current?.value,
    setValue: (value) => { if (textareaRef.current) textareaRef.current.value = value; },
    select: () => textareaRef.current?.select(),
    clear: () => { if (textareaRef.current) textareaRef.current.value = ''; }
  }));
  
  return <textarea ref={textareaRef} {...props} />;
});

function ForwardRefDemo() {
  const textareaRef = React.useRef(null);
  
  return (
    <div>
      <CustomTextArea 
        ref={textareaRef}
        defaultValue="Escribe aquí..."
        rows={4}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={() => textareaRef.current?.focus()}>Focus</button>
      <button onClick={() => alert(textareaRef.current?.getValue())}>Get Value</button>
      <button onClick={() => textareaRef.current?.setValue('Nuevo valor')}>Set Value</button>
      <button onClick={() => textareaRef.current?.select()}>Select All</button>
      <button onClick={() => textareaRef.current?.clear()}>Clear</button>
    </div>
  );
}

// ============================================
// 7. HÍBRIDO: CONTROLLED + UNCONTROLLED
// ============================================

// Patrón: controlled para validación, uncontrolled para performance
function HybridForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [errors, setErrors] = React.useState({});
  
  // Refs para inputs (uncontrolled internamente)
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  
  // Sincronizar refs con state solo al blur/submit
  const syncFromRefs = () => {
    setName(nameRef.current?.value || '');
    setEmail(emailRef.current?.value || '');
  };
  
  const validate = () => {
    syncFromRefs();
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Nombre requerido';
    if (!email.trim()) newErrors.email = 'Email requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Email inválido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Válido: ' + JSON.stringify({ name, email }));
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre: </label>
        <input
          ref={nameRef}
          defaultValue={name}
          onBlur={syncFromRefs}
          style={{ borderColor: errors.name ? 'red' : '' }}
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      </div>
      <div>
        <label>Email: </label>
        <input
          ref={emailRef}
          type="email"
          defaultValue={email}
          onBlur={syncFromRefs}
          style={{ borderColor: errors.email ? 'red' : '' }}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      <button type="submit">Validar y Enviar</button>
    </form>
  );
}

// ============================================
// 8. CUÁNDO USAR CADA UNO
// ============================================

/*
DECISIÓN: Controlled vs Uncontrolled

✅ CONTROLLED (useState + value + onChange):
- Validación en tiempo real
- Inputs que dependen entre sí
- Transformar/formatear input al escribir
- Mostrar preview mientras escribes
- Deshabilitar botón submit hasta válido
- Inputs que se resetean desde fuera
- Testing fácil (state predecible)

✅ UNCONTROLLED (ref + defaultValue):
- Formularios simples sin validación compleja
- File inputs (siempre uncontrolled)
- Integración con librerías no-React
- Performance: muchos inputs, evitar re-renders
- Valores que solo se leen al submit
- Reset nativo del formulario

✅ HÍBRIDO:
- Validación solo al blur/submit
- Many inputs, performance crítica
- Migración gradual
*/

function WhenToUseEach() {
  return (
    <div>
      <h3>Guía de decisión</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: 8, textAlign: 'left' }}>Caso</th>
            <th style={{ padding: 8, textAlign: 'left' }}>Recomendado</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ padding: 8 }}>Validación en tiempo real</td><td style={{ padding: 8 }}>Controlled</td></tr>
          <tr><td style={{ padding: 8 }}>File upload</td><td style={{ padding: 8 }}>Uncontrolled</td></tr>
          <tr><td style={{ padding: 8 }}>Muchos inputs (50+)</td><td style={{ padding: 8 }}>Uncontrolled/Híbrido</td></tr>
          <tr><td style={{ padding: 8 }}>Inputs dependientes</td><td style={{ padding: 8 }}>Controlled</td></tr>
          <tr><td style={{ padding: 8 }}>Solo leer al submit</td><td style={{ padding: 8 }}>Uncontrolled</td></tr>
          <tr><td style={{ padding: 8 }}>Reset desde padre</td><td style={{ padding: 8 }}>Controlled</td></tr>
          <tr><td style={{ padding: 8 }}>Integración jQuery/legacy</td><td style={{ padding: 8 }}>Uncontrolled</td></tr>
        </tbody>
      </table>
    </div>
  );
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function UncontrolledFormsDemo() {
  return (
    <section>
      <h1>Uncontrolled Forms</h1>
      
      <BasicUncontrolled />
      <hr />
      <DefaultValueVsValue />
      <hr />
      <FullUncontrolledForm />
      <hr />
      <FileInputDemo />
      <hr />
      <MutableRefExample />
      <hr />
      <ForwardRefDemo />
      <hr />
      <HybridForm />
      <hr />
      <WhenToUseEach />
    </section>
  );
}