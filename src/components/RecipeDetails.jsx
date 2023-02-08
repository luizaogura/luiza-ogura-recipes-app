import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import FavoriteBtn from './FavoriteBtn';
import ShareBtn from './ShareBtn';
import StartBtn from './StartBtn';

function RecipeDetails() {
  const { makeFetch, isLoading } = useFetch();
  const location = useLocation();
  const { id } = useParams();
  const [mealRecipe, setMealRecipe] = useState(true);
  const [recipeArray, setRecipeArray] = useState({});
  const [recomendation, setRecomendation] = useState([]);
  console.log(recipeArray);
  console.log(recomendation);

  const fetchRecipe = async () => {
    const LENGTH_SIX = 6;
    if (location.pathname.includes('meals')) {
      setMealRecipe(true);
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await makeFetch(url);
      setRecipeArray(meals[0]);

      const urlRecomendation = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await makeFetch(urlRecomendation);
      const sixRecomendation = drinks.slice(0, LENGTH_SIX);
      setRecomendation(sixRecomendation);
    }
    if (location.pathname.includes('drinks')) {
      setMealRecipe(false);
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await makeFetch(url);
      setRecipeArray(drinks[0]);

      const urlRecomendation = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await makeFetch(urlRecomendation);
      const sixRecomendation = meals.slice(0, LENGTH_SIX);
      setRecomendation(sixRecomendation);
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
        <FavoriteBtn />
        <ShareBtn />
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
      <div>
        <Carousel>
          { mealRecipe
            ? recomendation.map(({ strDrink, idDrink }, index) => (
              <Carousel.Item key={ index }>
                <div
                  key={ idDrink }
                  data-testid={ `${index}-recommendation-card` }
                >
                  <h1
                    data-testid={ `${idDrink}-recommendation-title` }
                  >
                    { strDrink }
                  </h1>
                </div>
              </Carousel.Item>
            ))
            : recomendation.map(({ strMeal, idMeal }, index) => (
              <Carousel.Item key={ index }>
                <div
                  key={ idMeal }
                  data-testid={ `${index}-recommendation-card` }
                >
                  <h1
                    data-testid={ `${idMeal}-recommendation-title` }
                  >
                    { strMeal }
                  </h1>
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
      <StartBtn />
    </div>
  );
}

export default RecipeDetails;
