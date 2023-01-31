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
