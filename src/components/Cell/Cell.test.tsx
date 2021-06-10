import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cell from './Cell';

describe('<Cell />', () => {
  test('it should mount', () => {
    render(<Cell />);
    
    const cell = screen.getByTestId('Cell');

    expect(cell).toBeInTheDocument();
  });
});