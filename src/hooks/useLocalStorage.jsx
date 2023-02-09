import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const useLocalStorage = () => {
  const [inProgress, setInProgress] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { pathname } = useLocation();

  // <----------------Precisa de id dynamico para funcionar-------------->
  const getLocalFavorite = (id) => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'))
    || [];
    const inList = favorite.some((recipeId) => recipeId.id === `${id}`);

    setIsFavorite(inList);
  };

  const saveFavoriteRecipe = (drink, meal) => {
    const hasFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setIsFavorite(true);

    return localStorage.setItem('favoriteRecipes', JSON.stringify([...hasFavorite, {
      id: (drink ? drink.idDrink : meal.idMeal),
      type: (drink ? 'drink' : 'meal'),
      nationality: (drink ? '' : meal.strArea),
      category: (drink ? drink.strCategory : meal.strCategory),
      alcoholicOrNot: (drink ? drink.strAlcoholic : ''),
      name: (drink ? drink.strDrink : meal.strMeal),
      image: (drink ? drink.strDrinkThumb : meal.strMealThumb),
    }]));
  };

  const removeFavoriteRecipe = (id) => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const findFavorite = favorite.find((recipeId) => recipeId.id === `${id}`);
    const newFavorite = favorite.filter((remove) => remove.id !== findFavorite.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    return setIsFavorite(false);
  };

  // In Progress
  const getLocalResponseProgress = (id) => {
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { drinks: {}, meals: {} };
    if (pathname.includes('drinks')) {
      return Object.keys(inProgressRecipe.drinks).some((recipeId) => recipeId === id)
        ? setInProgress(true) : setInProgress(false);
    }
    if (pathname.includes('meals')) {
      return Object.keys(inProgressRecipe.meals).some((recipeId) => recipeId === id)
        ? setInProgress(true) : setInProgress(false);
    }
  };

  const inProgressDrinks = (id, local) => {
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { drinks: {}, meals: {} };
    inProgressRecipe.drinks = { ...inProgressRecipe.drinks, [id]: [local] };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));
    return setInProgress(true);
  };

  const inProgressMeals = (id, local) => {
    const inProgressRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { drinks: {}, meals: {} };
    inProgressRecipe.meals = { ...inProgressRecipe.meals, [id]: [local] };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipe));
    return setInProgress(true);
  };

  const loadProgressMeals = (id) => {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const findProgress = progress.meals[id][0].find((recipeId) => recipeId === `${id}`);
    return findProgress;
  };

  return { inProgressMeals,
    inProgressDrinks,
    inProgress,
    isFavorite,
    setInProgress,
    getLocalResponseProgress,
    getLocalFavorite,
    loadProgressMeals,
    saveFavoriteRecipe,
    removeFavoriteRecipe };
};

export default useLocalStorage;
