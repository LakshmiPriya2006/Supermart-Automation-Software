import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: ""
  });

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      setForm(res.data);
    } catch {
      alert("Failed to load product");
    }
  };

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, form);
      alert("Product updated successfully!");
      navigate("/products");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h3>Edit Product</h3>

      <form onSubmit={updateProduct}>
        <input
          className="form-control mb-3"
          name="name"
          value={form.name}
          placeholder="Product Name"
          onChange={onChange}
        />

        <input
          className="form-control mb-3"
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={onChange}
        />

        <input
          className="form-control mb-3"
          name="category"
          value={form.category}
          placeholder="Category"
          onChange={onChange}
        />

        <input
          className="form-control mb-3"
          name="stock"
          value={form.stock}
          placeholder="Stock"
          onChange={onChange}
        />

        <button className="btn btn-primary w-100">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;

