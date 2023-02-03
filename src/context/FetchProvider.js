import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import FetchContext from './FetchContext';
import useFetch from '../hooks/useFetch';

function FetchProvider({ children }) {
  // const history = useHistory();
  const { errors, isLoading, makeFetch } = useFetch();
  const [dataSearchBar, setDataSearchBar] = useState({
    searchMealsIngredient: [],
    searchMealsName: [],
    searchMealsFirstLetter: [],
    searchDrinksIngredient: [],
    searchDrinksName: [],
    searchDrinksFirstLetter: [],
  });

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

  const values = useMemo(() => ({
    errors,
    isLoading,
    fetchingSearchBar,
    dataSearchBar,
    setDataSearchBar,
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
