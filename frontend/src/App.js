import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
// import Product from "./components/Product";

const App = () => {
  return (
    <Router>
      <Header />
      {/* <Slider /> */}

      <main className=" ">
        {/* <section className="section grid"> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart/:id" element={<CartPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        {/* </section> */}
      </main>
      {/* <Product /> */}
      <Footer />
    </Router>
  );
};

export default App;
