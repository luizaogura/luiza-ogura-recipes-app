import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import FetchContext from './FetchContext';
import useFetch from '../hooks/useFetch';

function FetchProvider({ children }) {
  const { errors, isLoading, makeFetch } = useFetch();
  const [dataMealsIngredient, setDataMealsIngredient] = useState({ meals: [] });
  const [dataMealsName, setDataMealsName] = useState({ meals: [] });
  const [dataMealsFirstLetter, setDataMealsFirstLetter] = useState({ meals: [] });
  const [dataDrinksIngredient, setDataDrinksIngredient] = useState({ drinks: [] });
  const [dataDrinksName, setDataDrinksName] = useState({ drinks: [] });
  const [dataDrinksFirstLetter, setDataDrinksFirstLetter] = useState({ drinks: [] });
  const [searchClick, setSearchClick] = useState(false);
  // const [fullRequestMeals, setFullRequestMeals] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (dataMealsIngredient?.meals.length === 1) {
      history.push(`/meals/${dataMealsIngredient.meals[0].idMeal}`);
    } else setSearchClick(true);
    if (dataMealsName?.meals.length === 1) {
      history.push(`/meals/${dataMealsName.meals[0].idMeal}`);
    } else setSearchClick(true);
    if (dataMealsFirstLetter?.meals.length === 1) {
      history.push(`/meals/${dataMealsFirstLetter.meals[0].idMeal}`);
    } else setSearchClick(true);
    if (dataDrinksIngredient?.drinks.length === 1) {
      history.push(`/drinks/${dataDrinksIngredient.drinks[0].idDrink}`);
    } else setSearchClick(true);
    if (dataDrinksName?.drinks.length === 1) {
      history.push(`/drinks/${dataDrinksName.drinks[0].idDrink}`);
    } else setSearchClick(true);
    if (dataDrinksFirstLetter?.drinks.length === 1) {
      history.push(`/drinks/${dataDrinksFirstLetter.drinks[0].idDrink}`);
    }
  }, [
    dataMealsIngredient, dataMealsName, dataMealsFirstLetter,
    dataDrinksIngredient, dataDrinksName, dataDrinksFirstLetter,
  ]);

  const fetchingMeal = async ({ searchInput, typeSearch }) => {
    const urlIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
    const urlName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    const urlFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;

    switch (typeSearch) {
    case 'ingredient': {
      const dataIngredient = await makeFetch(urlIngredient);
      setDataMealsIngredient(dataIngredient);
      return dataMealsIngredient;
    }
    case 'name': {
      const dataName = await makeFetch(urlName);
      // console.log(dataName);
      setDataMealsName(dataName);

      return dataMealsName;
    }
    case 'first letter': {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const dataFirstLetter = await makeFetch(urlFirstLetter);
      setDataMealsFirstLetter(dataFirstLetter);
      return dataMealsFirstLetter;
    }
    default:
      makeFetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
  };

  const fetchingCocktail = async (searchParams) => {
    const urlIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchParams.searchInput}`;
    const urlName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchParams.searchInput}`;
    const urlFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchParams.searchInput}`;

    switch (searchParams.typeSearch) {
    case 'ingredient': {
      const dataIngredient = await makeFetch(urlIngredient);
      setDataDrinksIngredient(dataIngredient);
      return dataDrinksIngredient;
    }
    case 'name': {
      const dataName = await makeFetch(urlName);
      setDataDrinksName(dataName);
      return dataDrinksName;
    }
    case 'first letter': {
      if (searchParams.searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const dataFirstLetter = await makeFetch(urlFirstLetter);
      setDataDrinksFirstLetter(dataFirstLetter);
      return dataDrinksFirstLetter;
    }
    default:
      makeFetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  };

  const values = useMemo(() => ({
    errors,
    isLoading,
    searchClick,
    fetchingMeal,
    fetchingCocktail,
    dataMealsIngredient,
    dataMealsName,
    dataMealsFirstLetter,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [
    errors, isLoading, searchClick, dataMealsIngredient, dataMealsName,
    setDataMealsName, dataMealsFirstLetter,
    dataDrinksIngredient, dataDrinksName, dataDrinksFirstLetter,
  ]);

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
