import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';

function StartBtn() {
  const { makeFetch } = useFetch();
  const location = useLocation();
  const { id } = useParams();
  const history = useHistory();
  const [type, setType] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const {
    inProgress,
    getLocalResponseProgress,
    inProgressDrinks,
    inProgressMeals } = useLocalStorage();

  console.log(type);

  const attFood = () => {
    if (location.pathname.includes('/meals')) {
      setType('meals');
    } else {
      setType('drinks');
    }
  };

  const checkInProgress = async () => {
    getLocalResponseProgress(id);
    const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipe > 0) {
      const find = doneRecipe.find((recipe) => recipe.id === pageId);
      return setBtnDisabled(find);
    }
  };

  const handleClick = async () => {
    if (!inProgress && type === 'meals') {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await makeFetch(url);
      const recipeArray = meals[0];
      inProgressMeals(id, recipeArray);
    }
    if (!inProgress && type === 'drinks') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await makeFetch(url);
      const recipeArray = drinks[0];
      inProgressDrinks(id, recipeArray);
    }
    history.push(`/${type}/${id}/in-progress`);
  };

  useEffect(() => {
    attFood();
    checkInProgress();
  }, []);

  return (
    <div>
      <button
        className="startBtn"
        data-testid="start-recipe-btn"
        type="button"
        disabled={ btnDisabled }
        onClick={ handleClick }
      >
        { inProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}

export default StartBtn;
