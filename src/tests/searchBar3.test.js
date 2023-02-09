import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
// import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Testando o componente SearchBar em Drinks', () => {
  test('Filtrando por nome...', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/drinks');
    });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(oneDrink),
    });
    // makeMockFetch();
    const searchButton = screen.getByRole('img', {
      name: /searchicon/i,
    });
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'aquamarine');

    const radioButtonName = screen.getByTestId('name-search-radio');
    userEvent.click(radioButtonName);

    const searchExecButton = screen.getByTestId('exec-search-btn');
    userEvent.click(searchExecButton);

    const aquamarine = await screen.findByRole('img', { name: /aquamarine/i });
    expect(aquamarine).toBeInTheDocument();
  });
});
