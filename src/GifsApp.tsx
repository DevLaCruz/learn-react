import React, {useState} from "react";
//import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import PreviousSearches from "./gifs/components/PreviousSearches";
import GifList from "./gifs/components/GifList";
//import { mockGifs } from "./mock-data/gifs.mock";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query-actions";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {

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

    return (
    <>
      {/* Header */}
      <CustomHeader title="Searcher of gifs" />

      {/* Search */}
      <SearchBar placeholder="Search gifs"
      onQuery={handleSearch} />

      {/* prevs searches */}
      <PreviousSearches queries={previousTerms}
       onLabelClicked={handleTermsClicked}
        //other way
        // queries={["noses", " ae"]}

        //my way
        // queries={[
        //   {
        //     id: "1",
        //     query: "first"
        //   },
        //   {
        //     id: "2",
        //     query: "second"
        //   },
        // ]}
      />

      {/* gifs list */}
      <GifList gifs={gifs} />
    </>
  );
};
