/**
 * 05-event-handling.tsx - Manejo de Eventos con TypeScript
 */

import React from 'react';

// ============================================
// 1. EVENTOS BÁSICOS TIPADOS
// ============================================

function BasicEventsTyped() {
  const [clicks, setClicks] = React.useState(0);
  const [hoverCount, setHoverCount] = React.useState(0);
  
  // MouseEvent<HTMLDivElement>
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setClicks(c => c + 1);
    console.log('Client:', e.clientX, e.clientY);
  };
  
  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setClicks(c => c + 2);
  };
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoverCount(h => h + 1);
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoverCount(h => h - 1);
  };
  
  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ padding: 20, border: '2px dashed #3b82f6', cursor: 'pointer' }}
    >
      <p>Clicks: {clicks}</p>
      <p>Hover count: {hoverCount}</p>
    </div>
  );
}

// ============================================
// 2. EVENTOS DE FORMULARIO TIPADOS
// ============================================

interface FormData {
  text: string;
  number: number;
  email: string;
  password: string;
  checkbox: boolean;
  select: string;
  textarea: string;
  file: File | null;
}

function FormEventsTyped() {
  const [formData, setFormData] = React.useState<FormData>({
    text: '', number: 0, email: '', password: '', checkbox: false, select: 'option1', textarea: '', file: null
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files?.[0] ?? null : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submit:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div><label>Text: <input name="text" value={formData.text} onChange={handleChange} /></label></div>
      <div><label>Number: <input type="number" name="number" value={formData.number} onChange={handleChange} /></label></div>
      <div><label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} /></label></div>
      <div><label>Password: <input type="password" name="password" value={formData.password} onChange={handleChange} /></label></div>
      <div><label><input type="checkbox" name="checkbox" checked={formData.checkbox} onChange={handleChange} /> Checkbox</label></div>
      <div><label>Select: <select name="select" value={formData.select} onChange={handleChange}><option value="option1">Opción 1</option><option value="option2">Opción 2</option></select></label></div>
      <div><label>Textarea: <textarea name="textarea" value={formData.textarea} onChange={handleChange} /></label></div>
      <div><label>File: <input type="file" name="file" onChange={handleChange} /></label></div>
      <button type="submit">Enviar</button>
    </form>
  );
}

// ============================================
// 3. EVENTOS DE TECLADO TIPADOS
// ============================================

function KeyboardEventsTyped() {
  const [keys, setKeys] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setKeys(prev => [...prev.slice(-9), `${e.key} (${e.code})`]);
    if (e.ctrlKey && e.key === 's') { e.preventDefault(); alert('Ctrl+S!'); }
    if (e.key === 'Escape') setInputValue('');
  };
  
  return (
    <div>
      <input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Escape para limpiar, Ctrl+S para alert" />
      <ul>{keys.map((k, i) => <li key={i}>{k}</li>)}</ul>
    </div>
  );
}

// ============================================
// 4. EVENTOS DE FOCO TIPADOS
// ============================================

function FocusEventsTyped() {
  const [focusedField, setFocusedField] = React.useState<string | null>(null);
  const [values, setValues] = React.useState({ field1: '', field2: '', field3: '' });
  
  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);
  
  return (
    <div>
      <p>Enfocado: {focusedField || 'ninguno'}</p>
      <input value={values.field1} onChange={e => setValues(v => ({ ...v, field1: e.target.value }))} onFocus={() => handleFocus('field1')} onBlur={handleBlur} placeholder="Campo 1" />
      <input value={values.field2} onChange={e => setValues(v => ({ ...v, field2: e.target.value }))} onFocus={() => handleFocus('field2')} onBlur={handleBlur} placeholder="Campo 2" />
    </div>
  );
}

// ============================================
// 5. EVENTOS SINTÉTICOS VS NATIVOS
// ============================================

