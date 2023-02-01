/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Drinks from '../components/Drinks';
import Meals from '../components/Meals';

function Recipes() {
  const location = useLocation();
  const { pathname } = location;
  const {
    mealsCategory,
    drinksCategory,
    handleClick,
    handleClickAll,
  } = useContext(RecipesContext);

  return (
    <main>
      <Header />
      {
        pathname.includes('meals')
          ? mealsCategory.map(({ strCategory }, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ ({ target: { name, id } }) => handleClick(name, id) }
              name="categoryButtonMeals"
              id={ strCategory }
            >
              {strCategory}
            </button>))
          : drinksCategory.map(({ strCategory }, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ ({ target: { name, id } }) => handleClick(name, id) }
              name="categoryButtonDrinks"
              id={ strCategory }
            >
              {strCategory}
            </button>))
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickAll }
      >
        All
      </button>
      {
        pathname.includes('meals') ? <Meals /> : <Drinks />
      }
      <Footer />
    </main>
  );
}

export default Recipes;
