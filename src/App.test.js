import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jobly link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Jobly/i);
  expect(linkElement).toBeInTheDocument();
});
