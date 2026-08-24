/**
 * useHeroSummary.test.tsx - Pruebas para el hook useHeroSummary (React Query)
 * 
 * POR QUÉ .tsx Y NO .ts:
 * - USA JSX en tanStackCustomProvider (líneas 15-27): retorna <QueryClientProvider>...</QueryClientProvider>
 * - renderHook requiere un wrapper componente React (JSX obligatorio)
 * - QueryClientProvider es un componente React que envuelve la app para proveer contexto de React Query
 * - Sin .tsx, TypeScript daría error: "JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists"
 * - El wrapper crea un NUEVO QueryClient por test (aislamiento total), por eso se define dentro de la factory
 */

import type { PropsWithChildren } from 'react'; // Tipo para componentes que aceptan children (React)
import { describe, expect, test, vi } from 'vitest'; // vi = mocking utilities de Vitest
import { renderHook, waitFor } from '@testing-library/react'; // renderHook para testear hooks, waitFor para esperar estados asíncronos
import { useHeroSummary } from './useHeroSummary'; // Hook a probar (obtiene resumen de héroes/villanos)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // React Query: cliente y provider
import { getSummaryAction } from '../actions/get-summary.action'; // Acción server que el hook consume (se mockea)
import type { SummaryInformationResponse } from '../types/summary-information.response'; // Tipo para tipar mock data (type-only import)

// Mock del módulo: reemplaza getSummaryAction con vi.fn() controlable
vi.mock('../actions/get-summary.action', () => ({
  getSummaryAction: vi.fn(),
}));

// Referencia tipada al mock para usar .mockResolvedValue, .mockRejectedValue, etc.
const mockGetSummaryAction = vi.mocked(getSummaryAction);

// Factory function que crea un wrapper NUEVO con QueryClient fresco por cada uso
// Esto garantiza aislamiento total entre tests (cada test tiene su cache propio)
const tanStackCustomProvider = () => {
  const queryClient = new QueryClient({ // Nuevo cliente por cada wrapper creado
    defaultOptions: {
      queries: {
        retry: false, // Sin reintentos: tests deterministas y rápidos
      },
    },
  });

  // Retorna componente React (JSX) que provee el cliente a los hooks internos
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useHeroSummary', () => { // Suite de pruebas para el hook de resumen
  test('should return the initial state (isLoading)', () => { // Test: estado inicial loading
    const { result } = renderHook(() => useHeroSummary(), { // Renderiza hook sin argumentos
      wrapper: tanStackCustomProvider(), // Wrapper JSX que provee QueryClient
    });

    // Verificaciones de estado inicial (antes de resolver la promise)
    expect(result.current.isLoading).toBe(true); // Query en curso
    expect(result.current.isError).toBe(false); // Sin error
    expect(result.current.data).toBe(undefined); // Data undefined (toBe compara ===)
    expect(result.current.data).toBeUndefined(); // Data undefined (matcher semántico)
  });

  test('should return success state with data when API call succeeds', async () => { // Test: query exitosa
    const mockSummaryData = { // Data mock tipada con as (cast) para satisfacer TypeScript
      totalHeroes: 10,
      strongestHero: {
        id: '1',
        name: 'Superman',
      },
      smartestHero: {
        id: '2',
        name: 'Batman',
      },
      heroCount: 18,
      villainCount: 7,
    } as SummaryInformationResponse; // Cast: el mock no tiene todos los campos requeridos, pero basta para test

    mockGetSummaryAction.mockResolvedValue(mockSummaryData); // Mock resuelve con data exitosa

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    // waitFor: espera hasta que isSuccess sea true (polling cada 50ms por defecto)
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isError).toBe(false); // Confirmar que no hay error
    expect(mockGetSummaryAction).toHaveBeenCalled(); // Verificar que se llamó a la acción
  });

  test('should return error state when API call fails', async () => { // Test: query fallida
    const mockError = new Error('Failed to fetch summary'); // Error simulado
    mockGetSummaryAction.mockRejectedValue(mockError); // Mock rechaza con error

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    // Espera a que el estado sea error
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    // Verificaciones de estado de error
    expect(result.current.error).toBeDefined(); // Existe objeto error
    expect(result.current.isLoading).toBe(false); // Ya no está cargando
    expect(mockGetSummaryAction).toHaveBeenCalled(); // Se intentó la llamada
    expect(result.current.error?.message).toBe('Failed to fetch summary'); // Mensaje de error correcto
  });
});