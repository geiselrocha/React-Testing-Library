import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Teste o componente FavoritePokemons.js', () => {
  test('Se é exibida na tela a mensagem No favorite pokemon found', () => {
    render(<MemoryRouter><FavoritePokemons /></MemoryRouter>);
    const noFavPokeFound = screen.getByText(/No favorite pokemon found/i);
    expect(noFavPokeFound).toBeInTheDocument();
  });

  test('Se são exibidos todos os cards de pokémons favoritados', () => {
    render(<Router history={ createMemoryHistory() }><App /></Router>);
    const favoritePokémon = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritePokémon);
  });
});
