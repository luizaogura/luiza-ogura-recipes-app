import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import FetchContext from './FetchContext';
import useFetchIngrMeal from '../hooks/useFetchIngrMeal';
import useFetchNameMeal from '../hooks/useFetchNameMeal';

function FetchProvider({ children }) {
  const { makeFetchIngr } = useFetchIngrMeal();
  const { makeFetchName } = useFetchNameMeal();
  // const [header, setHeader] = useState('');

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestFetch = async ({ searchInput, typeSearch }) => {
    if (typeSearch === 'ingredient') {
      await makeFetchIngr(searchInput);
      // console.log(ingredients);
    }
    if (typeSearch === 'name') {
      await makeFetchName(searchInput);
      // console.log(ingredientsName);
    }

    if (typeSearch === 'first letter' && searchInput.length === 1) {
      await makeFetchName(searchInput);
      // console.log(ingredientsName);
    }
    if (typeSearch === 'first letter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
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
