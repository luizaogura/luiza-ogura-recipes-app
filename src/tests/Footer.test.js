import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Verificar se no Footer...', () => {
  test('Tem os links com imagem para meals e drinks', () => {
    renderWithRouter(<Footer />);
    const drinkIconEl = screen.getByRole('img', { name: /drinkicon/i });
    expect(drinkIconEl).toBeInTheDocument();
    userEvent.click(drinkIconEl);

    const mealsIconEl = screen.getByRole('img', { name: /mealicon/i });
    expect(mealsIconEl).toBeInTheDocument();
    userEvent.click(mealsIconEl);
  });
});
