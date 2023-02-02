import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import FetchContext from './FetchContext';
import useFetch from '../hooks/useFetch';

function FetchProvider({ children }) {
  const { errors, isLoading, makeFetch } = useFetch();
  const [dataMealsIngredient, setDataMealsIngredient] = useState({});
  const [dataMealsName, setDataMealsName] = useState({});
  const [dataMealsFirstLetter, setDataMealsFirstLetter] = useState({});

  const fetchingMeal = async ({ searchInput, typeSearch }) => {
    const urlIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
    const urlName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    const urlFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;

    switch (typeSearch) {
    case 'ingredient': {
      const dataIngredient = await makeFetch(urlIngredient);
      setDataMealsIngredient(dataIngredient);
      break;
    }
    case 'name': {
      const dataName = await makeFetch(urlName);
      setDataMealsName(dataName);
      break;
    }
    case 'first letter': {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const dataFirstLetter = await makeFetch(urlFirstLetter);
      setDataMealsFirstLetter(dataFirstLetter);
      break;
    }
    default:
      makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
  };

  const fetchingCocktail = (searchParams) => {
    const urlIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchParams.searchInput}`;
    const urlName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchParams.searchInput}`;
    const urlFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchParams.searchInput}`;

    switch (searchParams.typeSearch) {
    case 'ingredient':
      makeFetch(urlIngredient);
      break;
    case 'name':
      makeFetch(urlName);
      break;
    case 'first letter':
      if (searchParams.searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      makeFetch(urlFirstLetter);
      break;
    default:
      makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  };

  const fetchIdMeals = (mealsId) => {
    const urlIdMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealsId}`;
    makeFetch(urlIdMeals);
  };

  const fetchIdDrinks = (drinksId) => {
    const urlIdDrinks = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${drinksId}`;
    makeFetch(urlIdDrinks);
  };

  const values = useMemo(() => ({
    errors,
    isLoading,
    fetchingMeal,
    fetchingCocktail,
    dataMealsIngredient,
    dataMealsName,
    dataMealsFirstLetter,
    fetchIdMeals,
    fetchIdDrinks,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [errors, isLoading, dataMealsIngredient]);

  return (
    <FetchContext.Provider value={ values }>
      {children}
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node,

}.isRequired;

export default FetchProvider;
