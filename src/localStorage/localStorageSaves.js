export function saveToken(tokenName, key = 1) {
  localStorage.setItem(tokenName, key);
}

export function saveEmail(email) {
  const emailOBJ = { email };
  localStorage.setItem('user', JSON.stringify(emailOBJ));
}

export function initialRecipesFavorites() {
  if (localStorage.getItem('favoriteRecipes') === null) {
    const FavoriteRecipes = [];
    localStorage.setItem('favoriteRecipes', JSON.stringify(FavoriteRecipes));
  }
}

export function initialDoneRecipes() {
  if (localStorage.getItem('doneRecipes') === null) {
    const doneRecipes = [];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }
}