import React from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';
import ExploreFoodsOrDrinks from './ExploreFoodOrDrink';
import Footer from '../components/Footer';
import '../CSS/Explore.css';

function ExploreDrink() {
  return (
    <div>
      <HeaderNoSearch word="Explorar Bebidas" />
      <ExploreFoodsOrDrinks />
      <Footer />
    </div>
  );
}

export default ExploreDrink;
