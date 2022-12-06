import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders first react component - the App', () => {
  render(<App />);
  const linkElement = screen.getByText(/App is running - good work you who wrote this app:/i);
  expect(linkElement).toBeInTheDocument();
});
