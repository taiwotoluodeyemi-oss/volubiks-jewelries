import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAdd, onPreview }) {
  const thumb = (product.images && product.images.length) ? product.images[0] : product.image;
  return (
    <div className="card product-card">
      <div className="image-wrap" role="button" tabIndex={0} onClick={() => onPreview && onPreview(product)} onKeyDown={(e)=>{ if(e.key === 'Enter' || e.key === ' ') onPreview && onPreview(product); }}>
      {/* image uses the public path; keep the img tag for accessibility */}
        <img src={thumb} alt={product.name} />
      </div>
      <div className="card-body">
        <h4 className="product-name">{product.name}</h4>
        {product.description && (
          <p className="product-desc">{product.description}</p>
        )}
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
