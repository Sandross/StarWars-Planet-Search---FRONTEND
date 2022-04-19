import React, { useContext } from 'react';
import ISSContext from '../context/ISSContext';

export default function Header() {
  const { handleInput, filteredInformation } = useContext(ISSContext);
  return (
    <header>
      <h1> Star Wars Planets Search</h1>
      <form>
        <label htmlFor="nameInput">
          Procure pelo nome:
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
          Coluna:
          <select name="column-filter" id="column-filter" data-testid="column-filter">
            <option value="population"> population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador:
          <select
            name="comparison-filter"
            id="comparison-filter"
            data-testid="comparison-filter"
          >
            <option value="maior que"> maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a ">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          Número:
          <input
            name="numberInput"
            id="numberInput"
            type="number"
            value={ handleInput }
            data-testid="value-filter"
            onChange={ (e) => filteredInformation(e) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
    </header>
  );
}
