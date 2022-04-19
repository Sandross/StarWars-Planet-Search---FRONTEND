import React, { useContext } from 'react';
import ISSContext from '../context/ISSContext';

export default function Header() {
  const { handleInput, filteredInformation } = useContext(ISSContext);
  return (
    <header>
      <h1> Star Wars Planets Search</h1>
      <input
        name="nameInput"
        type="text"
        value={ handleInput }
        data-testid="name-filter"
        onChange={ (e) => filteredInformation(e) }
      />
    </header>
  );
}
