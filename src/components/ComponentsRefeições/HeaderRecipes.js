import React from 'react';
import PropTypes from 'prop-types';

function HeaderRecipes({ subtitle, title, img }) {
  return (
    <>
      <div className="Image-Meal">
        <img width="360px" data-testid="recipe-photo" src={ img } alt="recipe" />
      </div>
      <div className="info-share-favorites">
        <div className="info">
          <h1 data-testid="recipe-title" className="title">
            {title}
          </h1>
          <h2 data-testid="recipe-category" className="category">
            {subtitle}
          </h2>
        </div>
      </div>
    </>
  );
}

HeaderRecipes.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default HeaderRecipes;
