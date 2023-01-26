import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginValidation = ({ email, password }) => {
    const re = /\S+@\S+\.\S+/;
    const result = re.test(email);
    const LENGTH_SIX = 6;
    setIsDisabled(!(result === true && password.length > LENGTH_SIX));
  };

  const localStorageSave = (email) => {
    const response = JSON.stringify({ email });
    localStorage.setItem('user', response);
  };

  const values = useMemo(() => ({
    isDisabled,
    loginValidation,
    localStorageSave,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [isDisabled]);

  return (
    <LoginContext.Provider value={ values }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node,

}.isRequired;

export default LoginProvider;
