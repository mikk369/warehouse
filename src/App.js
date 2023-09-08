import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/MainHeader';
import GetProducts from './components/GetProducts';
import AddProducts from './components/AddProducts';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<GetProducts />} />
            <Route path="/AddProducts" element={<AddProducts />} />
            <Route path="/EditProduct/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
