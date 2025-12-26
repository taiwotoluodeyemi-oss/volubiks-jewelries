import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('rv_cart') || '[]');
  } catch {
    return [];
  }
}

export default function Checkout() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const c = loadCart();
    // aggregate by id to compute quantities
    const map = {};
    for (const p of c) {
      if (!map[p.id]) map[p.id] = { product: p, qty: 0 };
      map[p.id].qty++;
    }
    setItems(Object.values(map));
  }, []);

  const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0);
  const VAT_RATE = 0.10; // 10%
  const vat = +(subtotal * VAT_RATE).toFixed(2);
  const total = +(subtotal + vat).toFixed(2);

  return (
    <div style={{ padding: 20 }} className="checkout">
      <h2>Checkout</h2>
      {items.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/shop" className="button primary">Go to shop</Link>
        </div>
      ) : (
        <div className="checkout-grid">
          <div className="cart-list">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="cart-item">
                <div className="cart-image"><img src={product.image} alt={product.name} /></div>
                <div className="cart-body">
                  <div className="cart-name">{product.name}</div>
                  <div className="cart-meta">Qty: {qty} × ${product.price.toFixed(2)}</div>
                </div>
                <div className="cart-line">${(product.price * qty).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <aside className="checkout-summary">
            <h3>Summary</h3>
            <div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
            <div className="summary-row"><span>VAT (10%)</span><strong>${vat.toFixed(2)}</strong></div>
            <div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>

            <Link to="/payment" state={{ subtotal, vat, total }} className="button primary" style={{ display: 'block', marginTop: 12 }}>Proceed to Payment</Link>
            <Link to="/shop" className="button ghost" style={{ display: 'block', marginTop: 8 }}>Continue shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
