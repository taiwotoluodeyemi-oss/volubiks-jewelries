import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Shop from './Shop';
import Checkout from './Checkout';
import Payment from './Payment';

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </main>
    </div>
  );
}
