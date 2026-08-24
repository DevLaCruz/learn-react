/**
 * 07-forms-uncontrolled.tsx - Formularios Uncontrolled con TypeScript
 */

import React from 'react';

// ============================================
// 1. USEREF BÁSICO TIPADO
// ============================================

function BasicUncontrolledTyped() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [submittedValue, setSubmittedValue] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value ?? '';
    setSubmittedValue(value);
    console.log('Submitted:', value);
  };

  const focusInput = () => inputRef.current?.focus();
  const clearInput = () => inputRef.current?.value = '';

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre (uncontrolled):
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

function DefaultValueVsValueTyped() {
  const [controlledValue, setControlledValue] = React.useState('Controlado');
  const uncontrolledRef = React.useRef<HTMLInputElement>(null);
  const [uncontrolledSubmitted, setUncontrolledSubmitted] = React.useState('');

  const handleUncontrolledSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUncontrolledSubmitted(uncontrolledRef.current?.value ?? '');
  };

  return (
    <div>
      <h3>Controlled (value)</h3>
      <input value={controlledValue} onChange={e => setControlledValue((e.target as HTMLInputElement).value)} />
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
// 3. FORMULARIO COMPLETO UNCONTROLLED TIPADO
// ============================================

interface FormValues {
  name: string;
  email: string;
  skills: string[];
  role: string;
}

function FullUncontrolledFormTyped() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [lastSubmit, setLastSubmit] = React.useState<FormValues | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries()) as FormValues;
    const skills = formData.getAll('skills') as string[];
    data.skills = skills;
    setLastSubmit(data);
    console.log('Form data:', data);
  };

  const handleReset = () => {
    formRef.current?.reset();
    setLastSubmit(null);
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div><label>Nombre: <input name="name" defaultValue="Juan" /></label></div>
        <div><label>Email: <input type="email" name="email" defaultValue="juan@test.com" /></label></div>
        <div><label>Bio: <textarea name="bio" defaultValue="Desarrollador"></textarea></label></div>
        <fieldset><legend>Skills</legend>
          <label><input type="checkbox" name="skills" value="react" defaultChecked /> React</label>
          <label><input type="checkbox" name="skills" value="vue" /> Vue</label>
          <label><input type="checkbox" name="skills" value="angular" /> Angular</label></fieldset>
        <fieldset><legend>Role</legend>
          <label><input type="radio" name="role" value="user" defaultChecked /> User</label>
          <label><input type="radio" name="role" value="admin" /> Admin</label></fieldset>
        <div><label><input type="checkbox" name="newsletter" defaultChecked /> Newsletter</label></div>
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

function FileInputDemoTyped() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    const filesArray = Array.from(fileList);
    setFiles(filesArray);
    if (filesArray[0]?.type.startsWith('image/')) {
      const url = URL.createObjectURL(filesArray[0]);
      setPreview(url);
    }
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    console.log('Uploading:', files);
    alert(`Subiendo ${files.length} archivo(s)...`);
  };

  const clearFiles = () => {
    fileInputRef.current.value = '';
    setFiles([]);
    setPreview(null);
  };

  return (
    <div>
      <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" />
      <label htmlFor="file-upload" style={{ cursor: 'pointer', padding: '10px 20px', background: '#3b82f6', color: 'white', borderRadius: 4, display: 'inline-block' }}>
        Seleccionar archivos
      </label>
      <button onClick={handleUpload} disabled={files.length === 0}>Subir</button>
      <button onClick={clearFiles}>Limpiar</button>
      {preview && <div style={{ marginTop: 10 }}><img src={preview} alt="Preview" style={{ maxWidth: 200 }} /></div>}
      <ul>{files.map((file, i) => <li key={i}>{file.name} ({(file.size / 1024).toFixed(1)} KB)</li>)}</ul>
    </div>
  );
}

// ============================================
// 5. USEREF PARA VALORES MUTABLES (SIN RE-RENDER)
// ============================================

