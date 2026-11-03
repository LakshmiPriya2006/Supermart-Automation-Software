import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products`)
      .then(res => {
        const p = res.data.find(item => item._id === id);
        setProduct(p);
      });
  }, [id]);

  if(!product) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        
        <div className="col-md-5">
          <img src={`http://localhost:5000/${product.image}`} 
            style={{width:"100%",height:350,objectFit:"cover",borderRadius:8}} />
        </div>

        <div className="col-md-7">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.category}</p>
          <h3 className="text-success">₹{product.price}</h3>
          <p>Stock: {product.stock}</p>

          <button className="btn btn-primary mt-3"
            onClick={() => addItem(product)}>
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;

