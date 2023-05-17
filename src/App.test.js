import { render, screen } from '@testing-library/react';
import App from './App';


describe("Book price calculator - Tests", () => {

  test('Display title', () => {
    render(<App />);
    const title = screen.getByRole('heading', { level: 3 });
    expect(title.innerHTML).toBe('Book price calculator - TDD');
  });

});
