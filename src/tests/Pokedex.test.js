import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente Pokedex.js', () => {
  test('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const containH2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(containH2).toBeInTheDocument();
  });

  test('Se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonNextPokemon).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);
  });

  test('Se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonList = screen.getAllByTestId('pokemon-name');
    expect(pokemonList[0]).toBeInTheDocument();
    expect(pokemonList).toHaveLength(1);
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const pokeType = [];
    const buttonFilter = screen.getByRole('button', { name: /all/i });
    expect(buttonFilter).toBeInTheDocument();
    pokemons.map((pokemon) => pokemon.type).forEach((type) => { pokeType.push(type); });
    pokeType.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      expect(buttonType).toHaveAttribute('data-testid', 'pokemon-type-button');
    });
  });

  test('Se a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);
    const pokeType = [];
    pokemons.map((pokemon) => pokemon.type).forEach((type) => { pokeType.push(type); });
    pokeType.forEach((type) => {
      const nameType = screen.getByTestId('pokemon-type');
      userEvent.click(screen.getByRole('button', { name: type }));
      expect(nameType).toBeInTheDocument();
    });
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });
});
