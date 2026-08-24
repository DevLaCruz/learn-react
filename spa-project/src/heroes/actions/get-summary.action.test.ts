/**
 * get-summary.action.test.ts - Pruebas para la acción getSummaryAction
 * 
 * POR QUÉ .ts Y NO .tsx:
 * - Este archivo prueba una función asíncrona que hace fetch a la API
 * - NO renderiza componentes React, NO usa JSX
 * - Solo verifica la estructura de datos devuelta (tipos, formas de objetos)
 * - TypeScript (.ts) es ideal para probar lógica de negocio pura y validación de tipos
 */

import { describe, expect, test } from 'vitest'; // Importa utilidades de testing de Vitest
import { getSummaryAction } from './get-summary.action'; // Importa la función a probar (server action que obtiene resumen de héroes)

describe('getSummaryAction', () => { // Suite de pruebas para getSummaryAction
  test('should fetch summary and return complete information', async () => { // Test asíncrono: verifica que el fetch devuelva datos completos y bien tipados
    const summary = await getSummaryAction(); // Ejecuta la acción real (hace llamada HTTP real al servidor de testing)

    expect(summary).toStrictEqual({ // Compara estructura exacta del objeto devuelto (toStrictEqual verifica tipos y estructura)
      totalHeroes: expect.any(Number), // Verifica que totalHeroes sea un número (cualquier número)
      strongestHero: expect.objectContaining({ // Verifica que strongestHero contenga al menos estas propiedades
        id: expect.any(String),
        name: expect.any(String),
        slug: expect.any(String),
        alias: expect.any(String),
        powers: expect.any(Array),
        description: expect.any(String),
        strength: expect.any(Number),
        intelligence: expect.any(Number),
        speed: expect.any(Number),
        durability: expect.any(Number),
        team: expect.any(String),
        image: expect.any(String),
        firstAppearance: expect.any(String),
        status: expect.any(String),
        category: expect.any(String),
        universe: expect.any(String),
      }),
      smartestHero: expect.objectContaining({ // Mismo patrón para smartestHero
        id: expect.any(String),
        name: expect.any(String),
        slug: expect.any(String),
        alias: expect.any(String),
        powers: expect.any(Array),
        description: expect.any(String),
        strength: expect.any(Number),
        intelligence: expect.any(Number),
        speed: expect.any(Number),
        durability: expect.any(Number),
        team: expect.any(String),
        image: expect.any(String),
        firstAppearance: expect.any(String),
        status: expect.any(String),
        category: expect.any(String),
        universe: expect.any(String),
      }),
      heroCount: expect.any(Number), // Verifica conteo de héroes
      villainCount: expect.any(Number), // Verifica conteo de villanos
    });
  });
});