import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Context from '../../contextAPI/Context';
// finish-recipe-btn

const getValuesInObject = (obj, value) => {
  const lista = [];
  Object.keys(obj).forEach((key) => {
    if (key.includes(value) && obj[key] !== '' && obj[key] !== null) {
      lista.push(obj[key]);
    }
  });
  return lista;
};

const disableTrueOrFalse = (list1, list2, callback) => {
  if (!document.getElementById('finish-recipe-btn')) return;
  if (list1.length === list2.length) {
    callback(true);
  } else {
    callback(false);
  }
};

function Ingredients({ item, dataTestId, check }) {
  const { recipeInProgress, setInProgress, setProcessButton } = useContext(Context);
  const { pathname } = useLocation();
  const idPage = pathname.split('/')[2];
  const namePage = pathname.split('/')[1] === 'comidas' ? 'meals' : 'cocktails';

  const ingredientsList = getValuesInObject(item[0], 'strIngredient');
  const ingredientsMeansure = getValuesInObject(item[0], 'strMeasure');

  const saveRecipe = (ingredientPosition) => {
    const ingredientList = recipeInProgress[namePage];

    if (ingredientList[idPage].includes(ingredientPosition)) {
      ingredientList[idPage].splice(
        ingredientList[idPage].indexOf(ingredientPosition), 1,
      );
      disableTrueOrFalse(ingredientList[idPage], ingredientsList, setProcessButton);
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipeInProgress));
      setInProgress({ ...recipeInProgress });
      return;
    }

    ingredientList[idPage].push(ingredientPosition);
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeInProgress));
    setInProgress({ ...recipeInProgress });
    disableTrueOrFalse(ingredientList[idPage], ingredientsList, setProcessButton);
    return true;
  };

  const handleCheked = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) return null;
    const ingredientList = inProgressRecipes[namePage];
    if (!ingredientList[idPage]) return null;

    if (!Object.keys(ingredientList).length) return null;

    ingredientList[idPage].forEach((index) => {
      if (!document.getElementById(index)) return null;
      document.getElementById(index).setAttribute('checked', 'on');
    });
    disableTrueOrFalse(ingredientList[idPage], ingredientsList, setProcessButton);
    return true;
  };

  useEffect(() => {
    handleCheked();
  });

  const handleClick = (event) => {
    const { id } = event.target;
    saveRecipe(id);
  };

  return (
    <div className="ingredients">
      <ul>
        {ingredientsList.map((ingredient, index) => (
          <li
            key={ `${ingredient} ${ingredientsMeansure[index]}` }
            data-testid={ `${index}-${dataTestId}` }
          >
            <label
              htmlFor={ index }
            >
              {
                !check || <input
                  id={ index }
                  type="checkbox"
                  onClick={ handleClick }
                />
              }
              <span>{ingredient}</span>
              <span>{ingredientsMeansure[index]}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

Ingredients.propTypes = {
  check: PropTypes.bool,
  dataTestId: PropTypes.string.isRequired,
  item: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

Ingredients.defaultProps = {
  check: false,
};

export default Ingredients;
