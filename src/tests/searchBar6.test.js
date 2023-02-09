import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';
// import { makeMockFetch } from './helpers/makeMockFetch';
import oneMealLetter from './mocks/oneMealLetter';

describe('Testando o componente SearchBar em Drinks', () => {
  test('Filtrando por Primeira Letra...', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/meals');
    });
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(oneMealLetter),
    });
    // makeMockFetch();
    const searchButton = screen.getByRole('img', {
      name: /searchicon/i,
    });
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'a');

    const radioButtonFirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radioButtonFirstLetter);

    const searchExecButton = screen.getByTestId('exec-search-btn');
    userEvent.click(searchExecButton);

    const mealAppleFrangipan = await screen.findByRole('img', { name: /apple frangipan/i });
    expect(mealAppleFrangipan).toBeInTheDocument();

    screen.logTestingPlaygroundURL();
  });
});
