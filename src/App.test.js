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

  test("3 different books - 10% discount", async () => {
    render(<App />)

    addBooksAndCalculatePrice([{ title: 'Clean Code', quantity: ONE }, { title: 'The Clean Coder', quantity: ONE }, { title: 'Clean Architecture', quantity: ONE }])

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 135');
  });

  test("4 different books - 20% discount", async () => {
    render(<App />)

    addBooksAndCalculatePrice([{ title: 'Clean Code', quantity: ONE }, { title: 'The Clean Coder', quantity: ONE }, { title: 'Clean Architecture', quantity: ONE }, { title: 'Test Driven Development', quantity: ONE }])

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 160');
  });

  test("5 different books - 25% discount", async () => {
    render(<App />)

    addBooksAndCalculatePrice([{ title: 'Clean Code', quantity: ONE }, { title: 'The Clean Coder', quantity: ONE }, { title: 'Clean Architecture', quantity: ONE }, { title: 'Test Driven Development', quantity: ONE }, { title: 'Legacy Code', quantity: ONE }])

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 187.5');
  });

});
