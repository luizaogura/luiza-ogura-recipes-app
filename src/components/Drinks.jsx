import React, { useContext, useEffect, useState } from 'react';
import FetchContext from '../context/FetchContext';
import RecipesContext from '../context/RecipesContext';
import useFetch from '../hooks/useFetch';

function Drinks() {
  const { isLoading, errors } = useContext(FetchContext);
  const { makeFetch } = useFetch();
  const [slicedCocktails, setSlicedCocktails] = useState({});
  const {
    filteredCocktailsCategory,
  } = useContext(RecipesContext);

  useEffect(() => {
    async function requestFetch() {
      const LENGTH_TWELVE = 12;
      const data = await makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const twelveCocktails = data.drinks.splice(0, LENGTH_TWELVE);
      setSlicedCocktails(twelveCocktails);
    }
    requestFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {
        isLoading && (
          <p>Loading...</p>
        )
      }
      {
        filteredCocktailsCategory.length > 0
          ? filteredCocktailsCategory.map(({ strDrink, strDrinkThumb, idDrink }) => (
            <div
              key={ idDrink }
            >
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
              />
              <p>{strDrink}</p>
            </div>
          ))
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

export default Drinks;
