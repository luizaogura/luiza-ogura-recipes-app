import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FetchContext from '../context/FetchContext';
import RecipesContext from '../context/RecipesContext';
// import useFetch from '../hooks/useFetch';

function Meals({ slicedMeals }) {
  // const { slicedMeals } = props;
  const { isLoading, errors, searchClick } = useContext(FetchContext);
  // const { makeFetch } = useFetch();
  // const [slicedMeals, setSlicedMeals] = useState({});

  const {
    filteredMealsCategory,
  } = useContext(RecipesContext);
  useEffect(() => {
    // async function fetchingStartRecipes(url) {
    //   const LENGTH_TWELVE = 12;
    //   const data = await makeFetch(url);
    //   if (url.includes('meal')) {
    //     const twelveMeals = data.meals.slice(0, LENGTH_TWELVE);
    //     setSlicedMeals(twelveMeals);
    //   } else {
    //     const twelveMeals = data.drinks.slice(0, LENGTH_TWELVE);
    //     setSlicedCocktails(twelveMeals);
    //   }
    // }
    // fetchingStartRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    // async function fetchingStartMeals() {
    //   const LENGTH_TWELVE = 12;
    //   const data = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    //   const twelveMeals = data.meals.splice(0, LENGTH_TWELVE);
    //   setSlicedMeals(twelveMeals);
    // }
    // fetchingStartMeals();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(searchClick);
  return (
    <div>
      {
        isLoading && (
          <p>Loading...</p>
        )
      }
      {
        filteredMealsCategory.length > 0
          ? filteredMealsCategory.map(({ strMeal, strMealThumb, idMeal }, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ idMeal }
            >
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            </div>
          )) : slicedMeals.length > 0 && (
            slicedMeals.map(({ strMealThumb, strMeal }, index) => (
              <div data-testid={ `${index}-recipe-card` } key={ `${strMeal}${index}` }>
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {strMeal}
                </p>
              </div>)))
      }
      {
        errors && (
          <p>Erro Fatal!!! Seu computador se autodestruirá em 5 segundos!!</p>
        )
      }
    </div>
  );
}

Meals.propTypes = {
  slicedMeals: PropTypes.array,

}.isRequired;

export default Meals;
