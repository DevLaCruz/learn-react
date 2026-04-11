import React, { useState } from "react";

interface Props {
  placeholder: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Search", onQuery }: Props) => {
  const [query, setQuery] = useState("");
  // Suponiendo que quieres guardar las búsquedas previas aquí
  const [previous, setPrevious] = useState<string[]>([]);

  const handleSearch = () => {
    const searchTerm = query.trim().toLowerCase();
    
    if (searchTerm.length === 0) return;

    // Lógica para evitar duplicados en el historial
    if (!previous.includes(searchTerm)) {
      setPrevious([searchTerm, ...previous]);
    }

    // Ejecutamos la función que viene por props
    onQuery(searchTerm);
    
    // Opcional: limpiar el input después de buscar
    // setQuery(""); 
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};