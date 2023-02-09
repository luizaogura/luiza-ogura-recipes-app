import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn() {
  const { makeFetch } = useFetch();
  const location = useLocation();
  const { id } = useParams();
  const {
    isFavorite,
    getLocalFavorite,
    saveFavoriteRecipe,
    removeFavoriteRecipe } = useLocalStorage();

  const checkLocalStorage = async () => {
    getLocalFavorite(id);
  };

  const handleClick = async () => {
    if (!isFavorite && location.pathname.includes('meals')) {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await makeFetch(url);
      const recipeArray = meals[0];
      saveFavoriteRecipe(0, recipeArray);
    }
    if (!isFavorite && location.pathname.includes('drinks')) {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await makeFetch(url);
      const recipeArray = drinks[0];
      saveFavoriteRecipe(recipeArray);
    }
    if (isFavorite) {
      removeFavoriteRecipe(id);
    }
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  return (
    <button
      type="button"
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      onClick={ handleClick }
      data-testid="favorite-btn"
    >
      { isFavorite ? (<img src={ blackHeartIcon } alt="favoriteicon" />)
        : (<img src={ whiteHeartIcon } alt="favoriteicon" />) }
    </button>
  );
}

export default FavoriteBtn;
