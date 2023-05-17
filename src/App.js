import React, { useState, useEffect } from 'react';
import './App.css';
import { ZERO, ONE, TWO, BOOK_PRICE, FIVE_PERCENT } from './constants'


function App() {
  const [cleanCodeQuantity, setCleanCodeQuantity] = useState(ZERO);
  const [cleanCoderQuantity, setCleanCoderQuantity] = useState(ZERO)
  const [totalPrice, setTotalPrice] = useState(ZERO);
  const [shoppingCart, setShoppingCart] = useState([])

  useEffect(() => {
    setShoppingCart([cleanCodeQuantity, cleanCoderQuantity].filter((quantity) => { return quantity === 1 }))
  }, [cleanCodeQuantity, cleanCoderQuantity])

  const calculateBooksPrice = () => {
    if (shoppingCart.length === 2) { setTotalPrice(TWO * BOOK_PRICE * FIVE_PERCENT) }
    else if (shoppingCart.length === 1) { setTotalPrice(BOOK_PRICE) }
  }

  return (
    <div className="App">
      <h3>
        Book price calculator - TDD
      </h3>
      <label htmlFor="clean-code">Clean Code <input type="number" min={ZERO} id="clean-code" value={cleanCodeQuantity} onChange={e => setCleanCodeQuantity(Number(e.target.value))}></input></label>
      <label htmlFor="clean-coder">The Clean Coder <input type="number" min={ZERO} id="clean-coder" value={cleanCoderQuantity} onChange={e => setCleanCoderQuantity(Number(e.target.value))}></input></label>
      <button onClick={() => calculateBooksPrice()}>Calculate Total Price</button>
      <h4>{`Total price: ${totalPrice}`}</h4>
    </div>
  );
}

export default App;
