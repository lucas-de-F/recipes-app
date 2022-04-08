import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FavoriteButton, CarrouselRecomendations, ShareButton,
  Loading, StartRecipe } from '../components';
import HeaderRecipes from '../components/ComponentsRefeições/HeaderRecipes';
import Ingredients from '../components/ComponentsRefeições/Ingredients';
import Instruction from '../components/ComponentsRefeições/Instruction';
import Context from '../contextAPI/Context';

function DrinkDetails(props) {
  const { match: { params: { id } }, location, history } = props;
  const [recomendation, setRecomendation] = useState([]);
  const [item, setItem] = useState([]);
  const { recipeInProgress } = useContext(Context);

  if (localStorage
    .getItem('favoriteRecipes') === null) localStorage.setItem('favoriteRecipes', '[]');
  if (localStorage
    .getItem('inProgressRecipes') === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeInProgress));
  }

  const fetchFoodOrDrinkRecomendations = async () => {
    const response = (await (await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')).json()).meals;
    setRecomendation(response);
  };

  useEffect(() => {
    const fetchAndSet = async () => {
      await fetchFoodOrDrinkRecomendations();
    };
    fetchAndSet();
  }, []);

  useEffect(() => {
    const fetchBy = async () => {
      const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await request.json();
      setItem(data.drinks);
    };
    fetchBy();
  }, [id]);

  if (item.length === 0) return (<Loading />);
  const { strAlcoholic, strDrinkThumb, strDrink, strInstructions } = item[0];

  return (
    <div className="page-food-container">
      <HeaderRecipes
        title={ strDrink }
        img={ strDrinkThumb }
        subtitle={ strAlcoholic }
      />
      <div className="options" style={ { display: 'flex' } }>
        <FavoriteButton item={ item } history={ history } />
        <ShareButton location={ location } />
      </div>
      <div className="ingredientes">
        <h3>Ingredientes</h3>
        <Ingredients item={ item } dataTestId="ingredient-name-and-measure" />
      </div>
      <div className="instructions">
        <Instruction strInstructions={ strInstructions } />
      </div>
      <CarrouselRecomendations recomendation={ recomendation } />
      <StartRecipe id={ id } history={ history } />
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default DrinkDetails;
