/**
 * get-hero.action.test.ts - Pruebas para la acción getHeroAction
 * 
 * POR QUÉ .ts Y NO .tsx:
 * - Prueba funciones asíncronas (server actions) que obtienen datos de un héroe
 * - NO hay componentes React, NO hay JSX
 * - Verifica estructura de datos, manejo de errores y URLs de imágenes
 * - TypeScript puro es suficiente y más performante para lógica de negocio
 */

import { describe, expect, test } from 'vitest'; // Utilidades de testing de Vitest
import { getHeroAction } from './get-hero.action'; // Importa la acción a probar (obtiene un héroe por slug)

describe('getHeroAction', () => { // Suite de pruebas para getHeroAction
  test('should fetch hero data and return with complete image url', async () => { // Test: verifica obtención exitosa de héroe con URL de imagen completa
    const result = await getHeroAction('clark-kent'); // Llama a la acción con slug 'clark-kent' (Superman)

    expect(result.image).toContain('http'); // Verifica que la imagen sea URL absoluta (contiene 'http')
    expect(result).toStrictEqual({ // Verifica estructura completa y exacta del objeto héroe devuelto
      id: expect.any(String),
      name: expect.any(String),
      slug: expect.any(String),
      alias: 'Superman', // Valor exacto esperado para alias
      powers: [ // Array exacto de poderes esperados
        'Súper fuerza',
        'Vuelo',
        'Visión de calor',
        'Visión de rayos X',
        'Invulnerabilidad',
        'Súper velocidad',
      ],
      description:
        'El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.',
      strength: 10, // Valores numéricos exactos de stats
      intelligence: 8,
      speed: 9,
      durability: 10,
      team: 'Liga de la Justicia',
      image: 'http://localhost:3001/images/1.jpeg', // URL exacta de imagen esperada
      firstAppearance: '1938',
      status: 'Active',
      category: 'Hero',
      universe: 'DC',
    });
  });

  test('should throw an error if hero is not found', async () => { // Test: verifica manejo de error 404 cuando héroe no existe
    const idSlug = 'batman-2'; // Slug inexistente para forzar 404

    const result = await getHeroAction(idSlug).catch((error) => { // Captura el error lanzado por la acción
      expect(error).toBeDefined(); // Verifica que existe un error
      expect(error.message).toBe('Request failed with status code 404'); // Verifica mensaje de error específico de Axios para 404
    });

    expect(result).toBeUndefined(); // Verifica que el resultado sea undefined (la promise rechazó)
  });
});