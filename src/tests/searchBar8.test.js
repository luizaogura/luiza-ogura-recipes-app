import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
import meals from './mocks/meals';
// import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';

describe('Testando o componente SearchBar em Drinks', () => {
  test('Filtrando por nome...', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/meals');
    });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(meals),
    });
    // makeMockFetch();
    const searchButton = screen.getByRole('img', {
      name: /searchicon/i,
    });
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'arrabiata');

    const searchExecButton = screen.getByTestId('exec-search-btn');
    userEvent.click(searchExecButton);

    expect(global.fetch).toHaveBeenCalled();
  });
});
