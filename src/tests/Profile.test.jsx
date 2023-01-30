import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
// import Profile from '../pages/Profile';

describe('Testing component "Profile"', () => {
  test('the email and password routes and localStorage value renders on screen', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/');
    });
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    const loginButton = screen.getByRole('button', { name: /enter/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginButton).not.toBeDisabled();
    userEvent.click(loginButton);

    const profileButton = screen.getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
    userEvent.click(profileButton);

    const emailOnScreen = screen.getByText(/test@example.com/i);
    expect(emailOnScreen).toBeInTheDocument();
  });
  test('if Done Recipe button routes correctly', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
    expect(doneRecipesBtn).toBeInTheDocument();
    userEvent.click(doneRecipesBtn);
    const routeToRecipes = screen.getByRole('heading', { name: /done recipes/i });
    expect(routeToRecipes).toBeInTheDocument();
  });

  test('if Favorite Recipe button routes correctly', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    const favoriteRecipeBtn = screen.getByRole('button', { name: /favorite recipes/i });
    expect(favoriteRecipeBtn).toBeInTheDocument();
    userEvent.click(favoriteRecipeBtn);
    const routeToFavoriteRecipe = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(routeToFavoriteRecipe).toBeInTheDocument();
  });

  test('if logouOut button routes correctly', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    const lougOutBtn = screen.getByRole('button', { name: /logout/i });
    expect(lougOutBtn).toBeInTheDocument();
    userEvent.click(lougOutBtn);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
  });
});
