import React, { ChangeEvent, useEffect } from 'react';
import { useDebounce } from '../../utils';
import { http } from '../../http';
import styles from './styles.module.scss';

interface SearchSelectProps {
  label?: string;
  inputKey: string;
  optionLabel: string;
  optionValue?: string | null;
}

const SearchSelect: React.FC<SearchSelectProps> = (props) => {
  const { label, inputKey, optionLabel, optionValue } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [searchValue, setSearchValue] = React.useState<string>('');

  const debouncedSearch = useDebounce(searchValue, 1000);

  const [selected, setSelected] = React.useState<any>();

  const [searchResults, setSearchResults] = React.useState<any[]>([]);

  const [searching, setSearching] = React.useState<boolean>(false);

  const [showResults, setShowResults] = React.useState<boolean>(false);

  const [initial, setInitial] = React.useState<boolean>(false);

  const doSearch = (value: string) => {
    setSearching(true);
    http({
      url: 'https://swapi.dev/api/people/',
      query: {
        search: value,
      },
    })
      .get()
      .then((response) => {
        console.log(response);
        setSearching(false);
        if (Array.isArray(response.results) && response.results.length) {
          setSearchResults(response.results);
        } else {
          setSearchResults([]);
        }
      });
  };

  const handleSearch = (event: ChangeEvent) => {
    event.preventDefault();
    setShowResults(true);

    const input = event.target as HTMLInputElement;
    if (input) {
      const value = input.value;
      setSearchValue(value);
    }
  };

  const handleSelect = (result: any) => {
    setSearchValue(result[optionLabel]);
    if (optionValue) {
      console.log('has optionValue');
      if (typeof result === 'object') {
        setSelected(result[optionValue]);
      } else {
        setSelected(result);
      }
    } else {
      setSelected(result);
    }
    setShowResults(false);
    setSearchResults([]);
  };

  const handleFocus = (event: any) => {
    if (searchValue.length === 0) {
      setInitial(true);
      setShowResults(true);
    }
  };

  useEffect(() => {
    doSearch(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    if (initial) {
      doSearch('');
    }
  }, [initial]);

  useEffect(() => console.log(selected), [selected]);

  return (
    <div className={styles.container}>
      {label && <label htmlFor={inputKey}>{label}</label>}
      <input
        name={inputKey}
        id={inputKey}
        ref={inputRef}
        type="text"
        value={searchValue}
        placeholder="Search..."
        onChange={handleSearch}
        onFocus={handleFocus}
      />

      {showResults && (
        <div className={styles.results}>
          {searching && <span>Loading...</span>}
          {!searching && !searchResults.length && (
            <span>No items match your search.</span>
          )}
          {!searching && !!searchResults.length && (
            <ul>
              {searchResults.map((result, index) => (
                <li onClick={() => handleSelect(result)} key={index}>
                  {result[optionLabel]}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
