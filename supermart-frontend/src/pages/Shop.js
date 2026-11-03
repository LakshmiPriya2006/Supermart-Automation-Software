import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Shop() {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");

  const load = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = filter === "All"
    ? products
    : products.filter(p => p.category === filter);

  const handleAddToCart = (product) => {
    const u = JSON.parse(localStorage.getItem("auth_user"));
    if(!u){
      alert("Please login first 🚫");
      return;
    }
    addItem(product);
    alert("Added to cart ✅");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Shop Products</h3>

      <div className="d-flex justify-content-center gap-2 mb-4">
        {["All","Groceries","Snacks","Beverages","Household"].map(cat => (
          <button
            key={cat}
            className={`btn btn-sm ${filter===cat? "btn-primary":"btn-outline-primary"}`}
            onClick={()=>setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row">
        {filtered.map(product=>(
          <div className="col-md-3 mb-4" key={product._id}>
            <div className="card shadow-sm p-2" style={{minHeight:320}}>

              {product.image ? (
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  style={{width:"100%",height:150,objectFit:"cover",borderRadius:5}}
                />
              ) : (
                <div style={{background:"#eee",height:150,borderRadius:5}} />
              )}

              <h6 className="mt-2">
                <Link
                  to={`/product/${product._id}`}
                  style={{textDecoration:"none",color:"black"}}
                >
                  {product.name}
                </Link>
              </h6>

              <small className="text-secondary">{product.category}</small>
              <div className="fw-bold mt-2">₹{product.price}</div>
              <div className="small text-muted">Stock: {product.stock}</div>

              <button className="btn btn-sm btn-success mt-2 w-100"
                onClick={()=>handleAddToCart(product)}>
                Add to Cart
              </button>

            </div>
          </div>
        ))}
      </div>

      {filtered.length===0 && (
        <p className="text-center mt-3">No products available.</p>
      )}
    </div>
  );
}

export default Shop;

