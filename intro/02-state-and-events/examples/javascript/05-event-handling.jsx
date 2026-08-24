/**
 * 05-event-handling.jsx - Manejo de Eventos en React
 */

import React from 'react';

// ============================================
// 1. EVENTOS BÁSICOS
// ============================================

function BasicEvents() {
  const [clicks, setClicks] = React.useState(0);
  const [hoverCount, setHoverCount] = React.useState(0);
  
  const handleClick = () => setClicks(c => c + 1);
  const handleDoubleClick = () => setClicks(c => c + 2);
  const handleMouseEnter = () => setHoverCount(h => h + 1);
  const handleMouseLeave = () => setHoverCount(h => h - 1);
  
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
      <p>Haz click, double-click, entra/sale del mouse</p>
    </div>
  );
}

// ============================================
// 2. EVENTOS DE FORMULARIO
// ============================================

function FormEvents() {
  const [formData, setFormData] = React.useState({
    text: '',
    number: 0,
    email: '',
    password: '',
    checkbox: false,
    select: 'option1',
    textarea: '',
    file: null
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir recarga de página
    console.log('Submit:', formData);
    alert('Form submitted! Check console');
  };
  
  const handleBlur = (e) => {
    console.log('Blur:', e.target.name, e.target.value);
  };
  
  const handleFocus = (e) => {
    console.log('Focus:', e.target.name);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Text: <input name="text" value={formData.text} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} /></label>
      </div>
      <div>
        <label>Number: <input type="number" name="number" value={formData.number} onChange={handleChange} /></label>
      </div>
      <div>
        <label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} /></label>
      </div>
      <div>
        <label>Password: <input type="password" name="password" value={formData.password} onChange={handleChange} /></label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="checkbox" checked={formData.checkbox} onChange={handleChange} />
          Checkbox
        </label>
      </div>
      <div>
        <label>
          Select:
          <select name="select" value={formData.select} onChange={handleChange}>
            <option value="option1">Opción 1</option>
            <option value="option2">Opción 2</option>
            <option value="option3">Opción 3</option>
          </select>
        </label>
      </div>
      <div>
        <label>Textarea: <textarea name="textarea" value={formData.textarea} onChange={handleChange} /></label>
      </div>
      <div>
        <label>File: <input type="file" name="file" onChange={handleChange} /></label>
      </div>
      <button type="submit">Enviar</button>
      <button type="button" onClick={() => setFormData({ text: '', number: 0, email: '', password: '', checkbox: false, select: 'option1', textarea: '', file: null })}>Reset</button>
    </form>
  );
}

// ============================================
// 3. EVENTOS DE TECLADO
// ============================================

function KeyboardEvents() {
  const [keys, setKeys] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  
  const handleKeyDown = (e) => {
    setKeys(prev => [...prev.slice(-9), `${e.key} (${e.code})`]);
    
    // Atajos de teclado
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      alert('Ctrl+S presionado - Guardar!');
    }
    if (e.key === 'Escape') {
      setInputValue('');
    }
  };
  
  const handleKeyUp = (e) => {
    console.log('Key up:', e.key);
  };
  
  return (
    <div>
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Escribe aquí (Escape para limpiar, Ctrl+S para alert)"
      />
      <p>Últimas teclas:</p>
      <ul>
        {keys.map((k, i) => <li key={i}>{k}</li>)}
      </ul>
    </div>
  );
}

// ============================================
// 4. EVENTOS DE FOCO
// ============================================

function FocusEvents() {
  const [focusedField, setFocusedField] = React.useState(null);
  const [values, setValues] = React.useState({ field1: '', field2: '', field3: '' });
  
  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);
  
  return (
    <div>
      <p>Campo enfocado: {focusedField || 'ninguno'}</p>
      
      <input
        value={values.field1}
        onChange={e => setValues(v => ({ ...v, field1: e.target.value }))}
        onFocus={() => handleFocus('field1')}
        onBlur={handleBlur}
        placeholder="Campo 1"
      />
      <input
        value={values.field2}
        onChange={e => setValues(v => ({ ...v, field2: e.target.value }))}
        onFocus={() => handleFocus('field2')}
        onBlur={handleBlur}
        placeholder="Campo 2"
      />
      <input
        value={values.field3}
        onChange={e => setValues(v => ({ ...v, field3: e.target.value }))}
        onFocus={() => handleFocus('field3')}
        onBlur={handleBlur}
        placeholder="Campo 3"
      />
    </div>
  );
}

// ============================================
// 5. EVENTOS SINTÉTICOS VS NATIVOS
// ============================================

