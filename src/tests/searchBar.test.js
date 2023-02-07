import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import { makeMockFetch } from './helpers/makeMockFetch';

describe('Testando o componente SearchBar em Meals', () => {
  test('Filtrando por ingrediente...', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/meals');
    });
    // jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    //   json: jest.fn().mockResolvedValueOnce(mealsByIngredient),
    // });
    makeMockFetch();
    const searchButton = screen.getByRole('img', {
      name: /searchicon/i,
    });
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'chicken');

    const radioButtonIngredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioButtonIngredient);

    const searchExecButton = screen.getByTestId('exec-search-btn');
    userEvent.click(searchExecButton);

    const brownStewChicken = await screen.findByRole('img', { name: /brown stew chicken/i });
    expect(brownStewChicken).toBeInTheDocument();
    jest.resetAllMocks();
  });
});
