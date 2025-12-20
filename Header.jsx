import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function getCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem('rv_cart') || '[]');
    return cart.length;
  } catch {
    return 0;
  }
}

export default function Header() {
  const navigate = useNavigate();
  const [count, setCount] = useState(getCartCount());
  const [q, setQ] = useState('');

  useEffect(() => {
    const onStorage = () => setCount(getCartCount());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="site-header">
      <div className="brand" onClick={() => navigate('/') }>
        <div className="logo-circle">RV</div>
        <div>
          <div className="brand-title">Royal Volubiks</div>
          <div className="brand-sub">Jewelries</div>
        </div>
      </div>

      <form className="search-form" onSubmit={onSearch}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="input search-input"
          placeholder="Search products..."
          aria-label="Search products"
        />
      </form>

      <nav className="nav">
        <Link to="/shop" className="nav-link">Shop</Link>
        <Link to="/checkout" className="nav-link">Checkout</Link>
        <button className="cart-btn" onClick={() => navigate('/checkout')} aria-label="Open cart">
          🛒
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
      </nav>
    </header>
  );
}
