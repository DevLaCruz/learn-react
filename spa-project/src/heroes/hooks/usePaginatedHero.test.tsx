/**
 * usePaginatedHero.test.tsx - Pruebas para el hook usePaginatedHero (React Query)
 * 
 * POR QUÉ .tsx Y NO .ts:
 * - USA JSX en el componente wrapper tanStackCustomProvider (línea 23-26)
 * - renderHook de @testing-library/react requiere un wrapper que es un componente React (JSX)
 * - QueryClientProvider es un componente React que debe renderizarse con JSX
 * - TypeScript no puede transpilar JSX; se necesita .tsx para que el compilador procese <QueryClientProvider>...</QueryClientProvider>
 * - Si quitas el wrapper y usas solo lógica pura, podrías usar .ts, pero aquí es obligatorio .tsx
 */

import type { PropsWithChildren } from 'react'; // Tipo para tipar componentes que reciben children (React)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Cliente y Provider de TanStack Query (React Query)
import { renderHook, waitFor } from '@testing-library/react'; // Utilidades para testear hooks de React
import { describe, expect, test, vi, beforeEach } from 'vitest'; // vi = utilidades de mocking de Vitest
import { usePaginatedHero } from './usePaginatedHero'; // Hook a probar (usa React Query internamente)
import { getHeroesByPageAction } from '../actions/get-heroes-by-page.action'; // Acción que el hook llama (será mockeada)


// Mock del módulo completo: reemplaza getHeroesByPageAction con un mock function de Vitest
vi.mock('../actions/get-heroes-by-page.action', () => ({
  getHeroesByPageAction: vi.fn(), // fn() crea una función mock que se puede controlar (.mockResolvedValue, .toHaveBeenCalled, etc.)
}));

// Obtiene referencia tipada al mock para usar mockResolvedValue, mockRejectedValue, etc.
const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

// Crea cliente de Query compartido para todos los tests (configurado sin retry para tests rápidos)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Desactiva reintentos: los tests fallan rápido si hay error
    },
  },
});

// Factory function que retorna un componente wrapper (JSX) para proveer QueryClient a renderHook
// PropsWithChildren tipa correctamente el prop 'children' que React inyecta
const tanStackCustomProvider = () => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePaginatedHero', () => { // Suite de pruebas para el hook de paginación
  beforeEach(() => { // Se ejecuta antes de cada test para limpiar estado
    vi.clearAllMocks(); // Limpia historial de llamadas de TODOS los mocks (vi.fn)
    queryClient.clear(); // Limpia cache de React Query entre tests (aislamiento)
  });

  test('should return the initial state (isLoading)', () => { // Test: estado inicial del hook antes de resolver la query
    const { result } = renderHook(() => usePaginatedHero(1, 6), { // Renderiza el hook con página 1, límite 6
      wrapper: tanStackCustomProvider(), // Provee QueryClient via wrapper JSX
    });

    // Verifica estado inicial: cargando, sin error, sin data
    expect(result.current.isLoading).toBe(true); // isLoading = true mientras fetch pendiente
    expect(result.current.isError).toBe(false); // No hay error aún
    expect(result.current.data).toBe(undefined); // Data es undefined inicialmente
    expect(result.current.data).toBeUndefined(); // Redundante pero explícito (toBe vs toBeUndefined)
  });

  test('should return success state with data when API call succeeds', async () => { // Test: query exitosa → estado success con data
    const mockHeroesData = { // Data simulada que devolverá el mock
      total: 20,
      pages: 4,
      heroes: [],
    };

    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData); // Configura mock para resolver con esta data

    const { result } = renderHook(() => usePaginatedHero(1, 6), {
      wrapper: tanStackCustomProvider(),
    });

    // waitFor espera a que la condición se cumpla (reintenta hasta timeout)
    // Necesario porque React Query es asíncrono y el estado cambia de loading → success
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.status).toBe('success'); // status es 'success' (alias de isSuccess)
    expect(mockGetHeroesByPageAction).toHaveBeenCalled(); // Verifica que se llamó al menos una vez
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, 'all'); // Verifica argumentos exactos (page, limit, category por defecto)
  });

  test('should call getHeroesByPageActions with arguments', async () => { // Test: argumentos personalizados se pasan correctamente
    const mockHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };

    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

    const { result } = renderHook(() => usePaginatedHero(2, 16, 'heroesABC'), { // Parámetros custom
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.status).toBe('success');
    expect(mockGetHeroesByPageAction).toHaveBeenCalled();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(2, 16, 'heroesABC'); // Verifica args exactos pasados
  });
});