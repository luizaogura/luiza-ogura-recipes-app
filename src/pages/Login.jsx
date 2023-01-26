import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

function Login() {
  const {
    isDisabled,
    loginValidation,
    localStorageSave,
  } = useContext(LoginContext);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();

  useEffect(() => {
    loginValidation(user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = ({ name, value }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (form) => {
    form.preventDefault();
    localStorageSave(user.email);
    history.push('/meals');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="email"
        data-testid="email-input"
        value={ user.email }
        name="email"
        onChange={ ({ target }) => handleChange(target) }
      />

      <input
        type="password"
        data-testid="password-input"
        value={ user.password }
        name="password"
        onChange={ ({ target }) => handleChange(target) }
      />

      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
