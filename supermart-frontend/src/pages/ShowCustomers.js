import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowCustomers() {
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // Load all customers
  const load = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/customers");
      setCustomers(res.data);
    } catch (err) {
      alert("Failed to load customers");
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Handle form changes
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Start editing a row
  const startEdit = (customer) => {
    setEditing(customer._id);
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    });
  };

  // Update customer
  const updateCustomer = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/customers/${editing}`,
        form
      );
      alert("Customer updated ✓");
      setEditing(null);
      load();
    } catch (err) {
      alert("Update failed");
    }
  };

  // Delete customer
  const deleteCustomer = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      alert("Customer deleted");
      load();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Customers</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) =>
            editing === c._id ? (
              /* ---------------------- EDIT MODE ---------------------- */
              <tr key={c._id} className="table-warning">
                <td>
                  <input
                    value={form.name}
                    name="name"
                    onChange={onChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    value={form.email}
                    name="email"
                    onChange={onChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    value={form.phone}
                    name="phone"
                    onChange={onChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    value={form.address}
                    name="address"
                    onChange={onChange}
                    className="form-control"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={updateCustomer}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditing(null)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              /* ---------------------- NORMAL VIEW ---------------------- */
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => startEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCustomer(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ShowCustomers;
