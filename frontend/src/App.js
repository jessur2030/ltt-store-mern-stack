import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrder from "./pages/PlaceOrder";
import OrderPage from "./pages/OrderPage";
const App = () => {
  return (
    <Router>
      <Header />
      {/* <Slider /> */}

      <main className=" ">
        {/* <section className="section grid"> */}
        <Routes>
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart/:id" element={<CartPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        {/* </section> */}
      </main>
      {/* <Product /> */}
      <Footer />
    </Router>
  );
};

export default App;
