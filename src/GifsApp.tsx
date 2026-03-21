import React from "react";
//import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import PreviousSearches from "./gifs/components/PreviousSearches";
import GifList from "./gifs/components/GifList";
import { mockGifs } from "./mock-data/gifs.mock";

export const GifsApp = () => {
  return (
    <>
      {/* Header */}
      <CustomHeader title="Searcher of gifs" />

      {/* Search */}
      <SearchBar placeholder="Search gifs" />

      {/* prevs searches */}
      <PreviousSearches
        queries={["noses", " ae"]}
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
      <GifList gifs={mockGifs} />
    </>
  );
};
