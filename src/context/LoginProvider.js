import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [user, setUser] = useState([{
    email: '',
    password: '',
  }]);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = ({ name, value }) => {
    setUser({
      [name]: value,
    });
    // const { email, password } = user;
    // console.log(email);
    // const re = /\S+@\S+\.\S+/;
    // const result = re.test(email);
    // if (email.length > 0 && result === true && password.length > 0) {
    //   setIsDisabled(false);
    // } else {
    //   setIsDisabled(true);
    // }
  };

  useEffect(() => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(() => ({
    user,
    handleChange,
    isDisabled,
    setIsDisabled,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [user]);

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
