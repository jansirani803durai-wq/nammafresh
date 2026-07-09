import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext.jsx';
import API from '../api.js';

export default function Checkout() {
  const { cart, total, delivery, grandTotal, clear } = useCart();
  const nav = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '', city: 'Tamil Nadu' });
  const [errors, setErrors] = useState({});
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const validate = () => { let e = {}; if (!form.fullName.trim()) e.fullName = 'Name required'; if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Valid email required'; if (!/^\d{10}$/.test(form.phone)) e.phone = '10 digit phone required'; if (!form.address.trim()) e.address = 'Address required'; setErrors(e); return Object.keys(e).length === 0; };
  const saveOrder = async (payment = {}) => { await axios.post(API + '/orders/place/', { ...form, items: cart, total: grandTotal, paymentStatus: 'Paid', ...payment }); clear(); toast.success('Payment successful. Order saved in MySQL.'); nav('/orders'); };
  const pay = async () => {
    if (!validate()) return; if (cart.length === 0) return toast.error('Cart is empty');
    try {
      const r = await axios.post(API + '/razorpay/create-order/', { amount: grandTotal });
      const options = { key: r.data.key, amount: r.data.amount, currency: 'INR', name: 'NammaFresh', description: 'Fresh grocery order', order_id: r.data.order_id, prefill: { name: form.fullName, email: form.email, contact: form.phone }, handler: async function (res) { await axios.post(API + '/razorpay/verify/', res); await saveOrder({ razorpayOrderId: res.razorpay_order_id, razorpayPaymentId: res.razorpay_payment_id }); }, theme: { color: '#2f8f2f' }, modal: { ondismiss: () => toast.info('Payment popup closed') } };
      new window.Razorpay(options).open();
    } catch (err) { toast.error('Razorpay failed. Check backend keys and use official test card.'); }
  };
  return <><section className="banner" style={{ backgroundImage: "url('/images/banners/shop-banner.png')" }}><h1 data-aos="zoom-in">Secure Checkout</h1></section><main className="page checkout"><div className="form" data-aos="fade-right"><h2>Delivery Details</h2>{['fullName', 'email', 'phone', 'address', 'city'].map(n => <label key={n}>{n}<input name={n} value={form[n]} onChange={change} />{errors[n] && <small>{errors[n]}</small>}</label>)}<button className="btn" onClick={pay}>Pay with Razorpay</button><p className="hint">Test card: 4100 2800 0000 1007 | Expiry: 12/30 | CVV: 123 | OTP: 123456</p></div><div className="summary" data-aos="fade-left"><h2>Payment Details</h2><table className="totalTable"><tbody>{cart.map(i => <tr key={i.id}><td>{i.name} × {i.quantity}</td><td>₹{(Number(i.price) * i.quantity).toLocaleString('en-IN')}</td></tr>)}<tr><td>Subtotal</td><td>₹{total.toLocaleString('en-IN')}</td></tr><tr><td>Delivery</td><td>{delivery === 0 ? 'Free' : `₹${delivery}`}</td></tr><tr className="grand"><td>Grand Total</td><td>₹{grandTotal.toLocaleString('en-IN')}</td></tr></tbody></table><p>After successful payment, order is saved and appears in Order History.</p></div></main></>;
}
