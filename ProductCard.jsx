import React from 'react';

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card product-card">
      <div className="image-wrap">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="card-body">
        <h4 className="product-name">{product.name}</h4>
        <div className="product-meta">
          <strong className="price">${product.price.toFixed(2)}</strong>
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
