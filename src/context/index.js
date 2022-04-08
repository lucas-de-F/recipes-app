// import React from 'react'

async function dofatch() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const data = await response.json();
  return data;
}

export default dofatch;
