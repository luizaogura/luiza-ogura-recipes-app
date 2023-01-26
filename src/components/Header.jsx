import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [title, setTitle] = useState();
  const [visivelProfile, setVisivelProfile] = useState(false);
  const [visivelSearch, setVisivelSearch] = useState(false);
  const [visivelSearchBar, setVisivelSearchBar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
    case '/':
      setTitle('');
      break;
    case '/meals':
      setTitle('Meals');
      setVisivelProfile(true);
      setVisivelSearch(true);
      break;
    case '/drinks':
      setTitle('Drinks');
      setVisivelProfile(true);
      setVisivelSearch(true);
      break;
    case '/profile':
      setTitle('Profile');
      setVisivelProfile(true);
      break;
    case '/done-recipes':
      setTitle('Done Recipes');
      setVisivelProfile(true);
      break;
    case '/favorite-recipes':
      setTitle('Favorite Recipes');
      setVisivelProfile(true);
      break;
    default:
      setTitle('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleChange = () => {
    if (visivelSearchBar === false) {
      setVisivelSearchBar(true);
    } else {
      setVisivelSearchBar(false);
    }
  };

  return (

    <header>
      <h1 data-testid="page-title">{ title }</h1>

      <div className="profile">
        { visivelProfile && (

          <Link to="/profile">
            <img
              src={ profileIcon }
              alt="drinkIcon"
              data-testid="profile-top-btn"
            />
          </Link>
        )}
        { visivelSearch && (

          <button
            type="button"
            data-testid="search-top-btn"
            onClick={ handleChange }
          >
            <img
              src={ searchIcon }
              alt="searchIcon"
            />
          </button>
        )}
        { visivelSearchBar && (
          <SearchBar />
        )}

      </div>

    </header>
  );
}

export default Header;
