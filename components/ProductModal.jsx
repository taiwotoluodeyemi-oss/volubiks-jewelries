import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductModal({ product, open, onClose, onAdd }) {
  const navigate = useNavigate();
  function onSeeMore() {
    // navigate first so the route transition happens, then close the modal on next tick
    navigate(`/product/${product.id}`);
    setTimeout(() => onClose && onClose(), 50);
  }
  if (!product || !open) return null;

  const images = (product.images && product.images.length) ? product.images : (product.image ? [product.image] : []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-card">
        <button className="modal-close" aria-label="Close" onClick={onClose}>×</button>
        <div className="modal-body">
          <div className="modal-gallery">
            {images[0] ? <img src={images[0]} alt={product.name} /> : <div className="no-image">No image</div>}
          </div>
          <div className="modal-info">
            <h3>{product.name}</h3>
            <p className="price">₦{product.price.toFixed(2)}</p>
            <p className="short-desc">{product.description}</p>
            <div className="modal-actions">
              <button className="button add-btn" onClick={() => onAdd(product)}>Add to cart</button>
              <button className="button secondary" onClick={onSeeMore}>See more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
