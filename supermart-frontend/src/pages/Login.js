import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", role:"customer" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      if(res.data.user.role !== form.role){
        return alert("❌ You are not "+form.role);
      }
      setUser(res.data.user);
      setToken(res.data.token);
      alert("Login Successful ✅");
      navigate("/shop");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <div className="card p-4 shadow">
        <h3 className="text-center mb-3">Login</h3>
        <form onSubmit={submit}>
          <select className="form-control mb-3" name="role" onChange={onChange}>
            <option value="customer">Customer</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <input className="form-control mb-3" type="email" placeholder="Email" name="email" onChange={onChange} />
          <input className="form-control mb-3" type="password" placeholder="Password" name="password" onChange={onChange} />
          <button className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <a href="/register">Create Account</a>
        </div>
      </div>
    </div>
  );
}
export default Login;

