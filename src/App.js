import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import LoginProvider from './context/LoginProvider';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';

function App() {
  return (
    <LoginProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/profile" component={ Profile } />

      </Switch>
    </LoginProvider>

  );
}

export default App;
