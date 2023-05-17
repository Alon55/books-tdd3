import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


describe("Book price calculator - Tests", () => {

  test('Display title', () => {
    render(<App />);
    const title = screen.getByRole('heading', { level: 3 });
    expect(title.innerHTML).toBe('Book price calculator - TDD');
  });

  test("1 book - without discount", async () => {
    render(<App />)

    const input = screen.getByLabelText('Clean Code')
    fireEvent.change(input, { target: { value: 1 } })

    const calculatePrice = screen.getByRole('button', { name: /Calculate Total Price/i });
    fireEvent.click(calculatePrice)

    const totalPrice = screen.getByRole('heading', { level: 4 });
    expect(totalPrice.innerHTML).toBe('Total price: 50');
  });

});
