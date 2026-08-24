/**
 * get-heroes-by-page.action.test.ts - Pruebas para getHeroesByPageAction con mocking de Axios
 * 
 * POR QUÉ .ts Y NO .tsx:
 * - Prueba una server action que hace peticiones HTTP paginadas
 * - Usa axios-mock-adapter para simular respuestas del servidor (NO renderiza React)
 * - Verifica parámetros de query, transformación de datos y manejo de tipos de entrada
 * - TypeScript puro: lógica de negocio, mocking HTTP, validación de parámetros
 */

import { beforeEach, describe, expect, test } from 'vitest'; // beforeEach para setup/teardown entre tests
import AxiosMockAdapter from 'axios-mock-adapter'; // Librería para mockear peticiones Axios (simular servidor)

import { getHeroesByPageAction } from './get-heroes-by-page.action'; // Acción a probar (obtiene héroes paginados)
import { heroApi } from '../api/hero.api'; // Instancia Axios real que será mockeada

// Es buena práctica resetear o limpiar despues de cada 1 de las pruebas
// Esto evita que mocks de un test afecten a otro (aislamiento)


const BASE_URL = import.meta.env.VITE_API_URL; // URL base del API desde variables de entorno

describe('getHeroesByPageAction', () => { // Suite de pruebas para la acción de paginación
  const heroesApiMock = new AxiosMockAdapter(heroApi); // Crea mock adapter vinculado a la instancia heroApi real

  beforeEach(() => { // Hook que se ejecuta ANTES de cada test
    heroesApiMock.reset(); // Limpia todos los handlers de mock y historial de peticiones
  });

  test('should return default heroes', async () => { // Test: página por defecto devuelve héroes con URLs de imagen transformadas
    heroesApiMock.onGet('/').reply(200, { // Configura mock: GET a '/' responde 200 con este JSON
      total: 10,
      pages: 2,
      heroes: [
        {
          image: '1.jpg', // Imagen relativa (como viene del servidor)
        },
        {
          image: '2.jpg',
        },
      ],
    });

    const response = await getHeroesByPageAction(1); // Llama a la acción con página 1

    expect(response).toStrictEqual({ // Verifica transformación: URLs relativas → absolutas
      total: 10,
      pages: 2,
      heroes: [
        { image: `${BASE_URL}/images/1.jpg` }, // Verifica que se prependa BASE_URL/images/
        { image: `${BASE_URL}/images/2.jpg` },
      ],
    });
  });

  test('should return the correct heroes when page is not a number', async () => { // Test: entrada inválida (string no numérico) usa valores por defecto
    const responseObject = { // Respuesta mock vacía (solo importa los params enviados)
      total: 10,
      pages: 1,
      heroes: [],
    };

    heroesApiMock.onGet('/').reply(200, responseObject); // Configura respuesta mock
    heroesApiMock.resetHistory(); // Limpia historial para leer solo la petición de este test

    await getHeroesByPageAction('abc' as unknown as number); // Pasa string no numérico (cast para saltar TypeScript)

    const params = heroesApiMock.history.get[0].params; // Obtiene parámetros de query de la petición capturada
    expect(params).toStrictEqual({ limit: 6, offset: 0, category: 'all' }); // Verifica params por defecto (página 1 = offset 0)
  });

  test('should return the correct heroes when page is string number', async () => { // Test: string numérico "5" se parsea correctamente a número
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: [],
    };

    heroesApiMock.onGet('/').reply(200, responseObject);
    heroesApiMock.resetHistory();

    await getHeroesByPageAction('5' as unknown as number); // String "5" → número 5

    const params = heroesApiMock.history.get[0].params;
    expect(params).toStrictEqual({ limit: 6, offset: 24, category: 'all' }); // Página 5: offset = (5-1)*6 = 24
  });

  test('should call the api with correct params', async () => { // Test: parámetros personalizados (page, limit, category) se pasan correctamente
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: [],
    };

    heroesApiMock.onGet('/').reply(200, responseObject);
    heroesApiMock.resetHistory();

    await getHeroesByPageAction(2, 10, 'heroes'); // Página 2, límite 10, categoría 'heroes'

    const params = heroesApiMock.history.get[0].params;
    expect(params).toStrictEqual({ limit: 10, offset: 10, category: 'heroes' }); // Offset = (2-1)*10 = 10
  });
});