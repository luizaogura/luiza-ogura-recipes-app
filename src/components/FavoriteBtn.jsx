import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn() {
  const { makeFetch } = useFetch();
  const location = useLocation();
  const { id } = useParams();
  const [favorite, setFavorite] = useState(false);

  const checkLocalStorage = async () => {
    const actualStorage = await JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (location.pathname.includes('meals')) {
      setFavorite(actualStorage
        .some((fav) => fav.idMeal === id));
    } else if (location.pathname.includes('drinks')) {
      setFavorite(actualStorage
        .some((fav) => fav.idDrink === id));
    }
  };

  const handleClick = async () => {
    if (favorite === false && location.pathname.includes('meals')) {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await makeFetch(url);
      const recipeArray = meals[0];
      await localStorage.setItem('favoriteRecipes', JSON.stringify(recipeArray));
      setFavorite(true);
    }
    if (favorite === false && location.pathname.includes('drinks')) {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await makeFetch(url);
      const recipeArray = drinks[0];
      await localStorage.setItem('favoriteRecipes', JSON.stringify(recipeArray));
      setFavorite(true);
    }
    if (favorite === true) {
      setFavorite(false);
    }
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  return (
    <button
      type="button"
      src={ favorite ? blackHeartIcon : whiteHeartIcon }
      onClick={ handleClick }
      data-testid="favorite-btn"
    >
      { favorite ? (<img src={ blackHeartIcon } alt="favoriteicon" />)
        : (<img src={ whiteHeartIcon } alt="favoriteicon" />) }
    </button>
  );
}

export default FavoriteBtn;
