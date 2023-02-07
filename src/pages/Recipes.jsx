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

  const [slicedMeals, setSlicedMeals] = useState([]);
  const [slicedCocktails, setSlicedCocktails] = useState([]);

  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);

  const { makeFetch } = useFetch();

  const location = useLocation();
  const { pathname } = location;
  const {
    handleClick,
    handleClickAll,
  } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchingRecipesCategory(url) {
      setIsLoading(true);
      const LENGTH_FIVE = 5;
      const data = await makeFetch(url);
      if (url.includes('meal')) {
        const fiveMeals = data.meals.slice(0, LENGTH_FIVE);
        setMealsCategory(fiveMeals);
      } else {
        const fiveDrinks = data.drinks.slice(0, LENGTH_FIVE);
        setDrinksCategory(fiveDrinks);
      }
      setIsLoading(false);
    }

    fetchingRecipesCategory('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    fetchingRecipesCategory('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    async function fetchingStartRecipes(url) {
      setIsLoading(true);
      const LENGTH_TWELVE = 12;
      const data = await makeFetch(url);
      if (url.includes('meal')) {
        const twelveMeals = data.meals.slice(0, LENGTH_TWELVE);
        setSlicedMeals(twelveMeals);
        console.log(slicedMeals);
      } else {
        const twelveMeals = data.drinks.slice(0, LENGTH_TWELVE);
        setSlicedCocktails(twelveMeals);
        // console.log(slicedCocktails);
      }
      setIsLoading(false);
    }
    fetchingStartRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    fetchingStartRecipes('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
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
      {
        (mealsCategory.length > 0 || drinksCategory.length > 0) && (
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ handleClickAll }
          >
            All
          </button>)
      }
      {
        pathname.includes('meals')
          ? <Meals slicedMeals={ slicedMeals } />
          : <Drinks slicedCocktails={ slicedCocktails } />
      }
      <Footer />
    </main>
  );
}

export default Recipes;
