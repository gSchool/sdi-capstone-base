import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../_app/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/App is running/i);
  expect(linkElement).toBeInTheDocument();
});
