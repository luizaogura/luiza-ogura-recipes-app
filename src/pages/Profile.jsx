import React from 'react';
// import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <>
      <Header />
      <label htmlFor="email">
        E-mail
        <input
          type="email"
          name="email"
          data-testid="profile-email"
        />
      </label>
      <button
        type="button"
        name="DoneRecipes"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        name="favoriteBtn"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        name="logoutBtn"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

export default Profile;
