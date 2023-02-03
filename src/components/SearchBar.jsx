import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FetchContext from '../context/FetchContext';

function SearchBar() {
  const [searchParams, setSearchParams] = useState({
    searchInput: '',
    typeSearch: '',
  });
  const { fetchingSearchBar, dataSearchBar } = useContext(FetchContext);
  console.log(dataSearchBar);
  const location = useLocation();

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
      break;
    case '/drinks':
      fetchingSearchBar(searchParams, 'cocktail');
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
    </div>
  );
}

export default SearchBar;
