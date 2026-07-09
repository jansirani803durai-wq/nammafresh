import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';
import API from '../api.js';

export default function Shop() {
  const [products, setProducts] = useState([]), [cats, setCats] = useState([]), [search, setSearch] = useState(''), [debounced, setDebounced] = useState(''), [cat, setCat] = useState(''), [sort, setSort] = useState(''), [stock, setStock] = useState(''), [price, setPrice] = useState('');
  useEffect(() => { axios.get(API + '/categories/').then(r => setCats(r.data)); }, []);
  useEffect(() => { const t = setTimeout(() => setDebounced(search), 350); return () => clearTimeout(t); }, [search]);
  useEffect(() => { axios.get(API + `/products/?search=${debounced}&category=${cat}&sort=${sort}`).then(r => setProducts(r.data)); }, [debounced, cat, sort]);
  const filtered = products.filter(p => (stock === 'in' ? p.stock > 0 : true) && (price === 'under100' ? Number(p.price) <= 100 : price === '100to300' ? Number(p.price) > 100 && Number(p.price) <= 300 : price === 'above300' ? Number(p.price) > 300 : true));
  return (
    <>
      <section className="banner" style={{ backgroundImage: "url('/images/banners/shop-banner.png')" }}><h1 data-aos="zoom-in">Fresh Shop</h1></section>
      <main className="page shopLayout">
        <aside className="sidePanel" data-aos="fade-right">
          <h3>Categories</h3>
          <button className={!cat ? 'active' : ''} onClick={() => setCat('')}>All Products</button>
          {cats.map(c => <button className={cat === c.slug ? 'active' : ''} onClick={() => setCat(c.slug)} key={c.id}>{c.name}</button>)}
          <div className="offerBox"><h3>Fresh Basket Offer</h3><p>Free delivery above ₹599 and secure Razorpay checkout.</p></div>
        </aside>
        <section>
          <div className="toolbar" data-aos="fade-up">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by product name or description..." />
            <select value={sort} onChange={e => setSort(e.target.value)}><option value="">Sort: Featured</option><option value="price_low">Price: Low to High</option><option value="price_high">Price: High to Low</option><option value="rating">Top Rated</option><option value="newest">Newest</option></select>
            <select value={price} onChange={e => setPrice(e.target.value)}><option value="">All Prices</option><option value="under100">Under ₹100</option><option value="100to300">₹100 - ₹300</option><option value="above300">Above ₹300</option></select>
            <select value={stock} onChange={e => setStock(e.target.value)}><option value="">All Stock</option><option value="in">In Stock</option></select>
          </div>
          <h2 data-aos="fade-up">Showing {filtered.length} products{debounced ? ` for '${debounced}'` : ''}</h2>
          {filtered.length === 0 ? <div className="empty">No products found</div> : <div className="grid">{filtered.map(p => <ProductCard key={p.id} p={p} />)}</div>}
        </section>
      </main>
    </>
  );
}
