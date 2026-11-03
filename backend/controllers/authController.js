import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Customer from "../models/Customer.js";

const JWT_SECRET = process.env.JWT_SECRET || "mysecret";

// ---------------- REGISTER -----------------
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);

    // Save login details
    await User.create({
      name,
      email,
      password: hash,
      role: "customer"
    });

    // Save customer details
    await Customer.create({
      name,
      email,
      phone,
      address
    });

    res.status(201).json({ message: "Registered Successfully ✔" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------- LOGIN -----------------
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email or Password" });

    if (user.role !== role) {
      return res.status(400).json({ message: `You are not ${role}` });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid Email or Password" });

    let customerData = null;
    if (role === "customer") {
      customerData = await Customer.findOne({ email });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: customerData?.phone || "",
        address: customerData?.address || ""
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
