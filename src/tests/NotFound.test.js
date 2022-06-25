import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../pages';

describe('Teste o componente NotFound.js', () => {
  test('Se a página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const containH2 = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(containH2).toBeInTheDocument();
  });
  test('Se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const showImage = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(showImage).toBeInTheDocument();
    expect(showImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
