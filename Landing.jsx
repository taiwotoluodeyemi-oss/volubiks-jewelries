import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import Carousel from './components/Carousel';
import productsData from './data/products.json';

export default function Landing() {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('popular');

  const products = useMemo(() => {
    let list = productsData.slice();
    if (filter) {
      const q = filter.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    return list;
  }, [filter, sort]);

  const addToCart = (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem('rv_cart') || '[]');
      cart.push({ id: product.id, name: product.name, price: product.price });
      localStorage.setItem('rv_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
      alert(`${product.name} added to cart`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="landing">
      <section className="hero hero-compact">
        <div className="sparkle s1" />
        <div className="sparkle s2" />
        <div className="sparkle s3" />
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="logo-heading" aria-label="Royal Volubiks Jewelries">
              <span className="crown" aria-hidden="true"><svg width="28" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M2 8l3 8 4-6 4 6 4-8 3 8H2z" fill="#b8860b"/></svg></span>
            <svg className="title-svg" viewBox="0 0 1200 260" preserveAspectRatio="xMinYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <text x="0" y="180" className="svg-title" fill="#b8860b" fontSize="220" textLength="1040" lengthAdjust="spacingAndGlyphs">Royal Volubiks Jewelries</text>
            </svg> 
              <span className="sr-only">Royal Volubiks Jewelries</span>
            </h1>
            <p className="lead">Explore thousands of pieces — everyday low prices, premium shine.</p>
            <div className="hero-ctas">
              <Link to="/shop"><button className="button primary">Shop Collection</button></Link>
              <a href="#products"><button className="button ghost">Browse Products</button></a>
            </div>
          </div>
          <div className="hero-image" aria-hidden="true">
            <img src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1400&q=80" alt="Jewelry" />
          </div>
        </div>
      </section>

      <section id="featured" className="product-section">
        <h2>Featured</h2>
        <Carousel products={productsData} perPage={6} autoPlay={true} interval={3000} onAdd={addToCart} />
      </section>

      <section id="products" className="product-section">
        <div className="product-tools">
          <div>
            <input className="input" placeholder="Filter products..." value={filter} onChange={e => setFilter(e.target.value)} />
          </div>
          <div>
            <select className="input" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="popular">Sort: Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="product-grid dense">
          {products.map(p => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>
      </section>

      <section id="about" className="features">
        <h2>Why Royal Volubiks?</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Timeless Design</h3>
            <p>Each piece is designed for elegance and longevity.</p>
          </div>
          <div className="feature">
            <h3>Handcrafted</h3>
            <p>Artisan-made with attention to detail and quality materials.</p>
          </div>
          <div className="feature">
            <h3>Secure Payments</h3>
            <p>Pay using Paystack or Moniepoint integrations (test mode available).</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>Visit & Contact</h2>
        <p>Open to collaborations and custom orders. Email: <a href="mailto:hello@volubiks.example">hello@volubiks.example</a></p>
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Royal Volubiks Jewelries</p>
      </footer>
    </div>
  );
}
