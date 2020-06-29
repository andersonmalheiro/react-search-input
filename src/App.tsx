import React from 'react';
import './App.scss';
import SearchSelect from './components/SearchSelect';

function App() {
  return (
    <div className="App">
      <SearchSelect
        label="Search character"
        inputKey="character"
        optionLabel="name"

      />
    </div>
  );
}

export default App;
