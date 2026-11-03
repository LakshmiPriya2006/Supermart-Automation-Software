import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add Product Form
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: ""
  });
  const [image, setImage] = useState(null);

  // Edit Product
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: ""
  });
  const [editImage, setEditImage] = useState(null);

  const authUser = JSON.parse(localStorage.getItem("auth_user") || "null");
  const isAdminOrManager =
    authUser && (authUser.role === "admin" || authUser.role === "manager");

  // Load
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data || []);
    } catch {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ADD PRODUCT
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("price", form.price);
      fd.append("category", form.category);
      fd.append("stock", form.stock);
      if (image) fd.append("image", image);

      await axios.post("http://localhost:5000/api/products", fd);

      alert("Product added ✔");
      setForm({ name: "", price: "", category: "", stock: "" });
      setImage(null);
      loadProducts();
    } catch (err) {
      alert("Failed to add product");
    }
  };

  // Start EDIT
  const startEdit = (p) => {
    setEditId(p._id);
    setEditForm({
      name: p.name,
      price: p.price,
      category: p.category,
      stock: p.stock
    });
    setEditImage(null);
  };

  const onEditChange = (e) =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value });

  // SAVE EDIT
  const saveEdit = async (id) => {
    try {
      const fd = new FormData();
      fd.append("name", editForm.name);
      fd.append("price", editForm.price);
      fd.append("category", editForm.category);
      fd.append("stock", editForm.stock);
      if (editImage) fd.append("image", editImage);

      await axios.put(`http://localhost:5000/api/products/${id}`, fd);

      alert("Updated ✔");
      setEditId(null);
      loadProducts();
    } catch {
      alert("Update failed");
    }
  };

  // DELETE
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      loadProducts();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Products</h2>

      {/* ADD PRODUCT */}
      {isAdminOrManager && (
        <div className="card p-3 mb-4 shadow-sm">
          <h5>Add New Product</h5>

          <form onSubmit={addProduct} className="row g-2">
            <div className="col-md-4">
              <input
                className="form-control"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={onChange}
              />
            </div>

            <div className="col-md-2">
              <input
                className="form-control"
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={onChange}
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={onChange}
              />
            </div>

            <div className="col-md-2">
              <input
                className="form-control"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={onChange}
              />
            </div>

            <div className="col-md-6">
              <input
                className="form-control"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="col-md-3">
              <button className="btn btn-primary w-100">Add Product</button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th><th>Price</th><th>Category</th><th>Stock</th><th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                {p.image ? (
                  <img
                    src={`http://localhost:5000/${p.image}`}
                    alt=""
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{ width: 50, height: 50, background: "#eee" }}
                  ></div>
                )}
              </td>

              {editId === p._id ? (
                <>
                  <td>
                    <input
                      className="form-control"
                      name="name"
                      value={editForm.name}
                      onChange={onEditChange}
                    />
                  </td>

                  <td>
                    <input
                      className="form-control"
                      name="price"
                      value={editForm.price}
                      onChange={onEditChange}
                    />
                  </td>

                  <td>
                    <input
                      className="form-control"
                      name="category"
                      value={editForm.category}
                      onChange={onEditChange}
                    />
                  </td>

                  <td>
                    <input
                      className="form-control"
                      name="stock"
                      value={editForm.stock}
                      onChange={onEditChange}
                    />
                  </td>

                  <td>
                    <input
                      type="file"
                      className="form-control mb-2"
                      onChange={(e) => setEditImage(e.target.files[0])}
                    />
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => saveEdit(p._id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.category}</td>
                  <td>{p.stock}</td>
                  <td>
                    {isAdminOrManager && (
                      <>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => startEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteProduct(p._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
