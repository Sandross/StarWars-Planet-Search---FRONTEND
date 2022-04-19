import React, { useContext } from 'react';
import ISSContext from '../context/ISSContext';

export default function Header() {
  const { handleInput, filteredInformation } = useContext(ISSContext);
  return (
    <header>
      <h1> Star Wars Planets Search</h1>
      <form>
        <label htmlFor="nameInput">
          Search by name:
          <input
            name="nameInput"
            id="nameInput"
            type="text"
            value={ handleInput }
            data-testid="name-filter"
            onChange={ (e) => filteredInformation(e) }
          />
        </label>
        <label htmlFor="column-filter">
          Choose an operator:
          <select name="column-filter" id="column-filter" data-testid="column-filter">
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
      </form>
    </header>
  );
}
