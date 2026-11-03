import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },      // e.g., Cashier, Manager
    phone: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    salary: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Staff", staffSchema);

