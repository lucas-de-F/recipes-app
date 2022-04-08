import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import Context from '../../contextAPI/Context';

function FavoriteButtonFavoriteRecipes(props) {
  const { item, dataTest } = props;

  const { setFavoriteList } = useContext(Context);

  const desfavoritar = () => {
    const localStorageItems = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const resultFilter = localStorageItems
      .filter((element) => element.id !== item.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(resultFilter));
    setFavoriteList(resultFilter);
  };

  return (
    <button
      type="button"
      data-testid={ dataTest }
      onClick={ desfavoritar }
      src="blackHeartIcon"
    >
      <img
        width="30px"
        alt="favorite button"
        src={ blackHeartIcon }
      />
    </button>
  );
}

FavoriteButtonFavoriteRecipes.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
  dataTest: PropTypes.string.isRequired,
};

export default FavoriteButtonFavoriteRecipes;
