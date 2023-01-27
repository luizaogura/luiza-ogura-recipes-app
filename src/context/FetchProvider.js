import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import FetchContext from './FetchContext';
// import useFetchIngrMeal from '../hooks/useFetchIngrMeal';
// import useFetchNameMeal from '../hooks/useFetchNameMeal';

function FetchProvider({ children }) {
  // const { makeFetchIngr, ingredients, errorIngr, isLoadingIngr } = useFetchIngrMeal();
  // const { makeFetchName, ingredientsName, errorName, isLoadingName } = useFetchNameMeal();
  // const [header, setHeader] = useState('');

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestFetch = (searchParams) => {
    console.log(searchParams);
  };

  const values = useMemo(() => ({
    requestFetch,
  }), []);

  return (
    <FetchContext.Provider value={ values }>
      {children}
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node,

}.isRequired;

export default FetchProvider;
