import React, { useState } from 'react'
import type { Gif } from '../interfaces/gif.interface';
import { getGifsByQuery } from '../actions/get-gifs-by-query-actions';


export const useGifs = () => {
  
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const handleTermsClicked = (term: string) => {
        console.log({term})
    }

    const [gifs, setGifs] = useState<Gif[]>([]);
    

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
        
    }

  
  return {
    gifs,
    handleSearch,
    handleTermsClicked,
    previousTerms
  }
}
