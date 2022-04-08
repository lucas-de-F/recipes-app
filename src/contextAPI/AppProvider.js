import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import Context from './Context';

function AppProvider({ children }) {
  const [heartState, setHeartState] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [baseUrlFood, setBaseUrlFood] = useState('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const [baseUrlDrink, setBaseUrlDrink] = useState('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  //
  // FUNCOES E USO ACIMA
  //

  const [recipeInProgress, setInProgress] = useState({ cocktails: {}, meals: {} });
  const [favoriteList, setFavoriteList] = useState([]);

  const [processButton, setProcessButton] = useState(false);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    setInProgress({ ...recipeInProgress, ...inProgressRecipes });
    // eslint-disable-next-line
  }, []);

  const contextValue = {
    setFavoriteList,
    favoriteList,
    heartState,
    setHeartState,
    recipeInProgress,
    setInProgress,
    listItem,
    setListItem,
    baseUrlFood,
    setBaseUrlFood,
    baseUrlDrink,
    setBaseUrlDrink,
    setProcessButton,
    processButton,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

AppProvider.propTypes = {
  children: node.isRequired,
};

export default AppProvider;
