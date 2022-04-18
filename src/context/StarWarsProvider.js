import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ISSContext from './ISSContext';

export default function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const apiRequest = async () => {
    const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const json = await request.json();
    setData(json.results);
  };

  useEffect(() => {
    apiRequest();
  }, []);

  return (
    <ISSContext.Provider value={ data }>
      {children}
    </ISSContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
