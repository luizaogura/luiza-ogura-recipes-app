import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FetchContext from '../context/FetchContext';

function Meals({ slicedMeals }) {
  const { isLoading, errors } = useContext(FetchContext);

  const {
    filteredMealsCategory,
  } = useContext(FetchContext);

  // console.log(searchClick);
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
              <Link to={ `/meals/${idMeal}` }>
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${index}-card-img` }
                  height={ 200 }
                  width={ 200 }
                />
                <p data-testid={ `${index}-card-name` }>{strMeal}</p>
              </Link>
            </div>
          )) : slicedMeals.length > 0 && (
            slicedMeals.map(({ strMealThumb, strMeal, idMeal }, index) => (
              <div data-testid={ `${index}-recipe-card` } key={ `${strMeal}${index}` }>
                <Link to={ `/meals/${idMeal}` }>
                  <img
                    src={ strMealThumb }
                    alt={ strMeal }
                    data-testid={ `${index}-card-img` }
                    height={ 200 }
                    width={ 200 }
                  />
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    {strMeal}
                  </p>
                </Link>
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
