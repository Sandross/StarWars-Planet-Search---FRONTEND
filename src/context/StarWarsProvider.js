import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ISSContext from './ISSContext';

export default function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilteredByName] = useState({ name: '' });
  const [filterInput, setFilteredByInput] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [arrayOfFilters, setArrayOfFilters] = useState([]);
  const [filterSelectedValue, setSelectedValue] = useState(
    { column: 'population', comparison: 'maior que', value: '0' },
  );
  const [arrayOfColumn, setArrayOfColumns] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [filterByNumericValues, setNumericValue] = useState([]);
  const [isRemoving, setRemoveSelected] = useState(false);

  const apiRequest = async () => {
    const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const json = await request.json();
    setData(json.results);
    setFilteredByInput(json.results);
    setNewArray(json.results);
  };
  const filteredInformation = ({ target: { value, name } }) => {
    const handleInput = {
      nameInput: () => setFilteredByName({ name: value }),
      columnFilter: () => setSelectedValue({ ...filterSelectedValue, column: value }),
      comparisonFilter: () => setSelectedValue(
        { ...filterSelectedValue, comparison: value },
      ),
      numberInput: () => setSelectedValue({ ...filterSelectedValue, value }),
    };
    return handleInput[name]();
  };

  const removeColumn = (actualColumn) => {
    setRemoveSelected(true);
    const removeColumns = arrayOfColumn.filter(
      (elem) => elem !== actualColumn,
    );
    setArrayOfColumns(removeColumns);
  };

  const newI = () => setNumericValue({ ...filterByNumericValues, filterSelectedValue });

  useEffect(() => {
    apiRequest();
  }, []);

  useEffect(() => {
    const filterSubject = isRemoving ? newArray : filterInput;
    console.log(isRemoving);
    const filterPlanets = filterSubject.filter(
      ({ name }) => name.toLowerCase().includes(filterByName.name.toLowerCase()),
    );
    setFilteredByInput(filterPlanets);
  }, [filterByName, arrayOfFilters]);

  useEffect(() => {
    const filterSubject = isRemoving ? newArray : filterInput;
    console.log(isRemoving);
    if (arrayOfFilters.length > 0) {
      arrayOfFilters.map((
        { value, comparison, column },
      ) => {
        const handleComparison = {
          'maior que': () => filterSubject.filter((elem) => +elem[column] > +value),
          'igual a': () => filterSubject.filter((elem) => +elem[column] === +value),
          'menor que': () => filterSubject.filter((elem) => +elem[column] < +value),
        };
        return setFilteredByInput(handleComparison[comparison]);
      });
    }
  }, [arrayOfFilters, filterSelectedValue, newArray]);

  const state = {
    filterByName,
    filteredInformation,
    filterInput,
    newI,
    filterSelectedValue,
    filterByNumericValues,
    setArrayOfFilters,
    arrayOfFilters,
    removeColumn,
    isRemoving,
    arrayOfColumn,
    setRemoveSelected,
  };

  return (
    <ISSContext.Provider value={ state }>
      {children}
    </ISSContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
