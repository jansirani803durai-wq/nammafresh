import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';
import API from '../api.js';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => { axios.get(API + '/products/').then(r => setProducts(r.data.filter(x => x.is_featured).slice(0, 8))); }, []);
  return (
    <>
      <section className="hero" style={{ backgroundImage: "url('/images/banners/home-banner.png')" }}>
        <div data-aos="fade-right">
          <span className="eyebrow">Tamil Nadu Farm Fresh</span>
          <h1>Fresh groceries for every Tamil home.</h1>
          <p>Shop fruits, vegetables, millets, spices, dairy and healthy snacks sourced from trusted local farms.</p>
          <a className="btn" href="/shop">Shop Fresh Now</a>
          <a className="btn ghost heroBtn" href="/categories">Explore Categories</a>
        </div>
      </section>
      <section className="page">
        <div className="sectionTitle" data-aos="fade-up"><h2>Today's Fresh Picks</h2><p>Best-selling organic essentials for daily cooking and healthy snacking.</p></div>
        <div className="grid">{products.map(p => <ProductCard key={p.id} p={p} />)}</div>
        <section className="info rich" data-aos="fade-up">
          <h2>Why Choose NammaFresh?</h2>
          <div className="featureGrid">
            <div><h3>Farm Fresh</h3><p>Products are sourced from reliable Tamil Nadu farms and local markets.</p></div>
            <div><h3>Secure Payment</h3><p>Razorpay test checkout is integrated for safe payment demonstration.</p></div>
            <div><h3>Fast Delivery</h3><p>Neat packing and quick local delivery for daily grocery needs.</p></div>
            <div><h3>Smart Shopping</h3><p>Search, filter, sort, wishlist, cart, recommendations and order history included.</p></div>
          </div>
        </section>
      </section>
    </>
  );
}
