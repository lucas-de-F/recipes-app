import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import {
  DrinkDetails,
  Drinks,
  Explore,
  ExploreDrink,
  ExploreDrinkIngred,
  ExploreFood,
  ExploreFoodIngred,
  FavoriteRecipes,
  FoodDetails,
  Foods,
  Login,
  NotFound,
  OriginFood,
  Profile,
  RecipesMade,
  FoodProcess,
  DrinkProcess,
} from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/bebidas/:id/in-progress" component={ DrinkProcess } />
      <Route exact path="/comidas/:id/in-progress" component={ FoodProcess } />
      <Route exact path="/receitas-feitas" component={ RecipesMade } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/explorar/comidas/area" component={ OriginFood } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodIngred }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinkIngred }
      />
      <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
      <Route exact path="/explorar/comidas" component={ ExploreFood } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/bebidas/:id" component={ DrinkDetails } />
      <Route exact path="/comidas" component={ Foods } />
      <Route exact path="/bebidas" component={ Drinks } />
      <Route exact path="/receitas-feitas" component={ RecipesMade } />

      <Route exact path="/" component={ Login } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}
export default App;
