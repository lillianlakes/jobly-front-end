import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Jobly link', () => {
  render(<App />);
  const linkElement = screen.getByRole("heading", { level: 1, name: /Jobly/i });
  expect(linkElement).toBeInTheDocument();
});
