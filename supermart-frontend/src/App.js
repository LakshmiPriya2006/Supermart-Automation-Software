import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CartPage from "./pages/CartPage";
import PaymentDemo from "./pages/PaymentDemo";
import Orders from "./pages/Orders";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";

import ShowCustomers from "./pages/ShowCustomers";
import AddCustomer from "./pages/AddCustomer";

import ShowStaff from "./pages/ShowStaff";
import AddStaff from "./pages/AddStaff";

// Contexts
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />

          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/pay" element={<PaymentDemo />} />
            <Route path="/orders" element={<Orders />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin / Manager */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />

            <Route path="/customers" element={<ShowCustomers />} />
            <Route path="/customers/add" element={<AddCustomer />} />

            <Route path="/staff" element={<ShowStaff />} />
            <Route path="/staff/add" element={<AddStaff />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
