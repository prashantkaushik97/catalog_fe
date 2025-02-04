import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductCatalog from './pages/ProductCatalog';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductCatalog />} />
      </Routes>
    </Router>
  );
};

export default App;
