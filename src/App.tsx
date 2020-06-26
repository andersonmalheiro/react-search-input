import React, { ChangeEvent } from "react";
import "./App.scss";
import { debounce } from "./utils";

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const fruits = ["Banana", "Maçã", "Mamão", "Laranja", "Abacate"];

  const [search, setSearch] = React.useState<string>("");

  const [results, setResults] = React.useState<string[]>([]);

  const [searching, setSearching] = React.useState<boolean>(false);

  const [showOptions, setShowOptions] = React.useState<boolean>(false);

  const doSearch = (value: string) => {
    console.log('doSearchValue ->', value);
    const tmp = fruits.filter((f) => f.toLowerCase().includes(value));
    console.log('results ->', tmp);
    setResults(tmp);
    setSearching(false);
  };

  const handleSearch = (event: ChangeEvent) => {
    event.preventDefault();
    setShowOptions(true);
    const input = event.target as HTMLInputElement;

    if (input) {
      const value = input.value;
      console.log(value);
      setSearch(value);
      setSearching(true);
      const debounced = debounce(doSearch, 1000);
      debounced(value);
    }
  };

  const handleSelect = (result: any) => {
    setSearch(result);
    setShowOptions(false);
    setResults([]);
  };

  const handleFocus = (event: any) => {
    if (search.length === 0) {
      setResults(fruits);
      setShowOptions(true);
    }
  }

  return (
    <div className="container">
      <input
        ref={inputRef}
        type="text"
        value={search}
        placeholder="Search..."
        onChange={(event) => handleSearch(event)}
        onFocus={(event) => handleFocus(event)}
      />

      {showOptions && (
        <div className="results">
          {searching && <span>Loading...</span>}
          {!searching && (
            <ul>
              {results &&
                results.map((result, index) => (
                  <li onClick={() => handleSelect(result)} key={index}>
                    {result}
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
