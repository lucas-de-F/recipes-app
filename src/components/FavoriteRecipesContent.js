import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import CardFavoriteRecipe from './ComponentsRefeições/CardFavoriteRecipe';
import Context from '../contextAPI/Context';

function FavoriteRecipesContent(props) {
  const { history, filterFood } = props;

  const { favoriteList, setFavoriteList } = useContext(Context);

  const filter = (array) => {
    if (filterFood === 'All') return array;
    if (filterFood === 'comida') {
      return array.filter((el) => el.type === 'comida');
    }
    if (filterFood === 'bebida') {
      return array.filter((el) => el.type === 'bebida');
    }
  };

  useEffect(() => {
    const localStorageItems = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (localStorageItems !== null) setFavoriteList(localStorageItems);
  }, [setFavoriteList]);

  // const localStorageItems = JSON.parse(localStorage.getItem('favoriteRecipes'));
  // const resultFilter = localStorageItems
  //   .some((element) => Object.values(element)[0] === Object.values(item[0])[0]);
  // if (resultFilter === true) setHeartState(true);

  return (
    <div className="recipesContent">
      {filter(favoriteList)
        .map((el, index) => (<CardFavoriteRecipe
          history={ history }
          key={ el.id }
          item={ el }
          index={ index }
        />))}
    </div>
  );
}

FavoriteRecipesContent.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  filterFood: PropTypes.string.isRequired,
};

export default FavoriteRecipesContent;
