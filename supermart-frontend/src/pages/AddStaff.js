import React, { useState } from "react";
import axios from "axios";

function AddStaff() {
  const [staff, setStaff] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    salary: ""
  });

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/staff", {
        ...staff,
        salary: Number(staff.salary || 0),
      });
      alert("Staff Added Successfully ✅");
      setStaff({ name: "", role: "", phone: "", email: "", salary: "" });
    } catch (err) {
      console.log(err);
      alert("Error adding staff ❌");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Staff</h2>
      <form onSubmit={handleSubmit} className="mt-3">

        <input type="text" name="name" placeholder="Name"
          className="form-control mb-2" value={staff.name} onChange={handleChange} required />

        <input type="text" name="role" placeholder="Role (Cashier, Manager, etc)"
          className="form-control mb-2" value={staff.role} onChange={handleChange} required />

        <input type="text" name="phone" placeholder="Phone Number"
          className="form-control mb-2" value={staff.phone} onChange={handleChange} required />

        <input type="email" name="email" placeholder="Email (optional)"
          className="form-control mb-2" value={staff.email} onChange={handleChange} />

        <input type="number" name="salary" placeholder="Salary"
          className="form-control mb-3" value={staff.salary} onChange={handleChange} />

        <button className="btn btn-primary">Add Staff</button>
      </form>
    </div>
  );
}

export default AddStaff;

