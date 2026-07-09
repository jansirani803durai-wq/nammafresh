import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { cart, inc, dec, remove, total, delivery, grandTotal } = useCart();
  return (
    <main className="page">
      <h1 data-aos="fade-up"><FiShoppingCart /> Your Cart</h1>
      {cart.length === 0 ? <div className="empty">Cart is empty. <Link to="/shop">Shop now</Link></div> : <div className="checkout">
        <div className="cartbox" data-aos="fade-right">
          {cart.map(i => <div className="cartitem" key={i.id}>
            <img src={i.image} alt={i.name} /><div><h3>{i.name}</h3><p>₹{Number(i.price).toLocaleString('en-IN')} × {i.quantity}</p></div>
            <div className="qty"><button onClick={() => dec(i.id)}>-</button><b>{i.quantity}</b><button onClick={() => inc(i.id)}>+</button></div>
            <button className="danger" onClick={() => remove(i.id)}>Remove</button>
          </div>)}
        </div>
        <div className="summary" data-aos="fade-left">
          <h2>Order Summary</h2>
          <table className="totalTable"><tbody>
            <tr><td>Subtotal</td><td>₹{total.toLocaleString('en-IN')}</td></tr>
            <tr><td>Delivery</td><td>{delivery === 0 ? 'Free' : `₹${delivery}`}</td></tr>
            <tr className="grand"><td>Grand Total</td><td>₹{grandTotal.toLocaleString('en-IN')}</td></tr>
          </tbody></table>
          <p className="hint">Free delivery above ₹599. Secure payment with Razorpay test mode.</p>
          <Link className="btn full" to="/checkout">Proceed to Checkout</Link>
        </div>
      </div>}
    </main>
  );
}
