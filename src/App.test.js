import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { ONE, TWO, THREE, FOUR } from './constants'

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

  test("4 books, 3 different", async () => {
    render(<App />)

    addBooksAndCalculatePrice([{ title: 'Clean Code', quantity: TWO }, { title: 'The Clean Coder', quantity: ONE }, { title: 'Clean Architecture', quantity: ONE }])

    const totalPrice = screen.getByRole('heading', { level: FOUR });
    expect(totalPrice.innerHTML).toBe('Total price: 185');
  });

  test("Discount information display", async () => {
    render(<App />)

    const informationTitle = screen.getByTestId('info-title')
    const information5Percent = screen.getByTestId('info-5%')
    const information10Percent = screen.getByTestId('info-10%')
    const information20Percent = screen.getByTestId('info-20%')
    const information25Percent = screen.getByTestId('info-25%')

    expect(informationTitle.innerHTML).toBe('Our special offers for today:');
    expect(information5Percent.innerHTML).toBe('Buy 2 different books and get a 5% discount on them');
    expect(information10Percent.innerHTML).toBe('Buy 3 different books and get a 10% discount on them');
    expect(information20Percent.innerHTML).toBe('Buy 4 different books and get a 20% discount on them');
    expect(information25Percent.innerHTML).toBe('Buy 5 different books and get a 25% discount on them');

  });

});
