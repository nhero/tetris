import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tetris from './Tetris';

describe('<Tetris />', () => {
  test('it should mount', () => {
    render(<Tetris />);
    
    const tetris = screen.getByTestId('Tetris');

    expect(tetris).toBeInTheDocument();
  });
});