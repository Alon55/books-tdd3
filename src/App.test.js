import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { ONE, THREE, FOUR } from './constants'

const addBooksAndCalculatePrice = (orderedBooks) => {

  orderedBooks.forEach(book => {
    const input = screen.getByLabelText(book.title)
    fireEvent.change(input, { target: { value: book.quantity } })
  });

  const calculatePrice = screen.getByRole('button', { name: /Calculate Total Price/i });
  fireEvent.click(calculatePrice)
}

describe("Book price calculator - Tests", () => {

  test('Display title', () => {
    render(<App />);
    const title = screen.getByRole('heading', { level: THREE });
    expect(title.innerHTML).toBe('Book price calculator - TDD');
  });

  test("1 book - without discount", async () => {
    render(<App />)

    addBooksAndCalculatePrice([{ title: 'Clean Code', quantity: ONE }])

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 50');
  });

  test("2 different books - 5% discount", async () => {
    render(<App />)

    addBooksAndCalculatePrice([{ title: 'Clean Code', quantity: ONE }, { title: 'The Clean Coder', quantity: ONE }])

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 95');
  });

});
