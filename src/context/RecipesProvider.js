import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import useFetch from '../hooks/useFetch';

function RecipesProvider({ children }) {
  const { makeFetch } = useFetch();
  // const [mealsCategory, setMealsCategory] = useState([]);
  // const [drinksCategory, setDrinksCategory] = useState([]);
  const [filteredMealsCategory, setFilteredMealsCategory] = useState([]);

  const [filteredCocktailsCategory, setFilteredCocktailsCategory] = useState([]);

  useEffect(() => {
    // async function fetchingRecipesMeals(url) {
    //   const LENGTH_FIVE = 5;
    //   const data = await makeFetch(url);
    //   const fiveMeals = data.meals.splice(0, LENGTH_FIVE);
    //   setMealsCategory(fiveMeals);
    // }
    // fetchingRecipesMeals('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    // const fetchingRecipesDrinks = async (url) => {
    //   const LENGTH_FIVE = 5;
    //   const data = await makeFetch(url);
    //   const fiveDrinks = data.drinks.splice(0, LENGTH_FIVE);
    //   setDrinksCategory([...fiveDrinks]);
    // };
    // fetchingRecipesDrinks('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async (name, category) => {
    const LENGTH_TWELVE = 12;
    const urlMealsCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const urlDrinksCategory = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

    switch (name) {
    case 'categoryButtonMeals': {
      const data = await makeFetch(urlMealsCategory);
      const twelveMeals = data.meals.splice(0, LENGTH_TWELVE);
      setFilteredMealsCategory(twelveMeals);
      break;
    }
    case 'categoryButtonDrinks': {
      const data = await makeFetch(urlDrinksCategory);
      const twelveCocktails = data.drinks.splice(0, LENGTH_TWELVE);
      setFilteredCocktailsCategory(twelveCocktails);
      break;
    }
    default:
      console.log('Ação de clique desconhecida');
    }
  };

  const handleClickAll = () => {
    setFilteredMealsCategory([]);
    setFilteredCocktailsCategory([]);
  };

  const values = useMemo(() => ({
    // mealsCategory,
    // drinksCategory,
    handleClick,
    filteredMealsCategory,
    filteredCocktailsCategory,
    handleClickAll,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [
    // mealsCategory,
    // drinksCategory,
    filteredMealsCategory,
    filteredCocktailsCategory,
  ]);

  return (
    <RecipesContext.Provider value={ values }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,

}.isRequired;

export default RecipesProvider;
