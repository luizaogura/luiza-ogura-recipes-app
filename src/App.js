import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import LoginProvider from './context/LoginProvider';
import FetchProvider from './context/FetchProvider';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <LoginProvider>
      <FetchProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route
            exact
            path="/meals/:id"
            component={ RecipeDetails }
          />
          <Route
            exact
            path="/drinks/:id"
            component={ RecipeDetails }
          />
        </Switch>
      </FetchProvider>
    </LoginProvider>

  );
}

export default App;
