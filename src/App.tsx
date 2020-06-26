import React, { ChangeEvent } from "react";
import "./App.scss";
import { debounce } from "./utils";

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const fruits = ["Banana", "Maçã", "Mamão", "Laranja", "Abacate"];

  const [search, setSearch] = React.useState<string>("");

  const [results, setResults] = React.useState<string[]>([]);

  const [searching, setSearching] = React.useState<boolean>(false);

  const doSearch = (value: string) => {
    const tmp = fruits.filter((f) => f.toLowerCase().includes(value));
    setResults(tmp);
    setSearching(false);
  };

  const handleSearch = (event: ChangeEvent) => {
    event.preventDefault();
    const input = event.target as HTMLInputElement;

    if (input) {
      const value = input.value;
      setSearch(value);
      setSearching(true);
      const debounced = debounce(doSearch, 1000);
      debounced(value);
    }
  };

  return (
    <div className="container">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        onChange={(event) => handleSearch(event)}
      />

      {search && (
        <div className="results">
          {searching && <span>Loading...</span>}
          {!searching && (
            <ul>
              {results &&
                results.map((result, index) => <li key={index}>{result}</li>)}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
