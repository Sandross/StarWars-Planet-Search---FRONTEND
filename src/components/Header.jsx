import React, { useContext } from 'react';
import ISSContext from '../context/ISSContext';

export default function Header() {
  const { handleInput,
    filteredInformation,
    filterSelectedValue,
    setArrayOfFilters,
  } = useContext(ISSContext);

  const handleInputChange = () => {
    setArrayOfFilters((prev) => [...prev, filterSelectedValue]);
    console.log(handleInput);
  };

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
          <select
            name="columnFilter"
            id="column-filter"
            data-testid="column-filter"
            onChange={ (e) => filteredInformation(e) }
          >
            <option selected="selected" value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Operador:
          <select
            name="comparisonFilter"
            id="comparison-filter"
            data-testid="comparison-filter"
            onChange={ (e) => filteredInformation(e) }
          >
            <option selected="selected" value="maior que">maior que</option>
            <option value="igual a">igual a</option>
            <option value="menor que">menor que</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          Número:
          <input
            name="numberInput"
            id="numberInput"
            type="number"
            value={ filterSelectedValue.value }
            data-testid="value-filter"
            onChange={ (e) => filteredInformation(e) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => handleInputChange() }
        >
          Filtrar
        </button>
      </form>
    </header>
  );
}
