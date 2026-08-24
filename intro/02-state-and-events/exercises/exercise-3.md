# Ejercicio 3: Gestión de Formularios Complejo

## Objetivo
Crear un formulario complejo con validación en tiempo real, modo controlado/uncontrolled híbrido, y persistencia local.

## Requisitos

1. **Formulario de Registro:**
   - Campos: nombre, email, password, confirmPassword, términos aceptados
   - Validación en tiempo real (mostrar errores al escribir o al blur)
   - Validación en submit (mosttrar resumen)
   - TypeScript: tipos para el form state y validation errors

2. **Modo híbrido Controlled/Uncontrolled:**
   - Inputs principales controlados (name, email) para validación
   - Inputs secundarios uncontrolled (password strength meter via ref)
   - Usar refs para acceder al DOM cuando necesario
   - State sync via blur o manual

3. **Persistencia:**
   - Guardar el form state en localStorage cada cambio significativo
   - Cargar state guardado al montar
   - Reset al cerrar el formulario

## Estructura esperada:

```tsx
function RegistrationForm() {
  const [form, setForm] = useState<FormState>({...});
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [touched, setTouched] = React.useState<Partial<FormFields>>({});
  const { handleSubmit, handleFieldChange, resetForm } = useForm({
    // config opciones
  });
  
  return (<form {...}>...</form>);
}
```

## Tests de verificación

- [ ] Validación en tiempo real muestra/oculta errors apropiadamente
- [ ] Validación en submit previene envío inválido
- [ ] Modo híbrido: inputs controlados para validation, refs para other purposes
- [ ] localStorage persiste los datos entre recargas
- [ ] TypeScript: types correctos form state y errors
- [ ] Accesibility: labels, error messages asociados via aria-describedby