import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Account created ✅ Please Login");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed ❌");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 450 }}>
      <div className="card p-4 shadow">
        <h3 className="text-center mb-3">Customer Register</h3>
        <form onSubmit={submit}>
          <input className="form-control mb-3" placeholder="Full Name" name="name" onChange={onChange} />
          <input className="form-control mb-3" placeholder="Email" type="email" name="email" onChange={onChange} />
          <input className="form-control mb-3" placeholder="Password" type="password" name="password" onChange={onChange} />
          <button className="btn btn-success w-100" type="submit">Register</button>
        </form>
        <div className="text-center mt-3">
          <a href="/login">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;

