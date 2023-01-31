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
  // const [mealOrDrink, setMealOrDrink] = useState();
  const {
    mealsCategory,
    drinksCategory,
    // fetchingRecipesMeals,
    // fetchingRecipesDrinks,
  } = useContext(RecipesContext);
  // useEffect(() => {
  // fetchingRecipesMeals();
  // fetchingRecipesDrinks('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  // }, []);

  // useEffect(() => {
  //   const comparativeRoutes = () => {
  //     switch (location.pathname) {
  //     case '/meals':
  //       setMealOrDrink(true);
  //       break;
  //     case '/drinks':
  //       setMealOrDrink(false);
  //       break;
  //     default:
  //       console.log(
  //         'Favor renderizar apenas em /meals ou /drinks',
  //       );
  //     }
  //   };
  //   comparativeRoutes();
  // }, [location.pathname]);

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
              // onClick={}
            >
              {strCategory}
            </button>))
          : drinksCategory.map(({ strCategory }, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${strCategory}-category-filter` }
              // onClick={}
            >
              {strCategory}
            </button>))
      }
      {
        pathname.includes('meals') ? <Meals /> : <Drinks />
      }
      <Footer />
    </main>
  );
}

export default Recipes;
