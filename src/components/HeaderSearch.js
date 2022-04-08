import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBarHeader from './SearchBarHeader';
import '../CSS/Header.css';

function HeaderSearch(props) {
  const { word } = props;
  const [searchButton, setSearchButton] = useState(false);
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
        <button
          type="submit"
          onClick={ () => setSearchButton(!searchButton) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search_Icon"
          />
        </button>
      </div>
      {
        searchButton
          ? <SearchBarHeader />
          : null
      }
    </header>
  );
}

HeaderSearch.propTypes = {
  word: PropTypes.string.isRequired,
};

export default HeaderSearch;
