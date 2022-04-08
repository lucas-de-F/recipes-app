import PropTypes from 'prop-types';
import React from 'react';
import Input from '../components/buttons';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import '../CSS/Explore.css';

function Explorar(props) {
  const { history } = props;
  const changeRoute = (foodOrDrink) => {
    history.push(`/explorar/${foodOrDrink}`);
  };

  return (
    <div>
      <HeaderNoSearch word="Explorar" />
      <div className="explore-buttons">
        <Input
          name="drinks"
          type="button"
          onClick={ changeRoute }
        />
        <Input
          name="food"
          type="button"
          onClick={ changeRoute }
        />
      </div>
      <Footer />
    </div>
  );
}

Explorar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Explorar;
