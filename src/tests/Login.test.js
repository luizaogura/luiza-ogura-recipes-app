import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Verificar se na página login...', () => {
  test('Tem um input de email com data testid = email-input', () => {
    renderWithRouter(<App />);
    const inputEmailEl = screen.getByTestId('email-input');
    expect(inputEmailEl).toBeInTheDocument();
  });
  test('Tem um input de password com data testid = password-input', () => {
    renderWithRouter(<App />);
    const inputPasswordEl = screen.getByTestId('password-input');
    expect(inputPasswordEl).toBeInTheDocument();
  });
  test('Tem um botão para entrar na aplicação', () => {
    renderWithRouter(<App />);
    const inputButtonEl = screen.getByRole('button', { name: /enter/i });
    expect(inputButtonEl).toBeInTheDocument();
  });
  test('Ao clicar no botão é direcionado para a aplicação', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmailEl = screen.getByTestId('email-input');
    const inputPasswordEl = screen.getByTestId('password-input');
    const inputButtonEl = screen.getByRole('button', { name: /enter/i });
    userEvent.type(inputEmailEl, 'alguem@mail.com');
    userEvent.type(inputPasswordEl, '1234567');
    expect(inputButtonEl).toBeEnabled();
    userEvent.click(inputButtonEl);
    expect(history.location.pathname).toBe('/meals');
  });
});
