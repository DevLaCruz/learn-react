/**
 * hero.api.test.ts - Pruebas unitarias para la configuración de la API de héroes
 * 
 * POR QUÉ .ts Y NO .tsx:
 * - Este archivo NO contiene JSX (ningún componente React, ningún elemento HTML-like)
 * - Solo prueba configuración de Axios (objeto JavaScript plano)
 * - TypeScript (.ts) es suficiente para tipado estático sin necesidad de transpilar JSX
 * - Usar .ts es más ligero y rápido para archivos sin JSX
 */

import { describe, expect, test } from "vitest"; // Importa funciones de testing de Vitest: describe (agrupa tests), expect (aserciones), test (define un test)
import { heroApi } from "./hero.api"; // Importa la instancia configurada de Axios para la API de héroes

const BASE_URL = import.meta.env.VITE_API_URL; // Obtiene la URL base de la API desde variables de entorno (Vite expone import.meta.env)

describe('HeroApi', () => { // Suite de pruebas: agrupa tests relacionados con la configuración de HeroApi
    test('should be configure pointing to the testing server', () => { // Test individual: verifica que la API apunte al servidor de testing
        expect(heroApi).toBeDefined(); // Verifica que heroApi existe (no es null/undefined)
        expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`); // Verifica que la baseURL de Axios coincida con la esperada (ej: http://localhost:3001/api/heroes)
        expect(BASE_URL).toContain('3001'); // Verifica que la URL base contenga el puerto 3001 (puerto del servidor de testing)
    })
})