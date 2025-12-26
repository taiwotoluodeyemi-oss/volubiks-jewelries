import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd }) {
  const thumb = (product.images && product.images.length) ? product.images[0] : product.image;
  return (
    <div className="card product-card">
      <div className="image-wrap">
        <Link to={`/product/${product.id}`}>
          <img src={thumb} alt={product.name} />
        </Link>
      </div>
      <div className="card-body">
        <h4 className="product-name">{product.name}</h4>
        <div className="product-meta">
          <strong className="price">₦{product.price.toFixed(2)}</strong>
          <button
            className="button add-btn"
            onClick={() => onAdd(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
