// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
// import App from '../App';
// import { renderWithRouter } from './helpers/renderWithRouter';
// import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
// import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
// import SearchBar from '../components/SearchBar';

// const PASSWORD_INPUT = 'password-input';
// const EMAIL_INPUT = 'email-input';
// const SEARCH_INPUT = 'search-input';

// describe('Testando o componente SearchBar...', () => {
//   const inputPasswordEl = screen.getByTestId(PASSWORD_INPUT);
//   const inputButtonEl = screen.getByRole('button', { name: /enter/i });
//   const iconSearch = screen.getByTestId(SEARCH_INPUT);
//   const buttonSearch = screen.getByTestId('exec-search-btn');
//   const radioButtonIngredient = screen.getByTestId('ingredient-search-radio');

//   test('testando o fetch na rota meals', () => {
//     const { history } = renderWithRouter(<App />);

//     global.fetch = jest.fn().mockResolvedValue({
//       json: jest.fn().mockResolvedValue(mealsByIngredient.meals),
//     });
//     const inputEmailEl = screen.getByTestId('email-input');
//     const inputPasswordEl = screen.getByTestId(PASSWORD_INPUT)
//     userEvent.type(inputEmailEl, 'alguem@mail.com');
//     userEvent.type(inputPasswordEl, '1234567');
//     expect(inputButtonEl).toBeEnabled();
//     userEvent.click(inputButtonEl);
//     expect(history.location.pathname).toBe('/meals');
//     act(() => {
//       history.push('/meals');
//     });

//     console.log(history);

//     userEvent.type(iconSearch, 'chicken');
//     userEvent.click(radioButtonIngredient);
//     userEvent.click(buttonSearch);
//   });
// });
