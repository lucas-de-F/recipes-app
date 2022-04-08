import React from 'react';
import { Link } from 'react-router-dom';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import '../CSS/Profile.css';

const { email } = JSON.parse(localStorage.getItem('user')) || [];
function Profile() {
  return (
    <div>
      <HeaderNoSearch word="Perfil" />
      <div className="profile-content">
        <div className='email'>
          <h3 data-testid="profile-email">{ email }</h3>
        </div>
        <div className='links'>
          <Link to="/receitas-feitas">
            <button
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link to="/receitas-favoritas">
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link to="/">
            <button
              onClick={ () => localStorage.clear() }
              type="button"
              data-testid="profile-logout-btn"
            >
              Sair
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
