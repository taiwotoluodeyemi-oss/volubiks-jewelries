import React from 'react';
import { useSearchParams } from 'react-router-dom';
import products from './data/products.json';
import ProductCard from './components/ProductCard';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') || '').trim().toLowerCase();

  const results = q ? products.filter(p => p.name.toLowerCase().includes(q)) : products;

  const onAdd = (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem('rv_cart') || '[]');
      cart.push(product);
      localStorage.setItem('rv_cart', JSON.stringify(cart));
      // trigger storage listener (also used by Header) so cart count updates
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      // ignore
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Shop</h2>
      {q ? <p>Showing results for <strong>{q}</strong> — {results.length} found</p> : <p>All products</p>}

      {results.length === 0 ? (
        <p>No products found. Try a different search.</p>
      ) : (
        <div className="product-grid dense">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      )}
    </div>
  );
}
