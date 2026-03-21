import type { FC } from "react";

// interface Query {
//   id: string;
//   description: string;
// }

interface PreviousSearchesProps {
  queries: string[];
}

const PreviousSearches: FC<PreviousSearchesProps> = ({ queries }) => {
  return (
    <div className="previous-searches">
      <h2>Prevs Searchs</h2>
      <ul className="previous-searches-list">
        {queries.map((query) => (
          <li key={query}>{query}</li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousSearches;
