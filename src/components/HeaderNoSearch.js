import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

function HeaderNoSearch(props) {
  const { word } = props;
  return (
    <header>
      <div>
        <Link to="/perfil">
          <button type="button">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile"
            />
          </button>
        </Link>
        <h2 data-testid="page-title">{word}</h2>
      </div>
    </header>
  );
}

HeaderNoSearch.propTypes = {
  word: PropTypes.string.isRequired,
};

export default HeaderNoSearch;
