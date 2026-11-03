import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowProducts() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: ""
  });
  const [image, setImage] = useState(null);

  const load = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => { load(); }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("category", form.category);
    fd.append("stock", form.stock);
    if (image) fd.append("image", image);

    await axios.post("http://localhost:5000/api/products", fd);
    alert("Product Added ✅");
    setForm({ name:"",price:"",category:"",stock:"" });
    setImage(null);
    load();
  };

  const del = async (id) => {
    if(window.confirm("Delete this product?")){
      await axios.delete("http://localhost:5000/api/products/"+id);
      load();
    }
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-3"><b>Add Product</b></h3>

      <form onSubmit={addProduct} className="mb-4" style={{maxWidth:"400px"}}>
        
        <input className="form-control mb-2" placeholder="Product Name" name="name" value={form.name} onChange={onChange}/>
        <input className="form-control mb-2" placeholder="Price" type="number" name="price" value={form.price} onChange={onChange}/>
        <input className="form-control mb-2" placeholder="Category" name="category" value={form.category} onChange={onChange}/>
        <input className="form-control mb-2" placeholder="Stock" type="number" name="stock" value={form.stock} onChange={onChange}/>
        <input className="form-control mb-2" type="file" onChange={(e)=>setImage(e.target.files[0])}/>

        <button className="btn btn-primary">Add Product</button>
      </form>

      <h3><b>All Products</b></h3>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p=>(
            <tr key={p._id}>
              <td>{p.image?<img src={`http://localhost:5000/${p.image}`} width="50"/>:"-"}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td><button className="btn btn-warning btn-sm">Edit</button></td>
              <td><button className="btn btn-danger btn-sm" onClick={()=>del(p._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default ShowProducts;

