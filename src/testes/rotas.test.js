import React from 'react';
// import  from '../pages';

import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

import '@testing-library/jest-dom';

// const renderPath = (path) => {
//   const history = createBrowserHistory();
//   history.push(path);
//   const { ...resources } = render(
//     <Router history={ history }>
//       <App />
//     </Router>,
//   );
//   return { ...resources };
// };

describe('1 - Teste de Rotas', () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
  });
  test('Rota NotFound, quando a rota não for a nenhuma especificada', () => {
    history.push('/tralala');
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
  test('Rota /, quando a rota for "/"', () => {
    history.push('/');
    expect(screen.getByText(/in Development/i)).toBeInTheDocument();
  });
  test('Rota bebidas, quando a rota for "/bebidas"', () => {
    history.push('/bebidas');
    expect(screen.getByText(/in Development/i)).toBeInTheDocument();
  });
  test('Rota /comidas, quando a rota for "/comidas"', () => {
    history.push('/comidas');
    expect(screen.getByText(/in Development/i)).toBeInTheDocument();
  });
  // test('Rota /, quando a rota for "/"', () => {
  //   history.push('/');
  //   expect(screen.getByText(/in Development/i)).toBeInTheDocument();
  // });
});
