import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
import Header from '../components/Header';

describe('Testando o componente Header...', () => {
  test('Se existe os elementos na tela icones, texto e botão de pesquisa na rota /meal', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const titleEl = screen.getByTestId('page-title');
    const iconProfire = screen.getByTestId('profile-top-btn');
    const iconSearch = screen.getByTestId('search-top-btn');

    expect(titleEl).toBeInTheDocument();
    expect(iconProfire).toBeInTheDocument();
    expect(iconSearch).toBeInTheDocument();
  });
  test('Ao fazer a pesquisa na rota /meal aparece campo de pesquisa e se eu clicar novamente esconde o campo de pesquisa', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const iconSearch = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();

    userEvent.click(iconSearch);
    expect(inputSearch).not.toBeInTheDocument();
  });
  test('testando o comportamento do header na rota "/", "/drinks", "/profile/", "done-recipes", "favorite-recipes"', () => {
    const { history } = renderWithRouter(<Header />);
    act(() => {
      history.push('/');
    });

    const titleEl = screen.getByTestId('page-title');
    expect(titleEl).toHaveTextContent('');

    act(() => {
      history.push('/drinks');
    });
    expect(titleEl).toHaveTextContent('Drinks');

    act(() => {
      history.push('/profile');
    });
    expect(titleEl).toHaveTextContent('Profile');

    act(() => {
      history.push('/done-recipes');
    });
    expect(titleEl).toHaveTextContent('Done Recipes');

    act(() => {
      history.push('/favorite-recipes');
    });
    expect(titleEl).toHaveTextContent('Favorite Recipes');

    act(() => {
      history.push('/xablau');
    });
    expect(titleEl).toHaveTextContent('');
  });
});