function SyntheticVsNative() {
  const [syntheticLogs, setSyntheticLogs] = React.useState([]);
  const [nativeLogs, setNativeLogs] = React.useState([]);
  
  const handleSynthetic = (e) => {
    // SyntheticEvent - pooled en React 17-, persistente en 18+
    setSyntheticLogs(prev => [...prev.slice(-4), `type: ${e.type}, target: ${e.target.tagName}, currentTarget: ${e.currentTarget.tagName}, bubbles: ${e.bubbles}`]);
    // e.persist() ya no necesario en React 18+
  };
  
  const handleNative = (e) => {
    // Evento nativo - acceder via e.nativeEvent
    setNativeLogs(prev => [...prev.slice(-4), `native: ${e.nativeEvent.type}, clientX: ${e.nativeEvent.clientX}`]);
  };
  
  return (
    <div>
      <button 
        onClick={handleSynthetic}
        onMouseEnter={handleSynthetic}
        style={{ marginRight: 20 }}
      >
        Synthetic Events
      </button>
      <button 
        onClick={handleNative}
        onMouseEnter={handleNative}
      >
        Native Events
      </button>
      
      <div>
        <h4>Synthetic:</h4>
        <ul>{syntheticLogs.map((l, i) => <li key={i}>{l}</li>)}</ul>
      </div>
      <div>
        <h4>Native:</h4>
        <ul>{nativeLogs.map((l, i) => <li key={i}>{l}</li>)}</ul>
      </div>
    </div>
  );
}

// ============================================
// 6. EVENT DELEGATION Y CAPTURE
// ============================================

function EventDelegation() {
  const [logs, setLogs] = React.useState([]);
  
  // Capture phase: se ejecuta ANTES que bubble
  const handleCaptureClick = (e) => {
    setLogs(prev => [...prev.slice(-4), `CAPTURE: ${e.currentTarget.id} -> ${e.target.id}`]);
  };
  
  // Bubble phase: normal (default)
  const handleBubbleClick = (e) => {
    setLogs(prev => [...prev.slice(-4), `BUBBLE: ${e.currentTarget.id} -> ${e.target.id}`]);
  };
  
  // Detener propagación
  const stopPropagation = (e) => {
    e.stopPropagation();
    setLogs(prev => [...prev.slice(-4), `STOPPED at ${e.currentTarget.id}`]);
  };
  
  return (
    <div 
      id="parent" 
      onClickCapture={handleCaptureClick}
      onClick={handleBubbleClick}
      style={{ padding: 20, background: '#f0f0f0' }}
    >
      Parent (click capture + bubble)
      <div 
        id="child" 
        onClickCapture={handleCaptureClick}
        onClick={handleBubbleClick}
        style={{ padding: 20, background: '#ddd', margin: 10 }}
      >
        Child
        <button 
          id="button" 
          onClick={stopPropagation}
          style={{ margin: 10 }}
        >
          Botón (stopPropagation)
        </button>
      </div>
      
      <h4>Logs (capture primero, luego bubble):</h4>
      <ul>{logs.map((l, i) => <li key={i}>{l}</li>)}</ul>
    </div>
  );
}

// ============================================
// 7. PASAR ARGUMENTOS A HANDLERS
// ============================================

function PassingArguments() {
  const [items, setItems] = React.useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]);
  
  // ✅ Arrow function inline (crea nueva función cada render)
  const handleDeleteInline = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  // ✅ useCallback para estabilizar (con parámetros via closure)
  const handleDeleteCallback = React.useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);
  
  // ✅ data-attributes (acceder via e.currentTarget.dataset)
  const handleDeleteDataset = (e) => {
    const id = Number(e.currentTarget.dataset.id);
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  // ✅ bind (menos común, crea nueva función)
  const handleDeleteBind = function(id) {
    setItems(prev => prev.filter(item => item.id !== id));
  };
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => handleDeleteInline(item.id)}>Delete Inline</button>
          <button onClick={handleDeleteCallback.bind(null, item.id)}>Delete Bind</button>
          <button data-id={item.id} onClick={handleDeleteDataset}>Delete Dataset</button>
        </li>
      ))}
    </ul>
  );
}

// ============================================
// 8. PREVENTDEFAULT Y STOPPROPAGATION
// ============================================

function PreventDefaultDemo() {
  const [linkClicked, setLinkClicked] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  
  const handleLinkClick = (e) => {
    e.preventDefault(); // Prevenir navegación
    setLinkClicked(true);
    setTimeout(() => setLinkClicked(false), 1000);
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevenir reload
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 1000);
  };
  
  return (
    <div>
      <a href="https://google.com" onClick={handleLinkClick}>
        Enlace a Google (preventDefault)
      </a>
      {linkClicked && <span style={{ color: 'green', marginLeft: 10 }}>¡Click interceptado!</span>}
      
      <form onSubmit={handleFormSubmit} style={{ marginTop: 20 }}>
        <input placeholder="Escribe algo" />
        <button type="submit">Enviar (preventDefault)</button>
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
      <h1>Event Handling</h1>
      
      <BasicEvents />
      <hr />
      <FormEvents />
      <hr />
      <KeyboardEvents />
      <hr />
      <FocusEvents />
      <hr />
      <SyntheticVsNative />
      <hr />
      <EventDelegation />
      <hr />
      <PassingArguments />
      <hr />
      <PreventDefaultDemo />
    </section>
  );
}