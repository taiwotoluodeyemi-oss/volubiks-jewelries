import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import Shop from './Shop';

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </main>
    </div>
  );
}
