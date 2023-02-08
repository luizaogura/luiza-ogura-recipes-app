import { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import useFetch from '../hooks/useFetch';
import FetchContext from './FetchContext';

function RecipesProvider({ children }) {
  const { makeFetch } = useFetch();
  const {
    setFilteredMealsCategory,
    setFilteredCocktailsCategory,
  } = useContext(FetchContext);

  const [isChecked, setIsChecked] = useState(false);

  const handleClick = async (name, category) => {
    const LENGTH_TWELVE = 12;
    const urlMealsCategory = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const urlDrinksCategory = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    if (isChecked === false) {
      switch (name) {
      case 'categoryButtonMeals': {
        const data = await makeFetch(urlMealsCategory);
        const twelveMeals = data.meals.slice(0, LENGTH_TWELVE);
        setFilteredMealsCategory(twelveMeals);
        setIsChecked(true);
        break;
      }
      case 'categoryButtonDrinks': {
        const data = await makeFetch(urlDrinksCategory);
        const twelveCocktails = data.drinks.slice(0, LENGTH_TWELVE);
        setFilteredCocktailsCategory(twelveCocktails);
        setIsChecked(true);
        break;
      }
      default:
        console.log('Ação de clique desconhecida');
      }
    } else {
      setFilteredMealsCategory([]);
      setFilteredCocktailsCategory([]);
      setIsChecked(false);
    }
  };

  const handleClickAll = () => {
    setFilteredMealsCategory([]);
    setFilteredCocktailsCategory([]);
  };

  const values = useMemo(() => ({
    handleClick,
    handleClickAll,
    isChecked,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [
    isChecked,
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
