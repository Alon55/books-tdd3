import React, { useState, useEffect } from 'react';
import './App.css';
import { ZERO, ONE, TWO, THREE, FOUR, BOOK_PRICE, FIVE_PERCENT, TEN_PERCENT, TWENTY_PERCENT, FIVE, TWENTY_FIVE_PERCENT } from './constants'


function App() {
  const [cleanCodeQuantity, setCleanCodeQuantity] = useState(ZERO);
  const [cleanCoderQuantity, setCleanCoderQuantity] = useState(ZERO);
  const [cleanArchitectureQuantity, setCleanArchitectureQuantity] = useState(ZERO);
  const [tddQuantity, setTddQuantity] = useState(ZERO);
  const [legacyCodeQuantity, setLegacyCodeQuantity] = useState(ZERO);
  const [totalPrice, setTotalPrice] = useState(ZERO);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    setShoppingCart([
      ...Array(cleanCodeQuantity).fill('cleanCode'),
      ...Array(cleanCoderQuantity).fill('cleanCoder'),
      ...Array(cleanArchitectureQuantity).fill('cleanArchitecture'),
      ...Array(tddQuantity).fill('tdd'),
      ...Array(legacyCodeQuantity).fill('legacyCode')
    ])
  }, [cleanCodeQuantity, cleanCoderQuantity, cleanArchitectureQuantity, tddQuantity, legacyCodeQuantity])

  const seperateBooksToGroupOfSets = () => {
    const groupsOfBooks = []
    while (!shoppingCart.every(book => !book)) {
      const groupOfBooks = []
      shoppingCart.forEach((book, index) => {
        if (!groupOfBooks.includes(book) && book) {
          groupOfBooks.push(book)
          shoppingCart[index] = false
        }
      });
      groupsOfBooks.push(groupOfBooks)
    }
    return groupsOfBooks
  }

  const calculateBooksPrice = () => {

    let totalPrice = ZERO
    const setsOfBooks = seperateBooksToGroupOfSets()

    setsOfBooks.forEach((setOfBook) => {
      if (setOfBook.length === FIVE) { totalPrice += FIVE * BOOK_PRICE * TWENTY_FIVE_PERCENT }
      else if (setOfBook.length === FOUR) { totalPrice += FOUR * BOOK_PRICE * TWENTY_PERCENT }
      else if (setOfBook.length === THREE) { totalPrice += THREE * BOOK_PRICE * TEN_PERCENT }
      else if (setOfBook.length === TWO) { totalPrice += TWO * BOOK_PRICE * FIVE_PERCENT }
      else if (setOfBook.length === ONE) { totalPrice += BOOK_PRICE }

    })
    setTotalPrice(totalPrice)
  }

  return (
    <div className="App">
      <h3>
        Book price calculator - TDD
      </h3>
      <label htmlFor="clean-code">Clean Code <input type="number" min={ZERO} id="clean-code" value={cleanCodeQuantity} onChange={e => setCleanCodeQuantity(Number(e.target.value))}></input></label>
      <label htmlFor="clean-coder">The Clean Coder <input type="number" min={ZERO} id="clean-coder" value={cleanCoderQuantity} onChange={e => setCleanCoderQuantity(Number(e.target.value))}></input></label>
      <label htmlFor="clean-architecture">Clean Architecture <input type="number" min={ZERO} id="clean-architecture" value={cleanArchitectureQuantity} onChange={e => setCleanArchitectureQuantity(Number(e.target.value))}></input></label>
      <label htmlFor="tdd">Test Driven Development <input type="number" id="tdd" min={ZERO} value={tddQuantity} onChange={e => setTddQuantity(Number(e.target.value))}></input></label>
      <label htmlFor="legacy-code">Legacy Code <input type="number" id="legacy-code" min={ZERO} value={legacyCodeQuantity} onChange={e => setLegacyCodeQuantity(Number(e.target.value))}></input></label>
      <button onClick={() => calculateBooksPrice()}>Calculate Total Price</button>
      <h4>{`Total price: ${totalPrice}`}</h4>
    </div>
  );
}

export default App;
