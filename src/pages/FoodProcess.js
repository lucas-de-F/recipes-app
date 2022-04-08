import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { FavoriteButton, Loading, ShareButton } from '../components';
import HeaderRecipes from '../components/ComponentsRefeições/HeaderRecipes';
import Ingredients from '../components/ComponentsRefeições/Ingredients';
import Instruction from '../components/ComponentsRefeições/Instruction';
import '../CSS/Drink&FoodDetails.css';
import Context from '../contextAPI/Context';

const baseUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
function FoodProcess(props) {
  const { match: { params: { id } }, location, history } = props;

  const [favoriteHeart, setFavoriteHeart] = useState(false);
  const [item, setItem] = useState([]);

  const { setInProgress, recipeInProgress, processButton,
    setProcessButton } = useContext(Context);

  if (localStorage
    .getItem('inProgressRecipes') === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {}, meals: { [id]: [] },
    }));
    setInProgress({ ...recipeInProgress,
      ...{
        cocktails: {}, meals: { [id]: [] } },
    });
    setProcessButton(false);
  }

  useEffect(() => {
    const fetchById = async () => {
      const request = (await (await fetch(`${baseUrl}${id}`)).json());
      setItem(request.meals);
    };
    fetchById();
  }, [id]);

  if (item.length === 0) return (<Loading />);
  const { strMeal, strMealThumb, strCategory, strInstructions } = item[0];

  const data = new Date();

  // [{
  // id: id-da-receita,
  // type: comida-ou-bebida,
  // area: area-da-receita-ou-texto-vazio,
  // category: categoria-da-receita-ou-texto-vazio,
  // alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
  // name: nome-da-receita,
  // image: imagem-da-receita,
  // doneDate: quando-a-receita-foi-concluida,
  // tags: array-de-tags-da-receita-ou-array-vazio
  // }]

  const retornaComidaOuDrink = () => {
    const { strArea, idMeal, strTags } = item[0];
    let tags = [''];
    if (strTags !== null) tags = strTags.split(',');
    const retorno = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: `${data.getDay()}/ ${data.getMonth()}/ ${data.getFullYear()}`,
      tags: [...tags],
    };
    return retorno;
  };

  const finisherButton = () => {
    const arrayDone = JSON.parse(localStorage.getItem('doneRecipes'));
    arrayDone.push(retornaComidaOuDrink());
    localStorage.setItem('doneRecipes', JSON.stringify(arrayDone));
    return history.push('/receitas-feitas');
  };

  return (
    <div className="page-food-container">
      <div className="infos">
        <HeaderRecipes
          title={ strMeal }
          img={ strMealThumb }
          subtitle={ strCategory }
        />
        <div className="options" style={ { display: 'flex' } }>
          <FavoriteButton
            favoriteHeartState={ favoriteHeart }
            setFavoriteHeart={ setFavoriteHeart }
            item={ item }
            history={ history }
          />
          <ShareButton location={ location } inProcess="true" />
        </div>
      </div>
      <div className="ingredientes">
        <h3>Ingredientes</h3>
        <Ingredients item={ item } dataTestId="ingredient-step" check />
      </div>
      <div className="instructions">
        <Instruction strInstructions={ strInstructions } />
      </div>
      <div className="finisher-link">
        <button
          id="finish-recipe-btn"
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !processButton }
          onClick={ finisherButton }
        >
          Finalizar Receita
        </button>
      </div>
    </div>
  );
}

FoodProcess.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default FoodProcess;
