import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../api.js';

export default function Categories() {
  const [cats, setCats] = useState([]); const [search, setSearch] = useState('');
  useEffect(() => { axios.get(API + '/categories/').then(r => setCats(r.data)); }, []);
  const filtered = cats.filter(c => `${c.name} ${c.description}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <section className="banner" style={{ backgroundImage: "url('/images/banners/category-banner.png')" }}><h1 data-aos="zoom-in">Shop by Category</h1></section>
      <main className="page">
        <div className="toolbar" data-aos="fade-up"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search categories and products..." /><a className="btn" href="/shop">View All Products</a></div>
        <p className="lead" data-aos="fade-up">Explore farm vegetables, seasonal fruits, traditional millets, aromatic spices, dairy, honey and family snack combos.</p>
        <div className="catgrid">{filtered.map(c => <a className="cat" href={`/shop?category=${c.slug}`} key={c.id} data-aos="fade-up"><img src={c.image} alt={c.name} /><h3>{c.name}</h3><p>{c.description}</p><span>Shop now →</span></a>)}</div>
        <section className="info rich" data-aos="fade-up">
          <h2>Popular Tamil Nadu Grocery Sections</h2>
          <div className="featureGrid">
            <div><h3>Daily Cooking Essentials</h3><p>Tomato, onion, carrot, drumstick and brinjal for everyday meals.</p></div>
            <div><h3>Traditional Healthy Grains</h3><p>Ragi and thinai millet support nutritious South Indian recipes.</p></div>
            <div><h3>Pure Spices</h3><p>Turmeric, black pepper and red chilli powder for authentic taste.</p></div>
            <div><h3>Family Combos</h3><p>Weekly baskets combine fruits, vegetables and snacks for easy ordering.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
