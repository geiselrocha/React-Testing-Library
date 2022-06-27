import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente PokemonDetails.js', () => {
  test('Se informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const nameDetails = screen.getByRole('link', { name: /more details/i });
    expect(nameDetails).toBeInTheDocument();
    userEvent.click(nameDetails);

    expect(nameDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: /Summary/ });
    expect(summary).toBeInTheDocument();

    const paragraphResume = screen.getByText(pokemons[0].summary);
    expect(paragraphResume).toBeInTheDocument();
  });

  test('Se existe na página uma seção com os mapas contendo as localizações', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const gameLocations = screen.getByRole('heading',
      { name: /game locations of pikachu/i });
    expect(gameLocations).toBeInTheDocument();

    const maps = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(maps).toHaveLength(2);

    expect(maps[0]).toHaveAttribute('src', 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
    expect(maps[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(maps[1]).toHaveAttribute('src', 'https://pwo-wiki.info/images/5/5b/Pp.gif');
    expect(maps[1]).toHaveAttribute('alt', 'Pikachu location');
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const favPokeMarked = screen.getByRole('img',
      { name: `${pokemons[0].name} is marked as favorite` });
    expect(favPokeMarked).toBeInTheDocument();
    userEvent.click(checkbox);

    expect(favPokeMarked).not.toBeInTheDocument();

    const labelCheckbox = screen.getByLabelText(/pokémon favoritado\?/i);
    userEvent.click(labelCheckbox);
    expect(labelCheckbox).toBeChecked();
  });
});
