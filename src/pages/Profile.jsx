import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  function getEmail() {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = user && Object.values(user)[0];
    return data;
  }

  const doneRecepiesClick = () => {
    history.push('/done-recipes');
  };

  const favoriteRecepiesClick = () => {
    history.push('/favorite-recipes');
  };

  const handleLogoutClick = () => {
    history.push('/');
    localStorage.clear();
  };

  return (

    <>
      <Header />
      <p
        data-testid="profile-email"
      >
        {getEmail()}
      </p>
      <Button
        type="button"
        name="DoneRecipes"
        data-testid="profile-done-btn"
        onClick={ doneRecepiesClick }
      >
        Done Recipes
      </Button>
      <Button
        type="button"
        name="favoriteBtn"
        data-testid="profile-favorite-btn"
        onClick={ favoriteRecepiesClick }
      >
        Favorite Recipes
      </Button>
      <Button
        type="button"
        name="logoutBtn"
        data-testid="profile-logout-btn"
        onClick={ handleLogoutClick }
      >
        Logout
      </Button>
      <Footer />
    </>
  );
}

export default Profile;
