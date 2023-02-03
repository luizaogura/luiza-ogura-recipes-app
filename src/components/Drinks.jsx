import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FetchContext from '../context/FetchContext';

function Drinks({ slicedCocktails }) {
  const { isLoading, errors } = useContext(FetchContext);
  const {
    filteredCocktailsCategory,
  } = useContext(FetchContext);

  return (
    <div>
      {
        isLoading && (
          <p>Loading...</p>
        )
      }
      {
        filteredCocktailsCategory.length > 0
          ? filteredCocktailsCategory.map(
            ({ strDrink, strDrinkThumb, idDrink }, index) => (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ idDrink }
              >
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{strDrink}</p>
              </div>
            ),
          )
          : slicedCocktails.length > 0 && (
            slicedCocktails.map(({ strDrinkThumb, strDrink }, index) => (
              <div data-testid={ `${index}-recipe-card` } key={ `${strDrink}${index}` }>
                <img
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {strDrink}
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

Drinks.propTypes = {
  slicedMeals: PropTypes.array,

}.isRequired;

export default Drinks;
