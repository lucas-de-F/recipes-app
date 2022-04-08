import React from 'react';
import { useHistory } from 'react-router-dom';

function Input({ name, onClick, value }) {
  const history = useHistory();

  const renderBtnName = () => {
    const path = history.location.pathname;
    let btnName;
    let rota;
    switch (name) {
    case 'food':
      rota = 'comidas';
      btnName = 'Explorar Comidas';
      break;
    case 'drinks':
      rota = 'bebidas';
      btnName = 'Explorar Bebidas';
      break;
    case 'by-ingredient':
      rota = path.match('comidas') ? 'comidas/ingredientes' : 'bebidas/ingredientes';
      btnName = 'Por Ingredientes';
      break;
    case 'surprise':
      rota = path;
      btnName = 'Me Surpreenda!';
      break;
    case 'by-area':
      rota = 'comidas/area';
      btnName = 'Por Local de Origem';
      break;

    default:
      break;
    }
    return { rota, btnName };
  };

  const submitForm = () => (
    <button
      type="button"
      name={ name }
      data-testid="login-submit-btn"
      disabled={ value }
      onClick={ onClick }
      required
    >
      { name }

    </button>);

  const verifyPathFunc = (param) => {
    const verifyPath = history.location.pathname === `/explorar/${param}`
      && name === 'by-area';
    return verifyPath;
  };

  const exploreButttons = (testId) => {
    const data = renderBtnName();
    const { rota, btnName } = data;

    if (verifyPathFunc('bebidas')) return null;
    return (
      <button
        type="button"
        data-testid={ testId }
        value={ value }
        onClick={ () => onClick(rota, btnName) }
      >
        {btnName}

      </button>
    );
  };

  const generateTestId = () => {
    let testId;
    switch (name) {
    case 'food':
    case 'drinks':
    case 'surprise':
    case 'by-area':
    case 'by-ingredient':
      testId = `explore-${name}`;
      return exploreButttons(testId);
    case 'Entrar':
      return submitForm();
    default:
      return testId;
    }
  };
  return generateTestId();
}

export default Input;
