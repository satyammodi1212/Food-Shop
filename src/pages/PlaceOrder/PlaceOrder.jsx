import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

function PlaceOrder() {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Calculate discount and totals
  const subtotal = getTotalCartAmount();
  const discountedSubtotal = subtotal - subtotal * discount;
  const deliveryFee = discountedSubtotal === 0 ? 0 : 2;
  const total = discountedSubtotal + deliveryFee;

  // Redirect to Paytm (Replace with actual Paytm URL and parameters in a real application)
  const handlePayment = () => {
    const paytmURL = `https://paytm.com/payment?amount=${total.toFixed(2)}`;
    window.location.href = paytmURL; // Redirects to Paytm payment URL
  };

  const applyPromoCode = () => {
    if (promoCode === 'satyam@1212') {
      setDiscount(0.2); // 20% discount
    } else {
      setDiscount(0); // No discount if invalid code
    }
  };

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount</p>
              <p>${(subtotal * discount).toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${total.toFixed(2)}</b>
            </div>
          </div>
          <button type="button" onClick={handlePayment}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
