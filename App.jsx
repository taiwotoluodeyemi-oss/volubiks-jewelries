import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';

// Placeholder pages to be implemented next
function ShopPlaceholder() {
  return <div style={{ padding: 20 }}><h2>Shop coming next</h2><p>I will add the shop and product pages next.</p></div>;
}

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/shop" element={<ShopPlaceholder />} />
        </Routes>
      </main>
    </div>
  );
}
