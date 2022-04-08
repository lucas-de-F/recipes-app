import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Context from '../contextAPI/Context';

function FavoriteButton(props) {
  const { item, history: { location: { pathname } } } = props;
  const { heartState, setHeartState } = useContext(Context);
  // useMemo(() => function, input)
  const localStorageItems = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  useEffect(() => {
    setHeartState(false);
    // Se já existir um elemento com o mesmo id desta pagina, coração começa true;
    const resultFilter = localStorageItems
      .some((element) => Object.values(element)[0] === Object.values(item[0])[0]);
    if (resultFilter === true) setHeartState(true);
  }, [setHeartState, item, localStorageItems]);

  const desfavoritar = () => {
    const resultFilter = localStorageItems
      .filter((element) => Object.values(element)[0] !== Object.values(item[0])[0]);
    localStorage.setItem('favoriteRecipes', JSON.stringify(resultFilter));

    setHeartState(!heartState);
  };

  if (pathname.includes('/receitas-favoritas')) {
    return (
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ desfavoritar }
        src={ heartState ? 'blackHeartIcon' : 'whiteHeartIcon' }
      >
        <img
          width="30px"
          alt="favorite button"
          src={ heartState ? blackHeartIcon : whiteHeartIcon }
        />
      </button>
    );
  }

  const retornaComidaOuDrink = () => {
    let retorno;
    if (pathname.includes('bebidas')) {
      const { strCategory, strAlcoholic, strDrink, strDrinkThumb, idDrink } = item[0];
      retorno = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
    } else {
      const { strCategory, strMealThumb, strArea, strMeal, idMeal } = item[0];
      retorno = {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
    }
    return retorno;
  };

  const onClick = () => {
    const favoritar = () => {
      localStorageItems.push(retornaComidaOuDrink());
      localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageItems));
      setHeartState(!heartState);
    };
    if (heartState) {
      desfavoritar();
    } else {
      favoritar();
    }
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ onClick }
      src={ heartState ? 'blackHeartIcon' : 'whiteHeartIcon' }
    >
      <img
        width="30px"
        alt="favorite button"
        src={ heartState ? blackHeartIcon : whiteHeartIcon }
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default FavoriteButton;
