import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { SearchControls } from './SearchControls';

// ==========================================
// 1. MOCK DE APIS DEL NAVEGADOR
// ==========================================

/**
 * JSDOM (el entorno de pruebas donde corre Vitest) no implementa ResizeObserver.
 * Componentes de Shadcn/Radix (como Slider y Accordion) fallan al renderizar
 * si esta API no está definida globalmente en el objeto `window`.
 */
if (typeof window.ResizeObserver === 'undefined') {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserver;
}

// ==========================================
// 2. HELPERS Y ESPÍAS DE NAVEGACIÓN
// ==========================================

/**
 * Componente espía para verificar cambios en la URL.
 * Dado que `SearchControls` sincroniza su estado con los Query Params vía `useSearchParams`,
 * este componente renderiza `location.search` en el DOM para poder asertar
 * que los parámetros de búsqueda cambiaron tras una interacción de usuario.
 */
const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-search">{location.search}</div>;
};

/**
 * Función auxiliar para renderizar el componente dentro del contexto de React Router.
 * @param initialEntries Array con la URL y query params iniciales en memoria (ej: ['/?name=Batman'])
 */
const renderWithRouter = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControls />
      <LocationDisplay />
    </MemoryRouter>
  );
};

// ==========================================
// 3. SUITE DE PRUEBAS
// ==========================================

describe('SearchControls', () => {
  // Test 1: Snapshot y renderizado inicial
  test('should render SearchControls with default values', () => {
    // Renderizamos con la ruta raíz por defecto ('/')
    const { container } = renderWithRouter();

    // Valida que la estructura del DOM no haya sufrido cambios inesperados
    expect(container).toMatchSnapshot();
  });

  // Test 2: Lectura de query params al inicializar
  test('should set input value when search param "name" is set', () => {
    // Montamos el componente simulando que la URL ya viene con "?name=Batman"
    renderWithRouter(['/?name=Batman']);

    // Obtenemos el input por su placeholder accesible
    const input = screen.getByPlaceholderText<HTMLInputElement>(
      'Search heroes, villains, powers, teams...'
    );

    // screen.debug(input)

    // Verificamos que el defaultValue del input tome el valor del search param
    expect(input.value).toBe('Batman');
  });

  // Test 3: Interacción de teclado y actualización de search params
  test('should update search params when typing and pressing Enter', () => {
    renderWithRouter(['/?name=Batman']);

    const input = screen.getByPlaceholderText(
      'Search heroes, villains, powers, teams...'
    );

    // 1. Simulamos que el usuario escribe un nuevo término en el input
    fireEvent.change(input, { target: { value: 'Superman' } });

    // 2. Simulamos la pulsación de la tecla Enter
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // 3. Verificamos mediante el espía que la URL se haya actualizado con el nuevo valor
    const locationSearch = screen.getByTestId('location-search');
    expect(locationSearch.textContent).toContain('name=Superman');
  });

  // Test 4: Alternancia (toggle) del acordeón de filtros
  test('should toggle active-accordion param when Filters button is clicked', () => {
    renderWithRouter(['/']);

    // Buscamos el botón de filtros por su rol accesible y texto
    const filterButton = screen.getByRole('button', { name: /filters/i });
    const locationSearch = screen.getByTestId('location-search');

    // Primer clic: debe agregar el parámetro para abrir el panel de filtros avanzados
    fireEvent.click(filterButton);
    expect(locationSearch.textContent).toContain('active-accordion=advance-filters');

    // Segundo clic: debe limpiar el parámetro para cerrar el acordeón
    fireEvent.click(filterButton);
    expect(locationSearch.textContent).toBe('?active-accordion=');
  });

  // Test 5: Estado visual abierto del acordeón según URL inicial
  test('should accordion item have data-state="open" when active-accordion param is set', () => {
    const { container } = renderWithRouter(['/?active-accordion=advance-filters']);

    // Radix Accordion inyecta el atributo `data-state="open"` cuando está expandido
    const accordionItem = container.querySelector('[data-state="open"]');
    expect(accordionItem).toBeTruthy();

    // Verificamos que el contenido interno de filtros sea visible
    expect(screen.getByText('Advanced Filters')).toBeInTheDocument();
  });

  // Test 6: Estado visual cerrado del acordeón según URL inicial
  test('should accordion item have data-state="closed" when active-accordion param is not set', () => {
    const { container } = renderWithRouter(['/']);

    // Verificamos que el contenedor tenga el estado "closed" por defecto
    const accordionItem = container.querySelector('[data-state="closed"]');
    expect(accordionItem).toBeTruthy();
  });

  // Test 7: Interacción con el Slider y control de valores
  test('should set strength from query params and update on slider interaction', () => {
    // Montamos con fuerza en 5 y acordeón abierto para que el slider esté disponible en el DOM
    renderWithRouter(['/?active-accordion=advance-filters&strength=5']);

    // Verificamos que la etiqueta refleje el valor inicial del search param
    expect(screen.getByText('Minimum Strength: 5/10')).toBeInTheDocument();

    // Obtenemos el elemento slider mediante su rol accesible
    const slider = screen.getByRole('slider');
    expect(slider.getAttribute('aria-valuenow')).toBe('5');

    // Simulamos presionar la flecha derecha en el teclado para incrementar el valor
    fireEvent.keyDown(slider, { key: 'ArrowRight' });

    // Verificamos que el cambio en el Slider actualizó los search params a 6
    const locationSearch = screen.getByTestId('location-search');
    expect(locationSearch.textContent).toContain('strength=6');
  });
});