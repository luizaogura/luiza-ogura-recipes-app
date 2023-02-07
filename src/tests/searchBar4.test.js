import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
// import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';

describe('Testando o componente SearchBar em Drinks', () => {
  test('Filtrando por Primeira Letra...', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/drinks');
    });
    window.alert = jest.fn();
    // makeMockFetch();
    const searchButton = screen.getByRole('img', {
      name: /searchicon/i,
    });
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'abc');

    const radioButtonFirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radioButtonFirstLetter);

    const searchExecButton = screen.getByTestId('exec-search-btn');
    userEvent.click(searchExecButton);

    await waitFor(() => {
      expect(jest.spyOn(global, 'alert').mockImplementation()).toHaveBeenCalled();
    });
  });
});
