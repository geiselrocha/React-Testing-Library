import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente About.js', () => {
  test('Se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
  });

  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const twoParagraphs = screen.getAllByText(/pokémons/i);
    expect(twoParagraphs).toHaveLength(2);
  });

  test('Se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const pokédexImage = screen.getByRole('img', { name: /pokédex/i });
    expect(pokédexImage).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
