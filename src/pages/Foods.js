import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { CategoryButton, Footer, HeaderSearch, MiniCard } from '../components';
import Context from '../contextAPI/Context';

function Foods() {
  const { push } = useHistory();
  const { listItem, setListItem, baseUrlFood } = useContext(Context);
  const page = '/comidas';
  const MAX_INDEX = 12;

  useEffect(() => {
    const foodFetch = async () => {
      const request = await fetch(baseUrlFood);
      const data = await request.json();
      if (!data.meals) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        return;
      }
      setListItem(data.meals.slice(0, MAX_INDEX) || []);
    };
    foodFetch();
  }, [setListItem, baseUrlFood]);

  if (listItem.length === 0) return null;

  if (!baseUrlFood.includes('https://www.themealdb.com/api/json/v1/1/filter.php?c')
  && listItem.length === 1) {
    const id = listItem[0].idMeal;
    push(`${page}/${id}`);
  }

  return (
    <div>
      <HeaderSearch word="Comidas" />
      <CategoryButton />
      <div className="content">
        {listItem.map((item, i) => (
          <MiniCard key={ i } args={ { i, ...item, page } } />))}
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
