import type { FC } from "react";

interface PreviousSearchesProps {
  queries: string[];
  onLabelClicked?: (query: string) => void;
}

// 1. Extraemos onLabelClicked de los props 👇
const PreviousSearches: FC<PreviousSearchesProps> = ({ queries, onLabelClicked }) => {
 return (
    <div className="previous-searches">
      <h2>Prevs Searchs</h2>
      <ul className="previous-searches-list">
        {queries.map((query) => (
          <li 
            key={query}
            // 2. Ejecutamos la función si existe 👇
            onClick={() => {
                if (onLabelClicked) {
                    onLabelClicked(query);
                }
            }}
          >
            {query}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousSearches;