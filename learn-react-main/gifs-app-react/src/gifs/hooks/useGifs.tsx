import React, { useRef, useState } from 'react'
import type { Gif } from '../interfaces/gif.interface';
import { getGifsByQuery } from '../actions/get-gifs-by-query-actions';

//const gifsCache: Record<string, Gif[]> = {}

export const useGifs = () => {

  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleTermsClicked = async (term: string) => {
        if(gifsCache.current[term]) {
            setGifs(gifsCache.current[term]);
            return;
        }
        //console.log({term})

        const gifs = await getGifsByQuery(term);
        setGifs(gifs);
        gifsCache.current[term] = gifs; // Guardamos en caché el resultado para esta consulta

    }

    //se usa handle para referir que es manejador
    const handleSearch = async (query: string = '') => {
        query = query.trim().toLowerCase();
        if (query.length === 0) return;

        if (!previousTerms.includes(query)) {
            setPreviousTerms([query, ...previousTerms].splice(0,8))
        }

        //aqui iria la logica para hacer la consulta a la api de giphy
        //await getGifsByQuery(query);

        const gifsFromApi = await getGifsByQuery(query);
        setGifs(gifsFromApi); // 👈 AQUÍ está la clave
        
        // gifsCache[query] = gifsFromApi; // Guardamos en caché el resultado para esta consulta
        // console.log(gifsCache);

        gifsCache.current[query] = gifsFromApi; // Guardamos en caché el resultado para esta consulta
        
    
    }

  
  return {
    //params
    gifs,
    previousTerms,

    //methods
    handleSearch,
    handleTermsClicked
  }
}
