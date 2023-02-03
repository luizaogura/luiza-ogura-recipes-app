import { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FetchContext from './FetchContext';
import useFetch from '../hooks/useFetch';

function FetchProvider({ children }) {
  const { errors, isLoading, makeFetch } = useFetch();

  const [dataSearchBar, setDataSearchBar] = useState({
    searchMealsIngredient: [],
    searchMealsName: [],
    searchMealsFirstLetter: [],
    searchDrinksIngredient: [],
    searchDrinksName: [],
    searchDrinksFirstLetter: [],
  });

  useEffect(() => {
    // const searchOnlyElementRoutes = () => {
    //   Object.keys(dataSearchBar).forEach((element) => (dataSearchBar[element]?.length === 1
    //     ? history.push(`/meals/${dataSearchBar[element]}`)
    //     : setSearchClick(true)));
    // };
    // searchOnlyElementRoutes();
    // if (dataMealsIngredient?.meals.length === 1) {
    //   history.push(`/meals/${dataMealsIngredient.meals[0].idMeal}`);
    // } else setSearchClick(true);
    // if (dataMealsName?.meals.length === 1) {
    //   history.push(`/meals/${dataMealsName.meals[0].idMeal}`);
    // } else setSearchClick(true);
    // if (dataMealsFirstLetter?.meals.length === 1) {
    //   history.push(`/meals/${dataMealsFirstLetter.meals[0].idMeal}`);
    // } else setSearchClick(true);
    // if (dataDrinksIngredient?.drinks.length === 1) {
    //   history.push(`/drinks/${dataDrinksIngredient.drinks[0].idDrink}`);
    // } else setSearchClick(true);
    // if (dataDrinksName?.drinks.length === 1) {
    //   history.push(`/drinks/${dataDrinksName.drinks[0].idDrink}`);
    // } else setSearchClick(true);
    // if (dataDrinksFirstLetter?.drinks.length === 1) {
    //   history.push(`/drinks/${dataDrinksFirstLetter.drinks[0].idDrink}`);
    // }
  }, []);

  const fetchingSearchBar = async ({ searchInput, typeSearch }, searchType) => {
    switch (typeSearch) {
    case 'ingredient': {
      const dataIngredient = await makeFetch(`https://www.the${searchType}db.com/api/json/v1/1/filter.php?i=${searchInput}`);
      if (searchType.includes('meal')) {
        setDataSearchBar({
          ...dataSearchBar,
          searchMealsIngredient: dataIngredient.meals,
        });
      } else {
        setDataSearchBar({
          ...dataSearchBar,
          searchDrinksIngredient: dataIngredient.drinks,
        });
      }
      break;
    }
    case 'name': {
      const dataName = await makeFetch(`https://www.the${searchType}db.com/api/json/v1/1/search.php?s=${searchInput}`);
      if (searchType === 'meal') {
        setDataSearchBar({ ...dataSearchBar, searchMealsName: dataName.meals });
      } else {
        setDataSearchBar({ ...dataSearchBar, searchDrinksName: dataName.drinks });
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
          ...dataSearchBar,
          searchMealsFirstLetter: dataFirstLetter.meals,
        });
      } else {
        setDataSearchBar({
          ...dataSearchBar,
          searchDrinksFirstLetter: dataFirstLetter.drinks,
        });
      }
      break;
    }
    default:
      makeFetch(`https://www.the${searchType}db.com/api/json/v1/1/search.php?s=`);
    }
  };

  const values = useMemo(() => ({
    errors,
    isLoading,
    fetchingSearchBar,
    dataSearchBar,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [errors, isLoading, dataSearchBar]);

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
