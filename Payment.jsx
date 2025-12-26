import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('rv_cart') || '[]');
  } catch {
    return [];
  }
}

export default function Payment() {
  const { state } = useLocation();
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  // Fallback: if state not provided, compute totals from current cart
  const [summary, setSummary] = useState(() => state || { subtotal: 0, vat: 0, total: 0 });

  useEffect(() => {
    if (!state) {
      const cart = loadCart();
      const map = {};
      for (const p of cart) {
        if (!map[p.id]) map[p.id] = { product: p, qty: 0 };
        map[p.id].qty++;
      }
      const items = Object.values(map);
      const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0);
      const vat = +(subtotal * 0.10).toFixed(2);
      const total = +(subtotal + vat).toFixed(2);
      setSummary({ subtotal, vat, total });
    }
  }, [state]);

  const onPay = () => {
    setProcessing(true);
    setTimeout(() => {
      // simulate payment success
      localStorage.removeItem('rv_cart');
      window.dispatchEvent(new Event('storage'));
      setPaid(true);
      setProcessing(false);
    }, 1000);
  };

  if (paid) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Payment successful</h2>
        <p>Thanks! Your payment of <strong>${summary.total.toFixed(2)}</strong> was processed.</p>
        <Link to="/">Return to home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Payment</h2>
      <p>Amounts below are based on your cart.</p>

      <div className="checkout-summary" style={{ maxWidth: 420 }}>
        <div className="summary-row"><span>Subtotal</span><strong>${summary.subtotal.toFixed(2)}</strong></div>
        <div className="summary-row"><span>VAT (10%)</span><strong>${summary.vat.toFixed(2)}</strong></div>
        <div className="summary-total"><span>Total</span><strong>${summary.total.toFixed(2)}</strong></div>
      </div>

      <div style={{ marginTop: 16 }}>
        <button className="button primary" onClick={onPay} disabled={processing}>
          {processing ? 'Processing…' : `Pay ${summary.total.toFixed(2)}`}
        </button>
        <Link to="/checkout" className="button ghost" style={{ marginLeft: 8 }}>Back to checkout</Link>
      </div>
    </div>
  );
}
