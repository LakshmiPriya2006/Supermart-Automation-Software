import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <h1 className="mb-3 fw-bold" style={{ color: "#9c27b0" }}>
        Welcome to Supermart 🛒
      </h1>

      <p className="text-muted mb-4">
        Your one-stop shopping destination.
      </p>

      <Link to="/shop" className="btn btn-primary btn-lg">
        Start Shopping
      </Link>

      {/* IMAGE SECTION (Optional) */}
      <div className="mt-4">
        {/* If you want to add image later, place here */}
      </div>
    </div>
  );
}

export default Home;
