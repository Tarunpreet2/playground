import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home heading', () => {
  window.history.pushState({}, 'Home', '/playground/');
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /welcome to automation playground!/i })
  ).toBeInTheDocument();
});
