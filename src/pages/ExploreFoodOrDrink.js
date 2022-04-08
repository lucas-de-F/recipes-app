import PropTypes from 'prop-types';
import React from 'react';
import { generatePath } from 'react-router';
import { useHistory } from 'react-router-dom';
import Input from '../components/buttons';

function ExploreFoodsOrDrinks() {
  const history = useHistory();

  const getCorrectFetch = (param, name) => {
    let getUrl;
    if (param.match('comidas') && name === 'Me Surpreenda!') {
      getUrl = 'themealdb';
      const paramsMealsAndDrinks = ['comidas'];
      return { getUrl, paramsMealsAndDrinks };
    }
    if (param.match('bebidas') && name === 'Me Surpreenda!') {
      getUrl = 'thecocktaildb';
      const paramsMealsAndDrinks = ['bebidas'];
      return { getUrl, paramsMealsAndDrinks };
    }
    return false;
  };

  const generatePathFactory = (response, type) => {
    const obj1 = Object.keys(response)[0];
    const obj2 = (response[obj1])[0];
    const obj3 = (Object.keys(obj2)[0]);
    const path = generatePath(`/${type}/:id`, { id: obj2[obj3] });
    return path;
  };

  const randonFetch = async (param, param1) => {
    const [type] = param1;
    const randomFetch = await fetch(`https://www.${param}.com/api/json/v1/1/random.php`);
    const response = await randomFetch.json();
    const path = generatePathFactory(response, type);
    history.replace(path);
  };

  const changeRoute = (foodOrDrink, name) => {
    const { getUrl, paramsMealsAndDrinks } = getCorrectFetch(foodOrDrink, name);
    if (getUrl) {
      return randonFetch(getUrl, paramsMealsAndDrinks);
    }
    history.push(`/explorar/${foodOrDrink}`);
  };

  return (
    <div className="explore-buttons">
      <Input
        name="surprise"
        onClick={ changeRoute }
      />
      <Input
        name="by-area"
        onClick={ changeRoute }
      />
      <Input
        name="by-ingredient"
        onClick={ changeRoute }
      />
    </div>
  );
}

ExploreFoodsOrDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default ExploreFoodsOrDrinks;
