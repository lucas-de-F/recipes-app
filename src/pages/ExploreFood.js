import React from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';
import ExploreFoodsOrDrinks from './ExploreFoodOrDrink';
import Footer from '../components/Footer';

function ExploreFood() {
  return (
    <div>
      <HeaderNoSearch word="Explorar Comidas" />
      <ExploreFoodsOrDrinks />
      <Footer />
    </div>
  );
}

export default ExploreFood;
