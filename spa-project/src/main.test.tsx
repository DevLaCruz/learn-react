/**
 * main.test.tsx - Test básico de ejemplo/smoke test
 * 
 * POR QUÉ .tsx Y NO .ts:
 * - ESTE ARCHIVO NO USA JSX REALMENTE (es solo un test simple)
 * - Podría ser .ts perfectamente ya que no hay <Componentes/> ni HTML-like
 * - Probablemente se nombró .tsx por convención del proyecto (tests de React en .tsx)
 * - RECOMENDACIÓN: Cambiar a .ts ya que no hay JSX, es más ligero y claro
 * - Si en el futuro se agregan tests de componentes, sí necesitaría .tsx
 */

import { describe, test, expect } from 'vitest'; // Importa utilidades de testing (destructuring para claridad)

describe('Testeo', () => { // Suite de pruebas básica (nombre en español "Testing")
  test('should return true', () => { // Test simple que siempre pasa (smoke test)
    expect(true).toBeTruthy(); // Verifica que true sea truthy (siempre pasa)
  });
});