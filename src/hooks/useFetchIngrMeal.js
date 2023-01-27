import { useState } from 'react';

function useFetchIngrMeal() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoadingIngr, setIsLoadingIngr] = useState(false);
  const [errorIngr, setErrorIngr] = useState(null);

  const makeFetchIngr = async (searchIngr) => {
    try {
      setIsLoadingIngr(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchIngr}`);
      const data = await response.json();
      setIngredients(data);
    } catch (err) {
      setErrorIngr(err);
    } finally {
      setIsLoadingIngr(false);
    }
  };

  return { makeFetchIngr, ingredients, errorIngr, isLoadingIngr };
}

export default useFetchIngrMeal;
