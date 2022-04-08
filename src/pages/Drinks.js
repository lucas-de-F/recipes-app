import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { CategoryButton, Footer, HeaderSearch, MiniCard } from '../components';
import Context from '../contextAPI/Context';

function Drinks() {
  const { push } = useHistory();
  const { listItem, setListItem, baseUrlDrink } = useContext(Context);
  const page = '/bebidas';
  const MAX_INDEX = 12;

  useEffect(() => {
    const foodFetch = async () => {
      const request = await fetch(baseUrlDrink);
      const data = await request.json();
      if (!data.drinks) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        return;
      }
      setListItem(data.drinks.slice(0, MAX_INDEX));
    };
    foodFetch();
  }, [setListItem, baseUrlDrink]);

  if (listItem.length === 0) return null;

  if (!baseUrlDrink.includes('www.thecocktaildb.com/api/json/v1/1/filter.php?c')
  && listItem.length === 1) {
    const id = listItem[0].idDrink;
    push(`${page}/${id}`);
  }

  return (
    <div>
      <HeaderSearch word="Bebidas" />
      <CategoryButton />
      <div className="content">
        {listItem.map((item, i) => (
          <MiniCard key={ i } args={ { i, ...item, page } } />))}
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
