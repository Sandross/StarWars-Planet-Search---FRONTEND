import React, { useContext, useState } from 'react';
import ISSContext from '../context/ISSContext';

export default function Header() {
  const { handleInput,
    filteredInformation,
    filterSelectedValue,
    setArrayOfFilters,
    removeColumn,
    arrayOfColumn,
    setRemoveSelected,
    setArrayOfColumns,
    columnRef,
  } = useContext(ISSContext);

  const [click, setClick] = useState([]);

  const excludeBtn = ({ target: { id } }) => {
    setRemoveSelected(true);
    const newArray = click.filter((e) => e.column !== id);
    setClick(newArray);
    setArrayOfFilters(newArray);
    setArrayOfColumns(((prev) => prev.filter(({ column }) => column !== id)));
  };

  const excludeAllBtn = () => {
    setRemoveSelected(true);
    setArrayOfFilters([]);
    setArrayOfColumns(['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
    setClick([]);
  };

  const handleInputChange = () => {
    setArrayOfFilters((prev) => {
      console.log(prev);
      return [...prev, filterSelectedValue];
    });
    setClick([...click, filterSelectedValue]);
    removeColumn(filterSelectedValue.column);
    setRemoveSelected(false);
  };

  return (
    <header>
      <h1> Star Wars Planets Search</h1>
      {click && (
        <div>
          { click.map(({ column, comparison, value }) => (
            <div key={ column } data-testid="filter">
              <p>
                {column}
                {' '}
                {comparison}
                {' '}
                {value}
              </p>
              <button
                type="button"
                id={ column }
                onClick={ (e) => excludeBtn(e) }
              >
                X

              </button>
            </div>
          ))}
          <button
            type="button"
            id={ columnRef }
            onClick={ () => excludeAllBtn() }
            data-testid="button-remove-filters"
          >
            Remover todas filtragens

          </button>
        </div>
      )}
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
            ref={ columnRef }
            name="columnFilter"
            id="column-filter"
            data-testid="column-filter"
            onChange={ (e) => filteredInformation(e) }
          >
            {arrayOfColumn.map((elem) => (
              <option key={ elem } value={ elem }>
                { elem }
              </option>

            ))}
            {/* <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option> */}
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
            <option value="maior que">maior que</option>
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
          onClick={ handleInputChange }
        >
          Filtrar
        </button>
      </form>
    </header>
  );
}
