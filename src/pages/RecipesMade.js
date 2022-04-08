import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { CardRecipesMade, HeaderNoSearch } from '../components';

function RecipesMade() {
  const [FoodType, setFilterFood] = useState('All');
  const { location } = useHistory();
  const [recipesMade, setRecipesMade] = useState([]);

  // Essa função serve para filtar a lista de receitas por drink, meal ou se e all
  const filterFood = (receita, Foodtype) => {
    const list = Object.values(receita);
    if (list.includes(FoodType)) return receita;
    if (Foodtype === 'All') return true;
  };

  useEffect(() => {
    const done = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setRecipesMade([...done]);
  }, []);

  return (
    <div>
      <HeaderNoSearch word="Receitas Feitas" />
      <div className="filters">
        <button
          onClick={ (e) => setFilterFood(e.target.value) }
          type="button"
          value="All"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ (e) => setFilterFood(e.target.value) }
          type="button"
          value="comida"
          data-testid="filter-by-food-btn"
        >
          Foods
        </button>
        <button
          onClick={ (e) => setFilterFood(e.target.value) }
          type="button"
          value="bebida"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      <div>
        {recipesMade
          .filter((receita) => filterFood(receita, FoodType))
          .map((receita, index) => (<CardRecipesMade
            key={ receita.id }
            args={ { ...receita, index, location } }
          />))}
      </div>
    </div>
  );
}

export default RecipesMade;
