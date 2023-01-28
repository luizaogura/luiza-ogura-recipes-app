import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const makeFetch = async (url) => {
    try {
      setIsLoading(true);

      const response = await fetch(url);
      if (response.PromiseState === 'rejected') { // verificar se tem ok
        const apiError = new Error(
          `A resposta da url ${url} veio com o status ${response.status}`, // verificar se tem status
        );
        apiError.response = response;
        throw apiError;
      }

      const json = await response.json();
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
