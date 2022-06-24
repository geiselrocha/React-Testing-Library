import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente App.js', () => {
  test('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    const favoritePokemonLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritePokemonLink).toBeInTheDocument();
  });

  test('Se a aplicação é redirecionada para a página Home', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(history.location.pathname).toBe('/');
  });

  test('Se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'About' }));
    expect(history.location.pathname).toBe('/about');
  });

  test('Se a aplicação é redirecionada para a página de Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/PageRequestedNotFound');
    expect(screen.getByRole('heading', { name: /Page requested not found/ }))
      .toBeInTheDocument();
  });
});
