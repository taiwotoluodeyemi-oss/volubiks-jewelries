import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products.json';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id || p.slug === id);
  if (!product) return (
    <div style={{ padding: 20 }}>
      <p>Product not found. <Link to="/shop">Back to shop</Link></p>
    </div>
  );

  const images = (product.images && product.images.length) ? product.images : (product.image ? [product.image] : []);
  const [active, setActive] = useState(0);

  return (
    <div style={{ padding: 20 }} className="product-page">
      <p><Link to="/shop">← Back to shop</Link></p>
      <div className="product-detail">
        <div className="gallery">
          <div className="main-image">
            {images[active] ? <img src={images[active]} alt={product.name} /> : <div className="no-image">No image</div>}
          </div>
          {images.length > 1 && (
            <div className="thumbs">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  className={i === active ? 'active' : ''}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="info">
          <h2>{product.name}</h2>
          <p><strong>₦{product.price.toFixed(2)}</strong></p>
          <p>{product.description}</p>
          <button
            className="button add-btn"
            onClick={() => {
              try {
                const cart = JSON.parse(localStorage.getItem('rv_cart') || '[]');
                cart.push(product);
                localStorage.setItem('rv_cart', JSON.stringify(cart));
                window.dispatchEvent(new Event('storage'));
              } catch (e) {
                // ignore
              }
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
