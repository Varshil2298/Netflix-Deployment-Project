import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logo from '@components/Logo';
import { MAIN_PATH } from '@constant/index';

test('renders the Logo component', () => {
  render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );
  const logoElement = screen.getByAltText('Netflix Logo');
  expect(logoElement).toBeInTheDocument();
  expect(logoElement).toHaveAttribute('src', '/assets/netflix-logo.png');
});

test('navigates to the correct path when clicked', () => {
  render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );
  const linkElement = screen.getByRole('link');
  expect(linkElement).toHaveAttribute('href', `/${MAIN_PATH.browse}`);
});
