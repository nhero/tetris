import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Test2 from './Test2';

describe('<Test2 />', () => {
  test('it should mount', () => {
    render(<Test2 />);
    
    const test2 = screen.getByTestId('Test2');

    expect(test2).toBeInTheDocument();
  });
});