import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FiHeart, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { CartProvider, useCart } from './context/CartContext.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Categories from './pages/Categories.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Wishlist from './pages/Wishlist.jsx';
import { Link } from "react-router-dom";
function Layout() {
  const { count, wishCount } = useCart();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="brand" onClick={close}>🌿 <span>NammaFresh</span></NavLink>
        <button className="menuBtn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <FiX /> : <FiMenu />}
        </button>
        <div className={`links ${open ? 'show' : ''}`}>
          <NavLink to="/" onClick={close}>Home</NavLink>
          <NavLink to="/shop" onClick={close}>Shop</NavLink>
          <NavLink to="/categories" onClick={close}>Categories</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
          <NavLink to="/orders" onClick={close}>Orders</NavLink>
          <NavLink className="iconlink" to="/wishlist" onClick={close} title="Favorites">
            <FiHeart /> {wishCount > 0 && <b>{wishCount}</b>}
          </NavLink>
          <NavLink className="iconlink" to="/cart" onClick={close} title="Cart">
            <FiShoppingCart /> {count > 0 && <b>{count}</b>}
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<div className="page"><h1>Page not found</h1></div>} />
      </Routes>

      <footer className="footer" data-aos="fade-up">
  <div className="footer-container">

    <div className="footer-col">
      <h2>🌿 NammaFresh</h2>
      <p>
        NammaFresh brings farm-fresh vegetables, fruits, groceries,
        millets and organic essentials directly from trusted Tamil Nadu
        farmers to your doorstep with guaranteed freshness and quality.
      </p>

      <div className="socials">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
      </div>
    </div>

    <div className="footer-col">
      <h3>Quick Links</h3>

      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/categories">Categories</Link>
      <Link to="/about">About Us</Link>
      <Link to="/contact">Contact</Link>
    </div>

    <div className="footer-col">
      <h3>Customer Support</h3>

      <Link to="/cart">Shopping Cart</Link>
      <Link to="/orders">Order History</Link>
      <a href="#">Track Order</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms & Conditions</a>
    </div>

    <div className="footer-col">
      <h3>Contact Info</h3>

      <p>📍 Chennai, Tamil Nadu</p>
      <p>📞 +91 98765 43210</p>
      <p>✉ support@nammafresh.com</p>

      
    </div>

  </div>

  <div className="footer-bottom">
    © 2026 NammaFresh | Freshness Delivered Every Day | All Rights Reserved.
  </div>
</footer>
      <ToastContainer position="top-right" />
    </>
  );
}

export default function App() {
  return <CartProvider><Layout /></CartProvider>;
}
