import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [title, setTitle] = useState();
  const [visivelProfile, setVisivelProfile] = useState(false);
  const [visivelSearch, setVisivelSearch] = useState(false);
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
  }, [location]);

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

          <img
            src={ searchIcon }
            alt="searchIcon"
            data-testid="search-top-btn"
            // onClick={ }
          />

        )}
      </div>

    </header>
  );
}

export default Header;
