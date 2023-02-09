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

  const fetchRecipe = async () => {
    const LENGTH_SIX = 6;
    if (location.pathname.includes('meals')) {
      setMealRecipe(true);
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await makeFetch(url);
      setRecipeArray(meals[0]);

      const urlRecomendation = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await makeFetch(urlRecomendation);
      const arrayRecomendation = drinks.slice(0, LENGTH_SIX);
      const sixRecomendation = arrayRecomendation.map((recommend, index) => (
        { ...recommend, recipeId: index }));
      const firstPart = [sixRecomendation[0], sixRecomendation[1]];
      const secPart = [sixRecomendation[2], sixRecomendation[3]];
      const thirdPart = [sixRecomendation[4], sixRecomendation[5]];
      setRecomendation([firstPart, secPart, thirdPart]);
    }
    if (location.pathname.includes('drinks')) {
      setMealRecipe(false);
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { drinks } = await makeFetch(url);
      setRecipeArray(drinks[0]);

      const urlRecomendation = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await makeFetch(urlRecomendation);
      const arrayRecomendation = meals.slice(0, LENGTH_SIX);
      const sixRecomendation = arrayRecomendation.map((recommend, index) => (
        { ...recommend, recipeId: index }));
      const firstPart = [sixRecomendation[0], sixRecomendation[1]];
      const secPart = [sixRecomendation[2], sixRecomendation[3]];
      const thirdPart = [sixRecomendation[4], sixRecomendation[5]];
      setRecomendation([firstPart, secPart, thirdPart]);
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
        <Carousel data-testid="recommendation-carousel">
          { mealRecipe
            ? recomendation.map((recipes, index) => (
              <Carousel.Item key={ index }>
                {recipes.map((drink) => (
                  <div
                    key={ drink.idDrink }
                    data-testid={ `${drink.recipeId}-recommendation-card` }
                  >
                    <h1
                      data-testid={ `${drink.recipeId}-recommendation-title` }
                    >
                      { drink.strDrink }
                    </h1>
                  </div>
                ))}
              </Carousel.Item>
            ))
            : recomendation.map((recipes2, index2) => (
              <Carousel.Item key={ index2 }>
                {recipes2.map((meal) => (
                  <div
                    key={ meal.idMeal }
                    data-testid={ `${meal.recipeId}-recommendation-card` }
                  >
                    <h1
                      data-testid={ `${meal.recipeId}-recommendation-title` }
                    >
                      { meal.strMeal }
                    </h1>
                  </div>
                ))}
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
      <StartBtn />
    </div>
  );
}

export default RecipeDetails;
