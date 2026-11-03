import React, { useState } from "react";
import axios from "axios";

function AddCustomer() {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setCustomer({...customer, [e.target.name] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/customers", customer);
      alert("Customer Added Successfully ✅");
    } catch (err) {
      alert("Error adding customer ❌");
    }
  }

  return (
    <div className="container mt-5">
      <h2>Add Customer</h2>

      <form onSubmit={handleSubmit} className="mt-3">

        <input type="text" name="name" placeholder="Customer Name"
          className="form-control mb-2" onChange={handleChange} />

        <input type="text" name="phone" placeholder="Phone Number"
          className="form-control mb-2" onChange={handleChange} />

        <input type="text" name="address" placeholder="Address"
          className="form-control mb-2" onChange={handleChange} />

        <button className="btn btn-primary">Add Customer</button>
      </form>
    </div>
  );
}

export default AddCustomer;

