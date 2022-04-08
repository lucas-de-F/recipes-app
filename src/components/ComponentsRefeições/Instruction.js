import React from 'react';
import PropTypes from 'prop-types';

function Instruction({ strInstructions }) {
  return (
    <div className="instructions-content">
      <h3> Instruções </h3>
      <p data-testid="instructions">
        {strInstructions}
      </p>
    </div>
  );
}

Instruction.propTypes = {
  strInstructions: PropTypes.string.isRequired,
};

export default Instruction;
