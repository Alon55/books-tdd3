import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { ONE, THREE, FOUR } from './constants'


describe("Book price calculator - Tests", () => {

  test('Display title', () => {
    render(<App />);
    const title = screen.getByRole('heading', { level: THREE });
    expect(title.innerHTML).toBe('Book price calculator - TDD');
  });

  test("1 book - without discount", async () => {
    render(<App />)

    const input = screen.getByLabelText('Clean Code')
    fireEvent.change(input, { target: { value: ONE } })

    const calculatePrice = screen.getByRole('button', { name: /Calculate Total Price/i });
    fireEvent.click(calculatePrice)

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 50');
  });

});
