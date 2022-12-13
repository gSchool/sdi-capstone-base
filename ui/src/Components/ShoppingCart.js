import React, { useEffect } from 'react';
import Header from './Header';

export default function ShoppingCart() {


  const cartItems = JSON.parse(localStorage.getItem('cartInfo'));
  console.log('I am shopping cart data', cartItems)

  return (
    <>
      <Header />
      <h1>Review Your Cart</h1>
      {cartItems.map((item, idx) => (
        <div key={idx}>
          {/* {console.log('I am the item', item)} */}

        </div >
      ))
      }
    </>
  )
}