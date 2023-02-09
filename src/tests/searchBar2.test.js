import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';

describe('Testando o componente SearchBar em Drinks', () => {
  test('Filtrando por ingrediente...', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/drinks');
    });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(drinksByIngredient),
    });
    // makeMockFetch();
    const searchButton = screen.getByRole('img', {
      name: /searchicon/i,
    });
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'light+rum');

    const radioButtonIngredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioButtonIngredient);

    const searchExecButton = screen.getByTestId('exec-search-btn');
    userEvent.click(searchExecButton);

    const floridaBushwacker = await screen.findByRole('img', { name: /florida bushwacker/i });
    expect(floridaBushwacker).toBeInTheDocument();
    expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();

    jest.clearAllMocks();
  });
});
