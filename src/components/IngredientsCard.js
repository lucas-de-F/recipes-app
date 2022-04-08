import PropTypes from 'prop-types';
import React from 'react';

function IngredientsCard({ id, name, img, onClick, index }) {
  return (
    <section className="mini-card-food-container card-content">
      <section
        aria-hidden="true"
        type="button"
        className="card-explore-food-ingred"
        data-testid={ `${index}-recipe-card` }
        onClick={ () => onClick(id) }
      >
        <img
          aria-hidden="true"
          src={ img }
          alt={ `Foto de uma ingrediente chamando ${name}` }
          data-testid={ `${index}-card-img` }
        />
        <h3 data-testid={ `${index}-card-name` }>{ name }</h3>
      </section>
    </section>
  );
}

const { number, string, func } = PropTypes;

IngredientsCard.propTypes = {
  id: string.isRequired,
  img: string.isRequired,
  index: number.isRequired,
  name: string.isRequired,
  onClick: func.isRequired,
};

export default IngredientsCard;
