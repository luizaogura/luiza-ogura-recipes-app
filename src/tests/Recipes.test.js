import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import Recipes from '../pages/Recipes';
import { createMemoryHistory } from 'history';

describe('Verificar se no Recipes...', () => {
  test('Tem o footer', () => {
    {
      initialEntries = ['/meals'],
      history = createMemoryHistory({ initialEntries }),
    }

    renderWithRouter(
      <Recipes />,
      initialEntries = ['/meals'],
      history = createMemoryHistory({ initialEntries }),
    );
    const drinkIconEl = screen.getByRole('img', { name: /drinkicon/i });
    expect(drinkIconEl).toBeInTheDocument();
    userEvent.click(drinkIconEl);

    const mealsIconEl = screen.getByRole('img', { name: /mealicon/i });
    expect(mealsIconEl).toBeInTheDocument();
    userEvent.click(mealsIconEl);
  });
});

describe('Verificar se no Recipes na rota Drinks...', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
  });
  test('Tem os botões de categoria', async () => {
    const categoryOrdinaryDrink = await screen.findByRole('button', { name: /ordinary/i });
    expect(categoryOrdinaryDrink).toBeInTheDocument();
    const categoryCocktail = await screen.findByRole('button', { name: /cocktail/i });
    expect(categoryCocktail).toBeInTheDocument();
    const categoryShake = await screen.findByRole('button', { name: /shake/i });
    expect(categoryShake).toBeInTheDocument();
    const categoryOther = await screen.findByRole('button', { name: /other/i });
    expect(categoryOther).toBeInTheDocument();
    const categoryCocoa = await screen.findByRole('button', { name: /cocoa/i });
    expect(categoryCocoa).toBeInTheDocument();
  });
});
