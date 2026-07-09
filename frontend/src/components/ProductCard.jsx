import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ p }) {
  const { addToCart, toggleWish, isWishlisted } = useCart();
  return (
    <div className="card" data-aos="fade-up">
      <div className="badge">{p.is_new ? 'New' : p.is_featured ? 'Best Seller' : 'Fresh'}</div>
      <button className={`wishBtn ${isWishlisted(p.id) ? 'active' : ''}`} onClick={() => toggleWish(p)} title="Add to favorites"><FiHeart /></button>
      <Link to={`/shop?product=${p.slug}`} className="productImage">
        <img src={p.image} alt={p.name} onError={e => { e.currentTarget.src = '/images/products/family-combo.png'; }} />
      </Link>
      <span className="catName">{p.category_name}</span>
      <h3>{p.name}</h3>
      <p>{p.description}</p>
      <div className="meta"><span><FiStar /> {p.rating}</span><span>{p.unit}</span><span>{p.stock > 0 ? 'In stock' : 'Out of stock'}</span></div>
      <div className="price"><b>₹{Number(p.price).toLocaleString('en-IN')}</b>{p.old_price && <del>₹{Number(p.old_price).toLocaleString('en-IN')}</del>}</div>
      <div className="actions">
        <button onClick={() => addToCart(p)}><FiShoppingCart /> Add to Cart</button>
    
      </div>
    </div>
  );
}
