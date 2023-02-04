import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import FetchContext from './FetchContext';
import useFetch from '../hooks/useFetch';

function FetchProvider({ children }) {
  const history = useHistory();
  const location = useLocation();
  const { errors, isLoading, makeFetch } = useFetch();
  const [dataSearchBar, setDataSearchBar] = useState({
    searchMealsIngredient: [],
    searchMealsName: [],
    searchMealsFirstLetter: [],
    searchDrinksIngredient: [],
    searchDrinksName: [],
    searchDrinksFirstLetter: [],
  });

  const [filteredMealsCategory, setFilteredMealsCategory] = useState([]);
  const [filteredCocktailsCategory, setFilteredCocktailsCategory] = useState([]);

  const fetchingSearchBar = async ({ searchInput, typeSearch }, searchType) => {
    switch (typeSearch) {
    case 'ingredient': {
      const dataIngredient = await makeFetch(`https://www.the${searchType}db.com/api/json/v1/1/filter.php?i=${searchInput}`);
      if (searchType.includes('meal')) {
        setDataSearchBar({
          searchMealsIngredient: dataIngredient.meals,
        });
      } else {
        setDataSearchBar({
          searchDrinksIngredient: dataIngredient.drinks,
        });
      }
      break;
    }
    case 'name': {
      const dataName = await makeFetch(`https://www.the${searchType}db.com/api/json/v1/1/search.php?s=${searchInput}`);
      if (searchType === 'meal') {
        setDataSearchBar({ searchMealsName: dataName.meals });
      } else {
        setDataSearchBar({ searchDrinksName: dataName.drinks });
      }
      break;
    }
    case 'first letter': {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const dataFirstLetter = await makeFetch(`https://www.the${searchType}db.com/api/json/v1/1/search.php?f=${searchInput}`);
      if (searchType.includes('meal')) {
        setDataSearchBar({
          searchMealsFirstLetter: dataFirstLetter.meals,
        });
      } else {
        setDataSearchBar({
          searchDrinksFirstLetter: dataFirstLetter.drinks,
        });
      }
      break;
    }
    default:
      makeFetch(`https://www.the${searchType}db.com/api/json/v1/1/search.php?s=`);
    }
  };

  useEffect(() => {
    const LENGTH_TWELVE = 12;
    switch (location.pathname) {
    case '/meals':
      Object.keys(dataSearchBar).map((element) => (
        dataSearchBar[element].length === 1
          ? history.push(`/meals/${dataSearchBar[element][0].idMeal}`)
          : setFilteredMealsCategory(
            Object.values(dataSearchBar[element]).slice(0, LENGTH_TWELVE),
          )));
      break;
    case '/drinks':
      Object.keys(dataSearchBar).map((element) => (
        dataSearchBar[element].length === 1
          ? history.push(`/drinks/${dataSearchBar[element][0].idDrink}`)
          : setFilteredCocktailsCategory(
            Object.values(dataSearchBar[element]).slice(0, LENGTH_TWELVE),
          )));
      break;
    default:
      console.log('Favor renderizar apenas em /meals ou /drinks');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSearchBar]);

  const values = useMemo(() => ({
    errors,
    isLoading,
    fetchingSearchBar,
    dataSearchBar,
    setDataSearchBar,
    filteredMealsCategory,
    setFilteredMealsCategory,
    filteredCocktailsCategory,
    setFilteredCocktailsCategory,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [
    errors,
    isLoading,
    dataSearchBar,
    filteredMealsCategory,
    filteredCocktailsCategory,
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
