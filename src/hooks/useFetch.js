import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const makeFetch = async (url) => {
    try {
      setIsLoading(true);

      const response = await fetch(url);
      const json = await response.json();
      if (json.meals === null || json.drinks === null) {
        return console.log('Sorry, we haven\'t found any recipes for these filters.');
      }

      return json;
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    makeFetch, isLoading, errors,
  };
}

export default useFetch;
