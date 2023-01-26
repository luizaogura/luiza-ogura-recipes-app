import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from './LoginContext';

function HeaderProvider({ children }) {
  // const [header, setHeader] = useState('');

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(() => ({

  }), []);

  return (
    <HeaderContext.Provider value={ values }>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node,

}.isRequired;

export default HeaderProvider;