function MutableRefExampleTyped() {
  const [renderCount, setRenderCount] = React.useState(0);
  const countRef = React.useRef(0);

  const incrementState = () => setRenderCount(c => c + 1);
  const incrementRef = () => { countRef.current += 1; console.log('Ref count:', countRef.current); };
  const incrementBoth = () => { incrementState(); incrementRef(); };

  return (
    <div>
      <p>Render count (state): {renderCount}</p>
      <p>Ref count (mutable): {countRef.current}</p>
      <button onClick={incrementState}>Increment State</button>
      <button onClick={incrementRef}>Increment Ref</button>
      <button onClick={incrementBoth}>Increment Both</button>
    </div>
  );
}

// ============================================
// 6. FORWARDREF CON USEIMPERATIVEHANDLE TIPADO
// ============================================

const CustomTextAreaTyped = React.forwardRef<HTMLTextAreaElement, { defaultValue?: string }>(
  (props, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(ref, () => ({
      focus: () => textareaRef.current?.focus(),
      getValue: () => textareaRef.current?.value,
      setValue: (value: string) => { if (textareaRef.current) textareaRef.current.value = value; },
      select: () => textareaRef.current?.select(),
      clear: () => { if (textareaRef.current) textareaRef.current.value = ''; }
    }));
    return <textarea ref={textareaRef} {...props} defaultValue={props.defaultValue ?? ''} />;
  }
);

function ForwardRefDemoTyped() {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div>
      <CustomTextAreaTyped ref={textareaRef} defaultValue="Escribe aquí..." rows={4} style={{ width: '100%', marginBottom: 10 }} />
      <button onClick={() => textareaRef.current?.focus()}>Focus</button>
      <button onClick={() => alert(textareaRef.current?.getValue())}>Get Value</button>
      <button onClick={() => textareaRef.current?.setValue('Nuevo valor')}>Set Value</button>
      <button onClick={() => textareaRef.current?.select()}>Select All</button>
      <button onClick={() => textareaRef.current?.clear()}>Clear</button>
    </div>
  );
}

// ============================================
// 7. HÍBRIDO: CONTROLLED + UNCONTROLLED TIPADO
// ============================================

function HybridFormTyped() {
  interface Form { name: string; email: string; errors: { name?: string; email?: string } };
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [errors, setErrors] = React.useState<{ name?: string; email?: string }>({});
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  const syncFromRefs = () => { setName(nameRef.current?.value ?? ''); setEmail(emailRef.current?.value ?? ''); };

  const validate = () => { syncFromRefs(); const newErrors: { name?: string; email?: string } = {}; if (!name.trim()) newErrors.name = 'Nombre requerido'; if (!email.trim()) newErrors.email = 'Email requerido'; setErrors(newErrors); return Object.keys(newErrors).length === 0; };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (validate()) alert('Válido: ' + JSON.stringify({ name, email })); };

  return (
    <form onSubmit={handleSubmit}>
      <div><label>Nombre: <input ref={nameRef} defaultValue={name} onBlur={syncFromRefs} style={{ borderColor: errors.name ? 'red' : '' }} />{errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}</div>
      <div><label>Email: <input ref={emailRef} type="email" defaultValue={email} onBlur={syncFromRefs} style={{ borderColor: errors.email ? 'red' : '' }} />{errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}</div>
      <button type="submit">Validar y Enviar</button>
    </form>
  );
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function UncontrolledFormsDemo() {
  return (
    <section>
      <h1>Uncontrolled Forms TypeScript</h1>
      <BasicUncontrolledTyped />
      <hr />
      <DefaultValueVsValueTyped />
      <hr />
      <FullUncontrolledFormTyped />
      <hr />
      <FileInputDemoTyped />
      <hr />
      <MutableRefExampleTyped />
      <hr />
      <ForwardRefDemoTyped />
      <hr />
      <HybridFormTyped />
    </section>
  );
}