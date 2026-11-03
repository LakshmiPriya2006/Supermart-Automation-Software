import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: ""
  });
  
  const [image, setImage] = useState(null);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const u = JSON.parse(localStorage.getItem("auth_user"));
    if(!u){
      alert("Please login first!");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("category", form.category);
    fd.append("price", form.price);
    fd.append("stock", form.stock);
    if (image) fd.append("image", image);

    await axios.post("http://localhost:5000/api/products", fd);

    alert("Product Added ✅");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 550 }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-3">Add New Product</h3>

        <form onSubmit={submit}>
          <input type="text" className="form-control mb-3" placeholder="Product Name" name="name" onChange={onChange} />

          <select className="form-control mb-3" name="category" onChange={onChange}>
            <option value="">Select Category</option>
            <option value="Groceries">Groceries</option>
            <option value="Snacks">Snacks</option>
            <option value="Beverages">Beverages</option>
            <option value="Household">Household</option>
          </select>

          <input type="number" className="form-control mb-3" placeholder="Price" name="price" onChange={onChange} />
          <input type="number" className="form-control mb-3" placeholder="Stock" name="stock" onChange={onChange} />

          <input type="file" className="form-control mb-3" onChange={(e)=>setImage(e.target.files[0])} />

          <button className="btn btn-success w-100">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

