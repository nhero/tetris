import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Grid from './Grid';

describe('<Grid />', () => {
  test('it should mount', () => {
    render(<Grid rows={20} columns={10} border={true}/>);
    
    const grid = screen.getByTestId('Grid');

    expect(grid).toBeInTheDocument();
  });
});