import React, { useState, useEffect } from 'react';
import './App.css';
import { ZERO, ONE, TWO, THREE, FOUR, BOOK_PRICE, FIVE_PERCENT, TEN_PERCENT, TWENTY_PERCENT } from './constants'


function App() {
  const [cleanCodeQuantity, setCleanCodeQuantity] = useState(ZERO);
  const [cleanCoderQuantity, setCleanCoderQuantity] = useState(ZERO);
  const [cleanArchitectureQuantity, setCleanArchitectureQuantity] = useState(ZERO)
  const [tddQuantity, setTddQuantity] = useState(ZERO)
  const [totalPrice, setTotalPrice] = useState(ZERO);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    setShoppingCart([cleanCodeQuantity, cleanCoderQuantity, cleanArchitectureQuantity, tddQuantity].filter((quantity) => { return quantity === 1 }))
  }, [cleanCodeQuantity, cleanCoderQuantity, cleanArchitectureQuantity, tddQuantity])

  const calculateBooksPrice = () => {
    if (shoppingCart.length === FOUR) { setTotalPrice(FOUR * BOOK_PRICE * TWENTY_PERCENT) }
    else if (shoppingCart.length === THREE) { setTotalPrice(THREE * BOOK_PRICE * TEN_PERCENT) }
    else if (shoppingCart.length === TWO) { setTotalPrice(TWO * BOOK_PRICE * FIVE_PERCENT) }
    else if (shoppingCart.length === ONE) { setTotalPrice(BOOK_PRICE) }
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
      <button onClick={() => calculateBooksPrice()}>Calculate Total Price</button>
      <h4>{`Total price: ${totalPrice}`}</h4>
    </div>
  );
}

export default App;
