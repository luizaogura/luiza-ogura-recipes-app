import React, { useContext, useEffect, useState } from 'react';
// import Footer from './Footer';
import FetchContext from '../context/FetchContext';
import useFetch from '../hooks/useFetch';

function Meals() {
  const { isLoading, errors } = useContext(FetchContext);
  const { makeFetch } = useFetch();
  const [slicedMeals, setSlicedMeals] = useState({});

  useEffect(() => {
    async function requestFetch() {
      const LENGTH_TWELVE = 12;
      const data = await makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const twelveMeals = data.meals.splice(0, LENGTH_TWELVE);
      setSlicedMeals(twelveMeals);
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
        slicedMeals.length > 0 && (
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

export default Meals;
