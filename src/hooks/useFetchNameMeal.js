import { useState } from 'react';

function useFetchNameMeal() {
  const [ingredientsName, setIngredientsName] = useState([]);
  const [isLoadingName, setIsLoadingName] = useState(false);
  const [errorName, setErrorName] = useState(null);

  const makeFetchName = async (searchName) => {
    try {
      setIsLoadingName(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`);
      const data = await response.json();
      setIngredientsName(data);
    } catch (err) {
      setErrorName(err);
    } finally {
      setIsLoadingName(false);
    }
  };

  return { makeFetchName, ingredientsName, errorName, isLoadingName };
}

export default useFetchNameMeal;
