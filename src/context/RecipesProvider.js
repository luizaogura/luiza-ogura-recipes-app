import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import useFetch from '../hooks/useFetch';

function LoginProvider({ children }) {
  const { makeFetch } = useFetch();
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);

  useEffect(() => {
    async function fetchingRecipesMeals(url) {
      const LENGTH_FIVE = 5;
      const data = await makeFetch(url);
      const fiveMeals = data.meals.splice(0, LENGTH_FIVE);
      setMealsCategory(fiveMeals);
    }
    fetchingRecipesMeals('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const fetchingRecipesDrinks = async (url) => {
      const LENGTH_FIVE = 5;
      const data = await makeFetch(url);
      const fiveDrinks = data.drinks.splice(0, LENGTH_FIVE);
      setDrinksCategory([...fiveDrinks]);
    };
    fetchingRecipesDrinks('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(() => ({
    mealsCategory,
    drinksCategory,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [mealsCategory, drinksCategory]);

  return (
    <RecipesContext.Provider value={ values }>
      {children}
    </RecipesContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node,

}.isRequired;

export default LoginProvider;
