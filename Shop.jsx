import React from 'react';
import { useSearchParams } from 'react-router-dom';
import products from './data/products.json';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') || '').trim().toLowerCase();

  // Improved search: token matching + simple fuzzy (Levenshtein) scoring and ranking
  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }
    return dp[m][n];
  }

  function scoreForProduct(p, query) {
    if (!query) return 0;
    const name = p.name.toLowerCase();
    const id = (p.id || '').toLowerCase();
    let score = 0;

    // Exact contains -> strong score
    if (name.includes(query) || id.includes(query)) score += 100;

    // Token matching: give points for each token found
    const tokens = query.split(/\s+/).filter(Boolean);
    for (const t of tokens) {
      if (name.includes(t)) score += 12;
      if (id.includes(t)) score += 8;
    }

    // Fuzzy similarity between query and name (normalized)
    const dist = levenshtein(query, name);
    const maxLen = Math.max(query.length, name.length, 1);
    const similarity = 1 - dist / maxLen; // 0..1 (may be negative for very different strings)
    if (similarity > 0) score += Math.round(similarity * 50);

    return score;
  }

  let results = products;
  if (q) {
    const scored = products.map((p) => ({ p, score: scoreForProduct(p, q) }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.p);
    // If no scored results, fall back to substring search (so user still sees something)
    results = scored.length ? scored : products.filter(p => p.name.toLowerCase().includes(q) || (p.id || '').toLowerCase().includes(q));
  }

  const [preview, setPreview] = React.useState(null);

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

  const onPreview = (product) => setPreview(product);
  const closePreview = () => setPreview(null);

  return (
    <div style={{ padding: 20 }}>
      <h2>Shop</h2>
      {q ? <p>Showing results for <strong>{q}</strong> — {results.length} found</p> : <p>All products</p>}

      {results.length === 0 ? (
        <p>No products found. Try a different search.</p>
      ) : (
        <div className="product-grid dense">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} onPreview={onPreview} />
          ))}
        </div>
      )}

      <ProductModal product={preview} open={Boolean(preview)} onClose={closePreview} onAdd={(p) => { onAdd(p); closePreview(); }} />
    </div>
  );
}
