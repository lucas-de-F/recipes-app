import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderNoSearch from '../components/HeaderNoSearch';
import FavoriteRecipesContent from '../components/FavoriteRecipesContent';
import FilterRecipes from '../components/FilterRecipes';

function FavoriteRecipes(props) {
  const [filterFood, setFilterFood] = useState('All');
  const { history } = props;
  return (
    <div>
      <HeaderNoSearch word="Receitas Favoritas" />
      <FilterRecipes setFilterFood={ setFilterFood } />
      <FavoriteRecipesContent history={ history } filterFood={ filterFood } />
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export default FavoriteRecipes;
