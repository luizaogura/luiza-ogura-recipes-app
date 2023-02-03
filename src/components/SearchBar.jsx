import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import FetchContext from '../context/FetchContext';

function SearchBar() {
  const history = useHistory();
  const [searchParams, setSearchParams] = useState({
    searchInput: '',
    typeSearch: '',
  });
  const {
    fetchingSearchBar,
    dataSearchBar,
    setDataSearchBar,
  } = useContext(FetchContext);
  console.log(dataSearchBar);
  const location = useLocation();
  const [searchClick, setSearchClick] = useState(false);
  // const [mealOrDrink, setMealOrDrink] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const fetchSubmit = () => {
    switch (location.pathname) {
    case '/meals':
      fetchingSearchBar(searchParams, 'meal');
      Object.keys(dataSearchBar).map((element) => (
        dataSearchBar[element].length === 1
          ? history.push(`/meals/${dataSearchBar[element][0].idMeal}`)
          : setSearchClick(true)));
      setDataSearchBar({});
      break;
    case '/drinks':
      fetchingSearchBar(searchParams, 'cocktail');
      Object.keys(dataSearchBar).map((element) => (
        dataSearchBar[element].length === 1
          ? history.push(`/meals/${dataSearchBar[element][0].idMeal}`)
          : setSearchClick(true)));
      setDataSearchBar({});
      break;
    default:
      console.log(
        'Favor renderizar apenas em /meals ou /drinks',
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        name="searchInput"
        data-testid="search-input"
        onChange={ handleChange }
        value={ searchParams.searchInput }
      />
      <br />
      <label htmlFor="search-ingredient">
        <input
          id="search-ingredient"
          data-testid="ingredient-search-radio"
          type="radio"
          name="typeSearch"
          value="ingredient"
          onChange={ handleChange }
        />
        Ingredient
      </label>

      <label htmlFor="search-name">
        <input
          id="search-name"
          data-testid="name-search-radio"
          type="radio"
          name="typeSearch"
          value="name"
          onChange={ handleChange }
        />
        Name
      </label>

      <label htmlFor="search-name">
        <input
          id="search-name"
          data-testid="first-letter-search-radio"
          type="radio"
          name="typeSearch"
          value="first letter"
          onChange={ handleChange }
        />
        First letter
      </label>
      <br />
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ fetchSubmit }
      >
        SEARCH
      </button>
      <p>{searchClick}</p>
    </div>
  );
}

export default SearchBar;
