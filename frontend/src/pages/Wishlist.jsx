import React from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';
export default function Wishlist() {
  const { wishlist } = useCart();
  return <main className="page"><h1 data-aos="fade-up">Favorites</h1>{wishlist.length === 0 ? <div className="empty">No favorite products yet. Add products using the heart icon.</div> : <div className="grid">{wishlist.map(p => <ProductCard key={p.id} p={p} />)}</div>}</main>;
}
