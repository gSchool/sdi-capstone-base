import React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from './Components/Landing';

test('renders learn react link', () => {
  render(<Landing/>);
  const header = screen.getByText('Blog');
  expect(header).toBeInTheDocument();
});
