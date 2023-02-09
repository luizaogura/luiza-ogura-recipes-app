import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

const urlMeal = '/meals/52978';
const urlDrink = '/drinks/13501';

describe('Verificar o RecipeDetails na rota Meals...', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(urlMeal);
    });
  });

  test('Tem os elementos da página', async () => {
    const name = await screen.getByTestId('recipe-title');
    expect(name).toBeInTheDocument();
    const img = await screen.getByTestId('recipe-photo');
    expect(img).toBeInTheDocument();
    const category = await screen.getByTestId('recipe-category');
    expect(category).toBeInTheDocument();
    const instructions = await screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    const video = await screen.getByTestId('video');
    expect(video).toBeInTheDocument();
  });

  test('Testa se tem as recomendações', async () => {
    const recommendation = await screen.getByTestId('recommendation-carousel');
    expect(recommendation).toBeInTheDocument();
  });

  test('Tem o StartBtn e é possível clicar nele', () => {
    const startBtn = screen.getByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);
  });

  test('Tem o FavoriteBtn e é possível clicar nele', () => {
    const favBtn = screen.getByTestId('favorite-btn');
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
  });

  test('Tem o ShareBtn e é possível clicar nele', () => {
    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
  });
});

describe('Verificar o RecipeDetails na rota Drinks...', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(urlDrink);
    });
  });

  test('Tem os elementos da página', async () => {
    const name = await screen.getByTestId('recipe-title');
    expect(name).toBeInTheDocument();
    const img = await screen.getByTestId('recipe-photo');
    expect(img).toBeInTheDocument();
    const category = await screen.getByTestId('recipe-category');
    expect(category).toBeInTheDocument();
    const instructions = await screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    const video = await screen.getByTestId('video');
    expect(video).toBeInTheDocument();
  });

  test('Tem o StartBtn e é possível clicar nele', () => {
    const startBtn = screen.getByTestId('start-recipe-btn');
    expect(startBtn).toBeInTheDocument();
    userEvent.click(startBtn);
  });

  test('Tem o FavoriteBtn e é possível clicar nele', () => {
    const favBtn = screen.getByTestId('favorite-btn');
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
  });

  test('Tem o ShareBtn e é possível clicar nele', () => {
    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
  });
});
