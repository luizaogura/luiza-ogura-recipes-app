import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext';

function Login() {
  const {
    user,
    handleChange,
    isDisabled,
  } = useContext(LoginContext);
  const { email, password } = user;
  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        value={ email }
        name="email"
        onChange={ ({ target }) => handleChange(target) }
      />

      <input
        type="password"
        data-testid="password-input"
        value={ password }
        name="password"
        onChange={ ({ target }) => handleChange(target) }
      />

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
