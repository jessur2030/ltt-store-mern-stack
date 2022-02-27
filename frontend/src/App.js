import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
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
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";
const App = () => {
  return (
    <Router>
      <Header />
      {/* <main className="container"> */}
      <main className="container main">
        {/* <section className="section grid"> */}
        <Routes>
          <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
          <Route
            path="/admin/productlist/:pageNumber"
            element={<ProductListPage />}
          />
          <Route path="/admin/productlist" element={<ProductListPage />} />
          <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
          <Route path="/admin/userlist" element={<UserListPage />} />
          <Route path="/admin/orderlist" element={<OrderListPage />} />
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
          <Route path="/search/:keyword" element={<HomePage />} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            element={<HomePage />}
          />
          <Route path="/page/:pageNumber" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        {/* </section> */}
      </main>
      {/* <Product /> */}
    </Router>
  );
};

export default App;
