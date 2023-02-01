/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Drinks from '../components/Drinks';
import Meals from '../components/Meals';
import useFetch from '../hooks/useFetch';

function Recipes() {
  const [isLoading, setIsLoading] = useState(false);
  const [mealsCategory, setMealsCategory] = useState([]);
  const { makeFetch } = useFetch();

  const location = useLocation();
  const { pathname } = location;
  const {
    // mealsCategory,
    drinksCategory,
    handleClick,
    handleClickAll,
  } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchingRecipesMeals(url) {
      setIsLoading(true);
      const LENGTH_FIVE = 5;
      const data = await makeFetch(url);
      const fiveMeals = data.meals.splice(0, LENGTH_FIVE);
      setMealsCategory(fiveMeals);
      setIsLoading(false);
    }
    fetchingRecipesMeals('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  }, []);

  return (
    <main>
      <Header />
      {
        isLoading && (
          <p>Loading...</p>
        )
      }
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
