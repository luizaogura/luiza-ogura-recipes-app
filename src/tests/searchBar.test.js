import React from 'react';
// import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
// import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
// import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
// import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import SearchBar from '../components/SearchBar';

describe('Testando o componente SearchBar...', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  test('mudando a rota no componente para rota inexistente', () => {
    const { history } = renderWithRouter(<SearchBar />);

    // global.fetch = jest.fn().mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(mealsByIngredient.meals),
    // });
    act(() => {
      history.push('/meals');
    });

    // console.log(history);
    // const iconSearch = screen.getByTestId('search-input');
    // const buttonSearch = screen.getByTestId('exec-search-btn');
    // const radioButtonIngredient = screen.getByTestId('ingredient-search-radio');
    userEvent.type(iconSearch, 'chicken');
    userEvent.click(radioButtonIngredient);
    // userEvent.click(buttonSearch);
  });
});
