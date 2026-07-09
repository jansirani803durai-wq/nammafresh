import React, { createContext, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('namma_cart') || '[]'));
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('namma_wishlist') || '[]'));

  const syncCart = next => { localStorage.setItem('namma_cart', JSON.stringify(next)); return next; };
  const syncWish = next => { localStorage.setItem('namma_wishlist', JSON.stringify(next)); return next; };

  const addToCart = p => {
    setCart(prev => syncCart(prev.find(x => x.id === p.id) ? prev.map(x => x.id === p.id ? { ...x, quantity: x.quantity + 1 } : x) : [...prev, { ...p, quantity: 1 }]));
    toast.success(`${p.name} added to cart`);
  };
  const dec = id => setCart(prev => syncCart(prev.map(x => x.id === id ? { ...x, quantity: Math.max(1, x.quantity - 1) } : x)));
  const inc = id => setCart(prev => syncCart(prev.map(x => x.id === id ? { ...x, quantity: x.quantity + 1 } : x)));
  const remove = id => setCart(prev => syncCart(prev.filter(x => x.id !== id)));
  const clear = () => setCart(syncCart([]));
  const toggleWish = p => setWishlist(prev => {
    const exists = prev.find(x => x.id === p.id);
    toast[exists ? 'info' : 'success'](exists ? 'Removed from favorites' : 'Added to favorites');
    return syncWish(exists ? prev.filter(x => x.id !== p.id) : [...prev, p]);
  });
  const isWishlisted = id => wishlist.some(x => x.id === id);
  const total = useMemo(() => cart.reduce((s, x) => s + Number(x.price) * x.quantity, 0), [cart]);
  const delivery = total >= 599 || total === 0 ? 0 : 40;
  const grandTotal = total + delivery;
  const count = cart.reduce((s, x) => s + x.quantity, 0);
  const wishCount = wishlist.length;

  return <CartContext.Provider value={{ cart, wishlist, addToCart, inc, dec, remove, clear, total, delivery, grandTotal, count, wishCount, toggleWish, isWishlisted }}>{children}</CartContext.Provider>;
}
