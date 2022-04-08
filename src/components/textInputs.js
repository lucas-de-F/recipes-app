import React from 'react';

function TextInput({ name, onChange, value }) {
  const inputText = (testId) => (
    <label
      htmlFor="form-control"
    >
      <input
        placeholder={ name === 'password' ? 'Senha' : 'Email' }
        type={ name }
        name={ name }
        className={ testId }
        id={ testId }
        data-testid={ testId }
        value={ value }
        onChange={ onChange }
        required
      />
    </label>);

  const renderInputs = () => {
    let testId;
    switch (name) {
    case 'email':
    case 'password':
      testId = `${name}-input`;
      return inputText(testId);
    default:
    }
  };
  return renderInputs();
}

export default TextInput;
