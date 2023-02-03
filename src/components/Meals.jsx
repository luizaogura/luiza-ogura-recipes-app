import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FetchContext from '../context/FetchContext';

function Meals({ slicedMeals }) {
  const { isLoading, errors, searchClick } = useContext(FetchContext);

  const {
    filteredMealsCategory,
  } = useContext(FetchContext);

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
