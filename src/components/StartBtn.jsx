import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function StartBtn() {
  const { makeFetch } = useFetch();
  const location = useLocation();
  const { id } = useParams();
  const history = useHistory();
  const [type, setType] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [started, setStarted] = useState(false);

  const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  console.log(inProgress);
  console.log(id);
  console.log(type);

  const attFood = () => {
    if (location.pathname.includes('/meals')) {
      setType('meals');
    } else {
      setType('drinks');
    }
  };

  const isDisabled = () => {
    if (inProgress.length > 1 && type === 'meals') {
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const find = storage.some((key) => key.idMeal === id);
      setStarted(find);
    }

    if (inProgress.length > 1 && type === 'drinks') {
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const find = storage.some((key) => key.idDrink === id);
      setStarted(find);
    }

    if (doneRecipe) {
      const find = doneRecipe.find((recipe) => recipe.id === pageId);
      return setBtnDisabled(find);
    }
  };

  const handleClick = async () => {
    if (started === false && type === 'meals') {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await makeFetch(url);
      const recipeArray = meals[0];
      await localStorage.setItem('inProgressRecipes', JSON.stringify(recipeArray));
    }
    if (started === false && type === 'drinks') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await makeFetch(url);
      const recipeArray = drinks[0];
      await localStorage.setItem('inProgressRecipes', JSON.stringify(recipeArray));
    }
    history.push(`/${type}/${id}/in-progress`);
  };

  useEffect(() => {
    attFood();
    isDisabled();
  }, [started]);

  return (
    <div>
      <button
        className="startBtn"
        data-testid="start-recipe-btn"
        type="button"
        disabled={ btnDisabled }
        onClick={ handleClick }
      >
        { started ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}

export default StartBtn;
