import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { generatePath } from 'react-router';
import HeaderDrink from '../components/HeaderSearch';
import Footer from '../components/Footer';
import IngredientsCard from '../components/IngredientsCard';
import Loading from '../components/Loading';

function OriginFood() {
  const history = useHistory();

  const [byArea, setByArea] = useState([]);
  const [selectArea, setSelectArea] = useState('All');
  const [byAreaResults, setByAreaResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const MAX_INDEX = 12;

  const AllFetch = async () => {
    const base = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(base);
    const data = await response.json();
    setByAreaResults(data.meals.slice(0, MAX_INDEX));
  };

  useEffect(() => {
    const fectIngred = async () => {
      await AllFetch();
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const result = await request.json();
      setByArea(result.meals);
      setLoading(false);
    };
    fectIngred();
  }, []);

  useEffect(() => {
    const fectIngredSearch = async () => {
      if (selectArea === 'All') return AllFetch();

      const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectArea}`);
      const result = await request.json();
      if (!result.meals) return null;
      setByAreaResults(result.meals.splice(0, MAX_INDEX));
      setLoading(false);
    };

    fectIngredSearch();
  }, [selectArea]);

  if (loading) return <Loading />;

  const onClick = ({ target: { value } }) => {
    setSelectArea(value);
  };

  const changeRoute = (idElement) => {
    const path = generatePath('/comidas/:id', { id: idElement });
    history.push(path);
  };

  return (
    <div>
      <HeaderDrink word="Explorar Origem" />
      <select data-testid="explore-by-area-dropdown" onClick={ (e) => onClick(e) }>
        <option className="dropdown-item" data-testid="All-option" key="00">
          All
        </option>
        {byArea
          .map((obj, i) => (
            <option
              className="dropdown-item"
              data-testid={ `${obj.strArea}-option` }
              key={ i }
            >
              {obj.strArea}
            </option>))}
      </select>
      <div className="content">
        { loading ? <Loading /> : byAreaResults.map((obj, index) => (
          <IngredientsCard
            id={ obj.idMeal }
            name={ obj.strMeal }
            img={ obj.strMealThumb }
            onClick={ changeRoute }
            index={ index }
            key={ index }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default OriginFood;
// teste
