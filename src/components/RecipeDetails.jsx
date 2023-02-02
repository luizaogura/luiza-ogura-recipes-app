import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function RecipeDetails() {
  const { makeFetch, isLoading } = useFetch();
  const location = useLocation();
  const { id } = useParams();
  const [mealRecipe, setMealRecipe] = useState(true);
  const [recipeArray, setRecipeArray] = useState({});
  console.log(recipeArray);

  const fetchRecipe = async () => {
    if (location.pathname.includes('meals')) {
      setMealRecipe(true);
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await makeFetch(url);
      setRecipeArray(meals[0]);
    }
    if (location.pathname.includes('drinks')) {
      setMealRecipe(false);
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await makeFetch(url);
      setRecipeArray(drinks[0]);
    }
  };

  const ingredientes = Object.entries(recipeArray)
    .reduce((arrayOfElements, [key, value], index) => (
      (key.startsWith('strIngredient') && !!value)
        ? [...arrayOfElements, (
          <li
            key={ `strIngredient-${index}` }
            data-testid={ `${arrayOfElements.length}-ingredient-name-and-measure` }
          >
            { `${value} - ${recipeArray[`strMeasure${arrayOfElements.length + 1}`]}` }
          </li>)]
        : arrayOfElements), []);
  console.log(ingredientes);

  useEffect(() => {
    fetchRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {
        isLoading && (
          <p>Loading...</p>
        )
      }
      <div>
        { mealRecipe
          ? (
            <div>
              <p data-testid="recipe-title">
                { recipeArray.strMeal }
              </p>
              <img
                src={ recipeArray.strMealThumb }
                alt={ recipeArray.strMeal }
                data-testid="recipe-photo"
              />
              <p data-testid="recipe-category">
                { recipeArray.strCategory }
              </p>
            </div>
          )
          : (
            <div>
              <p data-testid="recipe-title">
                { recipeArray.strDrink}
              </p>
              <img
                src={ recipeArray.strDrinkThumb }
                alt={ recipeArray.strDrink }
                data-testid="recipe-photo"
              />
              { recipeArray.strAlcoholic === 'Alcoholic'
                ? (
                  <p
                    data-testid="recipe-category"
                  >
                    { `${recipeArray.strCategory} ${recipeArray.strAlcoholic}` }
                  </p>
                )
                : <p data-testid="recipe-category">{ recipeArray.strCategory }</p>}
            </div>
          )}
        <p data-testid={ `${id}-ingredient-name-and-measure` }>
          { ingredientes }
        </p>
        <p data-testid="instructions">
          { recipeArray.strInstructions }
        </p>
        <iframe
          data-testid="video"
          title="This is a unique title"
          width="420"
          height="315"
          src={
            (recipeArray.strYoutube)
              ? recipeArray.strYoutube.replace('/watch?v=', '/embed/') : null
          }
        />
      </div>
    </div>
  );
}

export default RecipeDetails;