function SyntheticVsNativeTyped() {
  const [syntheticLogs, setSyntheticLogs] = React.useState<string[]>([]);
  const [nativeLogs, setNativeLogs] = React.useState<string[]>([]);
  
  const handleSynthetic = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSyntheticLogs(prev => [...prev.slice(-4), `type: ${e.type}, target: ${e.target.tagName}, currentTarget: ${e.currentTarget.tagName}`]);
  };
  
  const handleNative = (e: React.MouseEvent<HTMLButtonElement>) => {
    setNativeLogs(prev => [...prev.slice(-4), `native: ${e.nativeEvent.type}, clientX: ${e.nativeEvent.clientX}`]);
  };
  
  return (
    <div>
      <button onClick={handleSynthetic} onMouseEnter={handleSynthetic} style={{ marginRight: 10 }}>Synthetic</button>
      <button onClick={handleNative} onMouseEnter={handleNative}>Native</button>
      <div><h4>Synthetic:</h4><ul>{syntheticLogs.map((l, i) => <li key={i}>{l}</li>)}</ul></div>
      <div><h4>Native:</h4><ul>{nativeLogs.map((l, i) => <li key={i}>{l}</li>)}</ul></div>
    </div>
  );
}

// ============================================
// 6. EVENT DELEGATION Y CAPTURE TIPADOS
// ============================================

function EventDelegationTyped() {
  const [logs, setLogs] = React.useState<string[]>([]);
  
  const handleCaptureClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setLogs(prev => [...prev.slice(-4), `CAPTURE: ${e.currentTarget.id} -> ${e.target.id}`]);
  };
  
  const handleBubbleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setLogs(prev => [...prev.slice(-4), `BUBBLE: ${e.currentTarget.id} -> ${e.target.id}`]);
  };
  
  const stopPropagation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLogs(prev => [...prev.slice(-4), `STOPPED at ${e.currentTarget.id}`]);
  };
  
  return (
    <div id="parent" onClickCapture={handleCaptureClick} onClick={handleBubbleClick} style={{ padding: 20, background: '#f0f0f0' }}>
      Parent
      <div id="child" onClickCapture={handleCaptureClick} onClick={handleBubbleClick} style={{ padding: 20, background: '#ddd', margin: 10 }}>
        Child
        <button id="button" onClick={stopPropagation} style={{ margin: 10 }}>Botón (stopPropagation)</button>
      </div>
      <ul>{logs.map((l, i) => <li key={i}>{l}</li>)}</ul>
    </div>
  );
}

// ============================================
// 7. PASAR ARGUMENTOS A HANDLERS
// ============================================

interface Item { id: number; name: string; }

function PassingArgumentsTyped() {
  const [items, setItems] = React.useState<Item[]>([
    { id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }, { id: 3, name: 'Item 3' }
  ]);
  
  // Arrow inline (nueva función cada render)
  const handleDeleteInline = (id: number) => setItems(prev => prev.filter(item => item.id !== id));
  
  // useCallback estabilizado
  const handleDeleteCallback = React.useCallback((id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);
  
  // data-attributes
  const handleDeleteDataset = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.dataset.id);
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => handleDeleteInline(item.id)}>Delete Inline</button>
          <button onClick={handleDeleteCallback.bind(null, item.id)}>Delete Bind</button>
          <button data-id={String(item.id)} onClick={handleDeleteDataset}>Delete Dataset</button>
        </li>
      ))}
    </ul>
  );
}

// ============================================
// 8. PREVENTDEFAULT Y STOPPROPAGATION
// ============================================

function PreventDefaultDemoTyped() {
  const [linkClicked, setLinkClicked] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLinkClicked(true);
    setTimeout(() => setLinkClicked(false), 1000);
  };
  
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 1000);
  };
  
  return (
    <div>
      <a href="https://google.com" onClick={handleLinkClick}>Enlace (preventDefault)</a>
      {linkClicked && <span style={{ color: 'green', marginLeft: 10 }}>¡Interceptado!</span>}
      <form onSubmit={handleFormSubmit} style={{ marginTop: 20 }}>
        <input placeholder="Escribe" />
        <button type="submit">Enviar</button>
      </form>
      {formSubmitted && <p style={{ color: 'green' }}>¡Formulario interceptado!</p>}
    </div>
  );
}

// ============================================
// COMPONENTE DEMO
// ============================================

export default function EventHandlingDemo() {
  return (
    <section>
      <h1>Event Handling TypeScript</h1>
      <BasicEventsTyped />
      <hr />
      <FormEventsTyped />
      <hr />
      <KeyboardEventsTyped />
      <hr />
      <FocusEventsTyped />
      <hr />
      <SyntheticVsNativeTyped />
      <hr />
      <EventDelegationTyped />
      <hr />
      <PassingArgumentsTyped />
      <hr />
      <PreventDefaultDemoTyped />
    </section>
  );
}