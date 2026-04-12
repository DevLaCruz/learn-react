import React, {useState} from "react";
//import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import PreviousSearches from "./gifs/components/PreviousSearches";
import GifList from "./gifs/components/GifList";
//import { mockGifs } from "./mock-data/gifs.mock";
// import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query-actions";
// import type { Gif } from "./gifs/interfaces/gif.interface";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {

  const {gifs, previousTerms, handleSearch, handleTermsClicked} = useGifs()
    
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
