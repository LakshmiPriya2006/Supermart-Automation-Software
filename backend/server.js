import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// ROUTES
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// serving uploaded images
app.use("/uploads", express.static("uploads"));

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/supermart")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Connection Error ❌", err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/staff", staffRoutes);

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000 ✅");
});
