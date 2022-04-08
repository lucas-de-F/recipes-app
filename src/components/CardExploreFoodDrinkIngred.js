import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Context from '../contextAPI/Context';

const whatUrl = (pageUrl) => {
  const pathname = '/explorar/comidas/ingredientes';
  if (pageUrl === pathname) {
    return ['https://www.themealdb.com/images/ingredients',
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
    ];
  }
  return ['https://www.thecocktaildb.com/images/ingredients',
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
  ];
};

const switchBaseUrl = async (URL, setBaseUrlFood, setBaseUrlDrink, pgFoodOdDrink) => {
  // Atualiza a url que aparece os cards no food ou drink
  if (pgFoodOdDrink === 'comidas') setBaseUrlFood(URL);
  if (pgFoodOdDrink === 'bebidas') setBaseUrlDrink(URL);
};

function CardExploreFoodDrinkIngred({ index, Ingredient }) {
  const { setBaseUrlFood, setBaseUrlDrink } = useContext(Context);
  const { push } = useHistory();
  const pageUrl = useHistory().location.pathname;
  const [urlImageBase, urlFect] = whatUrl(pageUrl);

  const handleclick = (Ingred) => {
    const pgFoodOdDrink = pageUrl.split('/')[2];
    switchBaseUrl(`${urlFect}${Ingred}`, setBaseUrlFood, setBaseUrlDrink, pgFoodOdDrink);
    push(`/${pgFoodOdDrink}`);
  };

  return (
    <div className="card-explore-food-ingred" data-testid={ `${index}-ingredient-card` }>
      <img
        onClick={ () => handleclick(Ingredient) }
        aria-hidden="true"
        src={ `${urlImageBase}/${Ingredient}-Small.png` }
        alt={ `Foto de uma ingrediente chamando ${Ingredient}` }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ Ingredient }</p>
    </div>
  );
}

CardExploreFoodDrinkIngred.propTypes = {
  index: PropTypes.number.isRequired,
  Ingredient: PropTypes.string.isRequired,
};

export default CardExploreFoodDrinkIngred;
