import React, { useState } from 'react';
import './App.css';
import { ZERO, BOOK_PRICE } from './constants'


function App() {
  const [cleanCodeQuantity, setCleanCodeQuantity] = useState(ZERO);
  const [totalPrice, setTotalPrice] = useState(ZERO);

  const calculateBooksPrice = () => {
    if (cleanCodeQuantity === 1) { setTotalPrice(BOOK_PRICE) }
  }

  return (
    <div className="App">
      <h3>
        Book price calculator - TDD
      </h3>
      <label htmlFor="clean-code">Clean Code <input type="number" min={ZERO} id="clean-code" value={cleanCodeQuantity} onChange={e => setCleanCodeQuantity(Number(e.target.value))}></input></label>
      <button onClick={() => calculateBooksPrice()}>Calculate Total Price</button>
      <h4>{`Total price: ${totalPrice}`}</h4>
    </div>
  );
}

export default App;
