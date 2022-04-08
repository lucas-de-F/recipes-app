import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../contextAPI/Context';

const optionsDefault = {
  checkRadio: '',
  pageName: '',
  listThecocktailOrThemeal: [],
  loading: true,
};

const MAX_INDEX = 12;
const alertGlobal = () => {
  global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
};
// Fetch para as comidas
// Vefirica qual radio foi selecionado e criar endpoint correto usando o input digitado.
const themealdbFetch = async (params) => {
  const { checkRadio, input, options, setOptions, setListItem } = params;
  const themealdbEndPoint = {
    ingredient_search: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`,
    name_search: `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`,
    first_letter_search: `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`,
  };

  const themealdb = (await (await fetch(themealdbEndPoint[checkRadio])).json());
  // se themealdb for null retorna lista [].
  setOptions(
    { ...options,
      listThecocktailOrThemeal:
      themealdb.meals ? themealdb.meals.slice(0, MAX_INDEX) : [],
      loading: true },
  );
  if (!themealdb.meals) {
    alertGlobal();
    return;
  }
  setListItem(themealdb.meals ? themealdb.meals.slice(0, MAX_INDEX) : []);

  return themealdb;
};

// Fetch para as Bebidas
// Vefirica qual radio foi selecionado e criar endpoint correto usando o input digitado.
const thecocktaildbFetch = async (params) => {
  const { checkRadio, input, options, setOptions, setListItem } = params;

  const themealdbEndPoint = {
    ingredient_search: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`,
    name_search: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`,
    first_letter_search: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`,
  };
  try {
    const thecocktaildb = (await (await fetch(themealdbEndPoint[checkRadio])).json());
    if (!thecocktaildb.drinks) {
      return alertGlobal();
    }
    setOptions(
      { ...options,
        listThecocktailOrThemeal:
          thecocktaildb.drinks ? thecocktaildb.drinks.slice(0, MAX_INDEX) : [],
        loading: true },
    );
    setListItem(thecocktaildb.drinks ? thecocktaildb.drinks.slice(0, MAX_INDEX) : []);
    return thecocktaildb;
  } catch (e) {
    alertGlobal();
  }
};

export default function SearchBarHeader() {
  // Pega a Url e assim sei qual e a pagina que estou.
  const pageName = useHistory().location.pathname;
  const { setListItem } = useContext(Context);

  const [options, setOptions] = useState({ ...optionsDefault, pageName });

  const handleClick = () => {
    const { checkRadio } = options;
    const input = document.getElementById('search-input').value;
    setOptions({ ...options, loading: false });

    if (input.length > 1 && checkRadio === 'first_letter_search') {
      setOptions({ ...options, loading: true });
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    if (pageName === '/comidas') {
      return themealdbFetch({ checkRadio, input, options, setOptions, setListItem });
    }

    if (pageName === '/bebidas') {
      return thecocktaildbFetch({ checkRadio, input, options, setOptions, setListItem });
    }
  };

  return (
    <div className="Input-Buttons">
      <input
        data-testid="search-input"
        id="search-input"
        type="text"
        placeholder="digite aqui"
      />
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          id="ingredient-search-radio"
          name="radio"
          data-testid="ingredient-search-radio"
          value="ingredient_search"
          onChange={ (e) => setOptions({ ...options, checkRadio: e.target.value }) }
        />
        Ingrediente
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          id="name-search-radio"
          name="radio"
          data-testid="name-search-radio"
          value="name_search"
          onChange={ (e) => setOptions({ ...options, checkRadio: e.target.value }) }

        />
        Nome
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          id="first-letter-search-radio"
          name="radio"
          data-testid="first-letter-search-radio"
          value="first_letter_search"
          onChange={ (e) => setOptions({ ...options, checkRadio: e.target.value }) }
        />
        Primeira letra
      </label>
      <button type="button" data-testid="exec-search-btn" onClick={ handleClick }>
        Buscar
      </button>
    </div>
  );
}
