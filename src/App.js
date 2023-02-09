import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import LoginProvider from './context/LoginProvider';
import FetchProvider from './context/FetchProvider';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';
import RecipesProvider from './context/RecipesProvider';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './pages/RecipesInProgress';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <LoginProvider>
      <FetchProvider>
        <RecipesProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Recipes } />
            <Route exact path="/drinks" component={ Recipes } />
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
            <Route
              exact
              path="/meals/:id/in-progress"
              component={ RecipeInProgress }
            />
            <Route
              exact
              path="/drinks/:id/in-progress"
              component={ RecipeInProgress }
            />
            <Route path="*" component={ PageNotFound } />
          </Switch>
        </RecipesProvider>
      </FetchProvider>
    </LoginProvider>
  );
}

export default App;
