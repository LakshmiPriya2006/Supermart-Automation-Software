import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useCart } from "./context/CartContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "#9c27b0" }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="/">Supermart</Link>

        <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <div className="d-flex ms-auto align-items-center gap-2">

            <Link className="btn btn-light btn-sm" to="/shop">Shop</Link>
            <Link className="btn btn-light btn-sm" to="/cart">Cart ({cart.length})</Link>
            <Link className="btn btn-outline-light btn-sm" to="/orders">Orders</Link>

            {/* ADMIN + MANAGER ONLY */}
            {user && (user.role === "admin" || user.role === "manager") && (
              <>
                <Link className="btn btn-warning btn-sm" to="/products">Products</Link>
                <Link className="btn btn-info btn-sm" to="/customers">Customers</Link>
                <Link className="btn btn-success btn-sm" to="/staff">Staff</Link>
              </>
            )}

            {/* AUTH */}
            {!user ? (
              <>
                <Link className="btn btn-dark btn-sm" to="/login">Login</Link>
                <Link className="btn btn-warning btn-sm" to="/register">Sign Up</Link>
              </>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <span className="text-white small">Hi, {user.name} ({user.role})</span>
                <button className="btn btn-dark btn-sm" onClick={onLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

