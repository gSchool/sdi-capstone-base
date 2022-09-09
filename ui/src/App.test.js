import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders blog title', () => {
  render(<App />);
  const title = screen.getByText('GAME NIGHT');
  expect(title).toBeInTheDocument();
});
